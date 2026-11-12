/**
 * Загрузчик данных клиента.
 * Какой клиент собирается, решает переменная CLIENT при сборке (по умолчанию bonim):
 *   CLIENT=bonim npm run build
 * Все данные лежат в папке clients/<клиент>/: client.json и картинки в img/.
 */
import raw from '@client/client.json';

const files = import.meta.glob('@client/img/*', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

/** Находит картинку клиента по имени файла (как записано в client.json) */
export function img(name?: string | null): string | undefined {
  if (!name) return undefined;
  const key = Object.keys(files).find(k => k.endsWith('/' + name));
  if (!key) console.warn('Нет картинки клиента:', name);
  return key ? files[key] : undefined;
}

export interface PayStep { pct: string; sub?: string; text: string; free?: boolean }
export interface BankRow { label: string; value: string }
export interface LangTexts {
  conditionsLabel: string; conditionsTitle: string; conditions: string[];
  payLabel: string; paySteps: PayStep[]; bankTitle: string; bank: BankRow[];
  validNote: string; glassNote: string; warranty: string;
}
export interface ClientConfig {
  id: string; name: string; defaultSystem: string;
  theme: Record<string, string>;
  brand: {
    site: string; phone: string; phoneLocal: string; email: string; whatsapp: string;
    telegram: string; telegramUrl: string; facebook?: string; nameRu: string; nameHe: string;
    productionDays: number; warrantyYears: number; validDays: number; vatRate: number;
  };
  images: { logoOnLight: string; logoOnDark: string; coverHero: string; gallery: string[]; systemsHero: string };
  texts: { ru: LangTexts; he: LangTexts };
  systems: any[];
}

export const CLIENT = raw as unknown as ClientConfig;

export const IMG = {
  logoOnLight: img(CLIENT.images.logoOnLight)!,
  logoOnDark: img(CLIENT.images.logoOnDark)!,
  coverHero: img(CLIENT.images.coverHero)!,
  gallery: CLIENT.images.gallery.map(n => img(n)!),
  systemsHero: img(CLIENT.images.systemsHero)!,
};

/** Подстановка {days}, {years}, {valid}, {vat} в тексты клиента */
export function fill(s: string): string {
  const b = CLIENT.brand;
  return s
    .replace(/\{days\}/g, String(b.productionDays))
    .replace(/\{years\}/g, String(b.warrantyYears))
    .replace(/\{valid\}/g, String(b.validDays))
    .replace(/\{vat\}/g, String(Math.round(b.vatRate * 100)));
}

/** Цвета клиента -> CSS-переменные. Кладём в <style>, чтобы они попали и в скачанный HTML/PDF */
export function applyTheme() {
  const hexToRgb = (h: string) => {
    const n = parseInt(h.replace('#', ''), 16);
    return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
  };
  const t = CLIENT.theme;
  let css = ':root{';
  for (const [k, v] of Object.entries(t)) css += `--kp-${k}:${v};`;
  css += `--kp-accent-rgb:${hexToRgb(t.accent)};--kp-dark-rgb:${hexToRgb(t.dark)};--kp-primary-rgb:${hexToRgb(t.primary)};}`;
  const el = document.createElement('style');
  el.id = 'kp-theme';
  el.textContent = css;
  document.head.appendChild(el);
}
