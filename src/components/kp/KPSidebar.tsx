import { KPFormData, KPComputed } from '@/hooks/useKPData';
import { SYSTEMS } from '@/data/systems';
import '@/styles/kp-sidebar.css';

export type KPLang = 'ru' | 'he';

interface Props {
  data: KPFormData;
  computed: KPComputed;
  lang: KPLang;
  onLangChange: (lang: KPLang) => void;
  onUpdate: <K extends keyof KPFormData>(key: K, value: KPFormData[K]) => void;
  onReset: () => void;
  onPrintPDF: () => void;
  onDownloadHTML: () => void;
}

const labels = {
  ru: {
    title: '🏠 Генератор КП – BONIM',
    order: 'Реквизиты заказа',
    orderNo: '№ Заказа',
    date: 'Дата',
    client: 'Данные клиента',
    clientName: 'Имя клиента',
    clientPlaceholder: 'Иван Петров',
    city: 'Город',
    cityPlaceholder: 'Тель-Авив',
    system: 'Характеристики системы',
    systemType: 'Тип системы',
    glassType: 'Тип стекла',
    dimensions: 'Размеры балкона',
    length: 'Длина (см)',
    height: 'Высота (см)',
    finance: 'Финансы',
    pricePerSqm: 'Цена за м² выбранной системы (₪, без НДС)',
    extras: 'Доп. работы / Алюм. планки (₪)',
    area: 'Площадь',
    systemCost: 'Стоимость системы',
    extrasLabel: 'Доп. работы',
    total: 'ИТОГО',
    downloadPDF: '🖨️ Скачать PDF',
    downloadHTML: '📄 Скачать HTML',
    reset: '↺ Сбросить данные',
    alertName: 'Введите имя клиента',
    glass: {
      'clear10': 'Прозрачное 10 мм',
      'triplex_clear': 'Триплекс 5+5 прозрачный',
      'triplex_milk': 'Триплекс 5+5 молочный',
      'anti_sun': 'Противосолнечное 10 мм',
    },
    glassValues: {
      'clear10': 'Прозрачное закалённое 10 мм',
      'triplex_clear': 'Триплекс 5+5 мм прозрачный',
      'triplex_milk': 'Триплекс 5+5 мм молочный',
      'anti_sun': 'Противосолнечное 10 мм',
    },
  },
  he: {
    title: '🏠 מחולל הצעות מחיר – BONIM',
    order: 'פרטי הזמנה',
    orderNo: 'מס׳ הזמנה',
    date: 'תאריך',
    client: 'פרטי לקוח',
    clientName: 'שם הלקוח',
    clientPlaceholder: 'יוסי כהן',
    city: 'עיר',
    cityPlaceholder: 'תל אביב',
    system: 'מאפייני המערכת',
    systemType: 'סוג מערכת',
    glassType: 'סוג זכוכית',
    dimensions: 'מידות המרפסת',
    length: 'אורך (ס״מ)',
    height: 'גובה (ס״מ)',
    finance: 'כספים',
    pricePerSqm: 'מחיר למ״ר של המערכת שנבחרה (₪, ללא מע״מ)',
    extras: 'עבודות נוספות / פסי אלומיניום (₪)',
    area: 'שטח',
    systemCost: 'עלות מערכת',
    extrasLabel: 'עבודות נוספות',
    total: 'סה״כ',
    downloadPDF: '🖨️ שמור כ-PDF',
    downloadHTML: '📄 הורד HTML',
    reset: '↺ איפוס נתונים',
    alertName: 'נא להזין שם לקוח',
    glass: {
      'clear10': 'שקוף מחוסם 10 מ״מ',
      'triplex_clear': 'טריפלקס 5+5 שקוף',
      'triplex_milk': 'טריפלקס 5+5 חלבי',
      'anti_sun': 'אנטי-שמש 10 מ״מ',
    },
    glassValues: {
      'clear10': 'שקוף מחוסם 10 מ״מ',
      'triplex_clear': 'טריפלקס 5+5 מ״מ שקוף',
      'triplex_milk': 'טריפלקס 5+5 מ״מ חלבי',
      'anti_sun': 'אנטי-שמש 10 מ״מ',
    },
  },
};

