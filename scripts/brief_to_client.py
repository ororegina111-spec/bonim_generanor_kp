"""
Превращает заполненный бриф клиента (Excel) в данные для генератора.

Запуск:
    python scripts/brief_to_client.py "Бриф_клиента_<имя>.xlsx"

Создаёт:
    clients/<id>/client.json      данные для генератора КП (тексты, цвета, системы, картинки)
    clients/<id>/img/             папка для картинок (сюда кладутся файлы, названные в брифе)
    clients/<id>/deal_fields.json плоский набор данных для Сделки в Kommo и для Агента

Ничего не выдумывает: пустые обязательные поля выводятся списком, и файл не создаётся,
пока бриф не заполнен.
"""
import json
import re
import sys
from pathlib import Path
from openpyxl import load_workbook

ROOT = Path(__file__).resolve().parent.parent


def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def rgb_to_hex(c):
    return "#%02X%02X%02X" % tuple(max(0, min(255, round(x))) for x in c)


def mix(c1, c2, t):
    """Смешивает два цвета: t=0 первый, t=1 второй"""
    return tuple(a + (b - a) * t for a, b in zip(c1, c2))


def make_theme(dark, primary, accent):
    d, p, a = map(hex_to_rgb, (dark, primary, accent))
    white = (255, 255, 255)
    return {
        "dark": rgb_to_hex(d),
        "dark2": rgb_to_hex(mix(d, a, 0.12)),
        "primary": rgb_to_hex(p),
        "accent": rgb_to_hex(a),
        "light": rgb_to_hex(mix(a, white, 0.6)),
        "light2": rgb_to_hex(mix(a, white, 0.4)),
        "light3": rgb_to_hex(mix(a, white, 0.5)),
        "tint": rgb_to_hex(mix(a, white, 0.9)),
        "tint2": rgb_to_hex(mix(a, white, 0.94)),
        "tint3": rgb_to_hex(mix(a, white, 0.85)),
        "line": rgb_to_hex(mix(a, white, 0.82)),
        "line2": rgb_to_hex(mix(a, white, 0.75)),
    }


def cell(v):
    return "" if v is None else str(v).strip()


