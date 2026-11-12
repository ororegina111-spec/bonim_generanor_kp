"""
Создаёт шаблон брифа клиента (Excel): Бриф_клиента_шаблон.xlsx
Бриф заполняет менеджер вместе с клиентом. Потом scripts/brief_to_client.py превращает его
в clients/<id>/client.json (данные для генератора) и deal_fields.json (данные для Сделки Kommo и для Агента).

Запуск:  python scripts/make_brief_template.py [путь_к_файлу.xlsx]
"""
import sys
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation

OUT = sys.argv[1] if len(sys.argv) > 1 else "Бриф_клиента_шаблон.xlsx"

HEAD = PatternFill("solid", fgColor="082B52")
NOTE = PatternFill("solid", fgColor="EAF3FC")
INPUT = PatternFill("solid", fgColor="FFF8DC")
thin = Side(style="thin", color="BBD3EC")
BORDER = Border(left=thin, right=thin, top=thin, bottom=thin)
F = 12  # кегль не меньше 12


def head(ws, cols, widths):
    for i, (c, w) in enumerate(zip(cols, widths), start=1):
        cell = ws.cell(row=1, column=i, value=c)
        cell.font = Font(bold=True, color="FFFFFF", size=F)
        cell.fill = HEAD
        cell.alignment = Alignment(wrap_text=True, vertical="center")
        cell.border = BORDER
        ws.column_dimensions[ws.cell(row=1, column=i).column_letter].width = w
    ws.freeze_panes = "A2"


def put(ws, r, vals, input_cols=()):
    for i, v in enumerate(vals, start=1):
        c = ws.cell(row=r, column=i, value=v)
        c.font = Font(size=F)
        c.alignment = Alignment(wrap_text=True, vertical="top")
        c.border = BORDER
        if i in input_cols:
            c.fill = INPUT
        elif i == len(vals) and len(input_cols) and i not in input_cols:
            c.fill = NOTE


wb = Workbook()

# ---- 1. Клиент ----
ws = wb.active
ws.title = "Клиент"
head(ws, ["Поле", "Значение (заполнить)", "Подсказка"], [34, 46, 60])
rows = [
    ("id", "", "Короткое имя латиницей без пробелов. Станет адресом: cp.newformatai.com/<id>/"),
    ("Название компании", "", "Как пишется в шапке и подвале"),
    ("Название на иврите / втором языке", "", "Если нет, оставить пустым"),
    ("Сайт (без https://)", "", "Например: example.co.il"),
    ("Телефон международный", "", "+972 55-000-0000, для ссылок на звонок"),
    ("Телефон как показывать", "", "055-000-0000"),
    ("WhatsApp (ссылка)", "", "https://wa.me/972550000000"),
    ("Telegram (имя)", "", "@имя"),
    ("Telegram (ссылка)", "", "https://t.me/имя"),
    ("Почта", "", ""),
    ("Facebook (адрес)", "", "Необязательно"),
    ("Срок изготовления, рабочих дней", "", "Число"),
    ("Гарантия, лет", "", "Число"),
    ("Срок действия КП, дней", "10", "Число"),
    ("НДС, %", "18", "Число"),
    ("Цвет тёмный", "#082B52", "Для плашек с белым текстом, формат #RRGGBB"),
    ("Цвет основной", "#054483", "Заголовки, цифры"),
    ("Цвет акцент", "#4A86C8", "Линии и подписи"),
    ("Система по умолчанию", "", "id системы из листа «Системы»"),
    ("Менеджер клиента (имя)", "", "Для Сделки и Агента"),
    ("Почта менеджера", "", "Сюда придёт пароль доступа"),
    ("Оплачено до (дата)", "", "ГГГГ-ММ-ДД. Для механизма срока доступа"),
]
for i, r in enumerate(rows, start=2):
    put(ws, i, r, input_cols=(2,))

# ---- 2. Системы ----
ws = wb.create_sheet("Системы")
cols = ["id (название системы)", "Файл фото (из папки img)", "Заголовок обложки RU", "Подпись RU", "Описание RU",
        "Характеристика 1 название RU", "Характеристика 1 значение RU", "Характеристика 2 название RU", "Характеристика 2 значение RU",
        "Характеристика 3 название RU", "Характеристика 3 значение RU",
        "Заголовок обложки HE", "Подпись HE", "Описание HE",
        "Хар. 1 название HE", "Хар. 1 значение HE", "Хар. 2 название HE", "Хар. 2 значение HE", "Хар. 3 название HE", "Хар. 3 значение HE"]
