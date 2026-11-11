import { BRAND } from '@/data/brand';

const L = {
  ru: { title: 'Связаться с нами', phone: 'Телефон', wa: 'WhatsApp', tg: 'Telegram', mail: 'Почта', site: 'Сайт' },
  he: { title: 'צרו קשר', phone: 'טלפון', wa: 'וואטסאפ', tg: 'טלגרם', mail: 'דוא״ל', site: 'אתר' },
};

/** Контакты BONIM: все данные берутся из src/data/brand.ts */
export function KPContacts({ lang = 'ru' }: { lang?: 'ru' | 'he' }) {
  const t = L[lang];
  return (
    <div className="kp-contacts">
      <div className="kp-contacts-title">{t.title}</div>
      <div className="kp-contacts-grid">
        <div><label>{t.phone}</label><a href={`tel:${BRAND.phone.replace(/[^+\d]/g, '')}`} dir="ltr">{BRAND.phone}</a></div>
        <div><label>{t.wa}</label><a href={BRAND.whatsapp} dir="ltr">{BRAND.phone}</a></div>
        <div><label>{t.tg}</label><a href={BRAND.telegramUrl} dir="ltr">{BRAND.telegram}</a></div>
        <div><label>{t.mail}</label><a href={`mailto:${BRAND.email}`} dir="ltr">{BRAND.email}</a></div>
        <div><label>{t.site}</label><a href={`https://${BRAND.site}`} dir="ltr">{BRAND.site}</a></div>
      </div>
    </div>
  );
}