def main(path):
    wb = load_workbook(path, data_only=True)
    problems = []

    # --- Клиент ---
    kv = {}
    for r in wb["Клиент"].iter_rows(min_row=2, values_only=True):
        if r[0]:
            kv[cell(r[0])] = cell(r[1])

    def need(name):
        v = kv.get(name, "")
        if not v:
            problems.append(f"Лист «Клиент»: не заполнено «{name}»")
        return v

    def num(name, default=None):
        v = kv.get(name, "")
        if not v and default is not None:
            return default
        try:
            return float(v.replace(",", "."))
        except ValueError:
            problems.append(f"Лист «Клиент»: «{name}» должно быть числом, а там «{v}»")
            return 0

    cid = need("id").lower()
    if cid and not re.fullmatch(r"[a-z0-9][a-z0-9_-]{1,30}", cid):
        problems.append("Лист «Клиент»: id только латиницей, цифрами, дефисом и подчёркиванием (2-31 знак)")

    brand = {
        "site": need("Сайт (без https://)"),
        "phone": need("Телефон международный"),
        "phoneLocal": kv.get("Телефон как показывать") or kv.get("Телефон международный", ""),
        "email": need("Почта"),
        "whatsapp": kv.get("WhatsApp (ссылка)", ""),
        "telegram": kv.get("Telegram (имя)", ""),
        "telegramUrl": kv.get("Telegram (ссылка)", ""),
        "facebook": kv.get("Facebook (адрес)", ""),
        "nameRu": need("Название компании"),
        "nameHe": kv.get("Название на иврите / втором языке") or kv.get("Название компании", ""),
        "productionDays": int(num("Срок изготовления, рабочих дней")),
        "warrantyYears": int(num("Гарантия, лет")),
        "validDays": int(num("Срок действия КП, дней", 10)),
        "vatRate": num("НДС, %", 18) / 100,
    }
    for col in ("Цвет тёмный", "Цвет основной", "Цвет акцент"):
        if not re.fullmatch(r"#[0-9A-Fa-f]{6}", kv.get(col, "")):
            problems.append(f"Лист «Клиент»: «{col}» должно быть вида #RRGGBB")

    # --- Системы ---
    systems = []
    for r in wb["Системы"].iter_rows(min_row=2, values_only=True):
        r = [cell(x) for x in r]
        if not r[0] or r[0] == "EXAMPLE":
            continue

        def block(off):
            specs = []
            for k in range(3):
                n, v = r[off + 3 + k * 2], r[off + 4 + k * 2]
                if n or v:
                    specs.append([n, v])
            return {"coverTitle": r[off], "tagline": r[off + 1], "desc": r[off + 2], "specs": specs}

        ru = block(2)
        he = {"coverTitle": r[11], "tagline": r[12], "desc": r[13],
              "specs": [[r[14 + k * 2], r[15 + k * 2]] for k in range(3) if r[14 + k * 2] or r[15 + k * 2]]}
        systems.append({"id": r[0], "photo": r[1] or None, "ru": ru, "he": he})
    if not systems:
        problems.append("Лист «Системы»: нет ни одной системы (строка EXAMPLE не считается)")

    # --- Условия ---
    cond_ru, cond_he = [], []
    for r in wb["Условия"].iter_rows(min_row=2, values_only=True):
        if cell(r[1]) or cell(r[2]):
            cond_ru.append(cell(r[1]))
            cond_he.append(cell(r[2]) or cell(r[1]))

    # --- Оплата ---
    pay_ru, pay_he = [], []
    for r in wb["Оплата"].iter_rows(min_row=2, values_only=True):
        if cell(r[1]):
            free = cell(r[5]).lower() == "да"
            a = {"pct": cell(r[1]), "text": cell(r[3]), "free": free}
            b = {"pct": cell(r[1]), "text": cell(r[4]) or cell(r[3]), "free": free}
            if cell(r[2]):
                a["sub"] = b["sub"] = cell(r[2])
            pay_ru.append(a)
            pay_he.append(b)

    # --- Реквизиты ---
    bank_ru, bank_he = [], []
    for r in wb["Реквизиты"].iter_rows(min_row=2, values_only=True):
        if cell(r[3]):
            bank_ru.append({"label": cell(r[1]), "value": cell(r[3])})
            bank_he.append({"label": cell(r[2]) or cell(r[1]), "value": cell(r[3])})

    # --- Тексты ---
    tx = {}
    for r in wb["Тексты"].iter_rows(min_row=2, values_only=True):
        if r[0]:
            tx[cell(r[0])] = (cell(r[1]), cell(r[2]))

    def t(name, lang):
        a, b = tx.get(name, ("", ""))
        return a if lang == 0 else (b or a)

    # --- Картинки ---
    im = {cell(r[0]): cell(r[1]) for r in wb["Картинки"].iter_rows(min_row=2, values_only=True) if r[0]}
    images = {
        "logoOnLight": im.get("Логотип на светлом фоне", ""),
        "logoOnDark": im.get("Логотип на тёмном фоне", ""),
        "coverHero": im.get("Главное фото обложки", ""),
        "gallery": [im.get(f"Фото объекта {i}", "") for i in (1, 2, 3)],
        "systemsHero": im.get("Фото шапки страницы «Системы»", ""),
    }
    for k in ("logoOnLight", "logoOnDark", "coverHero", "systemsHero"):
        if not images[k]:
            problems.append(f"Лист «Картинки»: не указан файл для «{k}»")
    if not all(images["gallery"]):
        problems.append("Лист «Картинки»: нужны все три фото объектов")

    def texts(lang, cond, pay, bank):
        return {
            "conditionsLabel": t("Подпись над заголовком условий", lang),
            "conditionsTitle": t("Заголовок раздела условий", lang),
            "conditions": cond,
            "payLabel": t("Заголовок оплаты", lang),
            "paySteps": pay,
            "bankTitle": t("Заголовок реквизитов", lang),
            "bank": bank,
            "validNote": t("Плашка срока", lang),
            "glassNote": t("Про стекло / материалы", lang),
            "warranty": t("Гарантия", lang),
        }

    if problems:
        print("Бриф заполнен не полностью. Файл не создан. Нужно исправить:")
        for p in problems:
            print(" -", p)
        sys.exit(1)

    client = {
        "id": cid,
        "name": brand["nameRu"],
        "defaultSystem": kv.get("Система по умолчанию") or systems[0]["id"],
        "theme": make_theme(kv["Цвет тёмный"], kv["Цвет основной"], kv["Цвет акцент"]),
        "brand": brand,
        "images": images,
        "texts": {"ru": texts(0, cond_ru, pay_ru, bank_ru), "he": texts(1, cond_he, pay_he, bank_he)},
        "systems": systems,
    }

    out = ROOT / "clients" / cid
    (out / "img").mkdir(parents=True, exist_ok=True)
    (out / "client.json").write_text(json.dumps(client, ensure_ascii=False, indent=2), encoding="utf-8")

    # Данные для Сделки Kommo и для Агента (плоско, без картинок и длинных текстов)
    deal = {
        "client_id": cid,
        "company": brand["nameRu"],
        "site": brand["site"],
        "phone": brand["phone"],
        "email": brand["email"],
        "manager": kv.get("Менеджер клиента (имя)", ""),
        "manager_email": kv.get("Почта менеджера", ""),
        "paid_until": kv.get("Оплачено до (дата)", ""),
        "generator_url": f"https://cp.newformatai.com/{cid}/",
        "systems": [s["id"] for s in systems],
        "production_days": brand["productionDays"],
        "warranty_years": brand["warrantyYears"],
        "vat_percent": round(brand["vatRate"] * 100),
    }
    (out / "deal_fields.json").write_text(json.dumps(deal, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"Готово: {out}")
    print("Дальше: положить картинки в", out / "img", "и собрать:  npm run build:client -- " + cid)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    main(sys.argv[1])