head(ws, cols, [20, 26, 22, 28, 50, 22, 30, 22, 30, 22, 30, 22, 28, 50, 20, 30, 20, 30, 20, 30])
put(ws, 2, ["EXAMPLE", "example.jpg", "Закрытие балкона", "Подпись", "Описание в одно-два предложения"] + [""] * 15, input_cols=tuple(range(1, 21)))

# ---- 3. Условия ----
ws = wb.create_sheet("Условия")
head(ws, ["№", "Текст RU", "Текст HE", "Подсказка"], [6, 80, 80, 50])
put(ws, 2, [1, "", "", "Можно писать {days} (срок изготовления), {years} (гарантия), {valid} (срок КП), {vat} (НДС). **Жирный** текст в двойных звёздочках."], input_cols=(2, 3))
for i in range(3, 12):
    put(ws, i, [i - 1, "", "", ""], input_cols=(2, 3))

# ---- 4. Оплата ----
ws = wb.create_sheet("Оплата")
head(ws, ["№", "Крупно (цифра или слово)", "Под ним (необязательно)", "Текст RU", "Текст HE", "Выделить рамкой (да/нет)"], [6, 26, 26, 60, 60, 20])
for i in range(2, 6):
    put(ws, i, [i - 1, "", "", "", "", "нет"], input_cols=(2, 3, 4, 5, 6))
dv = DataValidation(type="list", formula1='"да,нет"', allow_blank=True)
ws.add_data_validation(dv)
dv.add("F2:F5")

# ---- 5. Реквизиты ----
ws = wb.create_sheet("Реквизиты")
head(ws, ["№", "Подпись RU", "Подпись HE", "Значение"], [6, 28, 28, 50])
for i, (a, b2) in enumerate([("Получатель", "מוטב"), ("Банк", "בנק"), ("Филиал", "סניף"), ("Счёт", "מספר חשבון")], start=2):
    put(ws, i, [i - 1, a, b2, ""], input_cols=(2, 3, 4))

# ---- 6. Тексты ----
ws = wb.create_sheet("Тексты")
head(ws, ["Поле", "RU", "HE"], [30, 80, 80])
for i, (a, b1, c1) in enumerate([
    ("Заголовок раздела условий", "Условия коммерческого предложения", "תנאי הצעת המחיר"),
    ("Подпись над заголовком условий", "Общие условия", "תנאים כלליים"),
    ("Заголовок оплаты", "Условия оплаты", "תנאי תשלום"),
    ("Заголовок реквизитов", "Реквизиты для оплаты", "פרטי חשבון לתשלום"),
    ("Плашка срока", "Срок изготовления: **{days} рабочих дня** с момента оплаты аванса.", "זמן ייצור: **{days} ימי עבודה** ממועד תשלום המקדמה."),
    ("Про стекло / материалы", "", ""),
    ("Гарантия", "{years} год на изделие и монтаж. Действует при нормальной эксплуатации.", ""),
], start=2):
    put(ws, i, [a, b1, c1], input_cols=(2, 3))

# ---- 7. Картинки ----
ws = wb.create_sheet("Картинки")
head(ws, ["Роль", "Имя файла в папке img", "Подсказка"], [26, 40, 70])
for i, (a, b1, c1) in enumerate([
    ("Логотип на светлом фоне", "", "Тёмный или цветной логотип, PNG с прозрачным фоном"),
    ("Логотип на тёмном фоне", "", "Белый логотип, PNG с прозрачным фоном"),
    ("Главное фото обложки", "", "Широкое яркое фото, от 1400 px"),
    ("Фото объекта 1", "", "Настоящее фото работ клиента"),
    ("Фото объекта 2", "", ""),
    ("Фото объекта 3", "", ""),
    ("Фото шапки страницы «Системы»", "", ""),
], start=2):
    put(ws, i, [a, b1, c1], input_cols=(2,))

wb.save(OUT)
print("Шаблон брифа сохранён:", OUT)