export function KPSidebar({ data, computed, lang, onLangChange, onUpdate, onReset, onPrintPDF, onDownloadHTML }: Props) {
  const t = labels[lang];

  return (
    <div className="kp-sidebar no-print" style={lang === 'he' ? {direction: 'rtl'} : undefined}>
      <div className="kp-sidebar-header">
        <h2>{t.title}</h2>
        <div style={{display:'flex', gap:'6px', marginTop:'8px', position:'relative', zIndex:10}}>
          <button
            type="button"
            onClick={() => onLangChange('ru')}
            style={{
              flex:1, padding:'8px 0', border: lang === 'ru' ? '2px solid #4A86C8' : '1px solid rgba(74,134,200,.4)',
              borderRadius:'4px', cursor:'pointer', fontWeight:700, fontSize:'0.85rem',
              background: lang === 'ru' ? 'linear-gradient(135deg,#4A86C8,#A9CCEC,#4A86C8)' : '#0B3566',
              color: lang === 'ru' ? '#082B52' : '#4A86C8',
              position:'relative', zIndex:10,
            }}
          >
            🇷🇺 Русский
          </button>
          <button
            type="button"
            onClick={() => onLangChange('he')}
            style={{
              flex:1, padding:'8px 0', border: lang === 'he' ? '2px solid #4A86C8' : '1px solid rgba(74,134,200,.4)',
              borderRadius:'4px', cursor:'pointer', fontWeight:700, fontSize:'0.85rem',
              background: lang === 'he' ? 'linear-gradient(135deg,#4A86C8,#A9CCEC,#4A86C8)' : '#0B3566',
              color: lang === 'he' ? '#082B52' : '#4A86C8',
              position:'relative', zIndex:10,
            }}
          >
            🇮🇱 עברית
          </button>
        </div>
      </div>

      <div className="kp-sidebar-body">
        <div className="kp-section-label">{t.order}</div>

        <div className="kp-field">
          <label>{t.orderNo}</label>
          <input type="text" value={data.orderNumber} onChange={e => onUpdate('orderNumber', e.target.value)} />
        </div>

        <div className="kp-field">
          <label>{t.date}</label>
          <input type="text" value={data.date} onChange={e => onUpdate('date', e.target.value)} />
        </div>

        <hr className="kp-sep" />
        <div className="kp-section-label">{t.client}</div>

        <div className="kp-field">
          <label>{t.clientName}</label>
          <input type="text" value={data.clientName} placeholder={t.clientPlaceholder} onChange={e => onUpdate('clientName', e.target.value)} />
        </div>

        <div className="kp-field">
          <label>{t.city}</label>
          <input type="text" value={data.city} placeholder={t.cityPlaceholder} onChange={e => onUpdate('city', e.target.value)} />
        </div>

        <hr className="kp-sep" />
        <div className="kp-section-label">{t.system}</div>

        <div className="kp-field">
          <label>{t.systemType}</label>
          <select value={data.productType} onChange={e => onUpdate('productType', e.target.value as KPFormData['productType'])}>
            {SYSTEMS.map(sys => <option key={sys.id} value={sys.id}>{sys.id}</option>)}
          </select>
        </div>

        <div className="kp-field">
          <label>{t.glassType}</label>
          <select value={data.glassType} onChange={e => onUpdate('glassType', e.target.value)}>
            <option value={t.glassValues.clear10}>{t.glass.clear10}</option>
            <option value={t.glassValues.triplex_clear}>{t.glass.triplex_clear}</option>
            <option value={t.glassValues.triplex_milk}>{t.glass.triplex_milk}</option>
            <option value={t.glassValues.anti_sun}>{t.glass.anti_sun}</option>
          </select>
        </div>

        <hr className="kp-sep" />
        <div className="kp-section-label">{t.dimensions}</div>

        <div className="kp-field">
          <label>{t.length}</label>
          <input type="number" value={data.length} min={50} onChange={e => onUpdate('length', Number(e.target.value) || 0)} />
        </div>

        <div className="kp-field">
          <label>{t.height}</label>
          <input type="number" value={data.height} min={50} onChange={e => onUpdate('height', Number(e.target.value) || 0)} />
        </div>

        <hr className="kp-sep" />
        <div className="kp-section-label">{t.finance}</div>

        <div className="kp-field">
          <label>{t.pricePerSqm}</label>
          <input type="number" value={data.pricePerSqm} min={0} onChange={e => onUpdate('pricePerSqm', Number(e.target.value) || 0)} />
        </div>

        <div className="kp-field">
          <label>{t.extras}</label>
          <input type="number" value={data.extras} min={0} onChange={e => onUpdate('extras', Number(e.target.value) || 0)} />
        </div>

        {/* Calculated display */}
        <div className="kp-calc-box">
          <div className="kp-calc-row"><span>{t.area}</span><span className="kp-calc-val">{computed.area} {lang === 'ru' ? 'м²' : 'מ״ר'}</span></div>
          <div className="kp-calc-row"><span>{t.systemCost}</span><span className="kp-calc-val">{computed.systemCost} ₪</span></div>
          <div className="kp-calc-row"><span>{t.extrasLabel}</span><span className="kp-calc-val">{computed.extrasStr} ₪</span></div>
          <div className="kp-calc-row kp-calc-total"><span>{t.total}</span><span className="kp-calc-val">{computed.totalPrice} ₪</span></div>
        </div>
      </div>

      <div className="kp-sidebar-footer">
        <button className="kp-btn-pdf" onClick={onPrintPDF}>{t.downloadPDF}</button>
        <button className="kp-btn-html" onClick={onDownloadHTML}>{t.downloadHTML}</button>
        <button className="kp-btn-reset" onClick={onReset}>{t.reset}</button>
      </div>
    </div>
  );
}
