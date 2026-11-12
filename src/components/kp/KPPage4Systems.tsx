import { IMG } from '@/client';
import { KPFormData } from '@/hooks/useKPData';
import { SYSTEMS } from '@/data/systems';
import { BRAND } from '@/data/brand';

interface Props {
  data: KPFormData;
  lang?: 'ru' | 'he';
}

const T = {
  ru: { label: 'Наши системы', title: ['Выберите', 'своё решение'], chosen: 'Ваш выбор', page: 'КП №', n: 3 },
  he: { label: 'המערכות שלנו', title: ['בחרו את', 'הפתרון שלכם'], chosen: 'הבחירה שלך', page: 'הצעה מס׳', n: 3 },
};

/** Страница «Системы»: карточки всех шести систем. Выбранная менеджером подсвечивается. */
export function KPPage4Systems({ data, lang = 'ru' }: Props) {
  const t = T[lang];
  return (
    <div className={`kp-page${lang === 'he' ? ' kp-rtl' : ''}`} style={{display:'flex', flexDirection:'column', minHeight:'297mm'}}>
      <div className="sys-hero" style={{ height: '40mm' }}>
        <img src={IMG.systemsHero} alt={BRAND.nameRu} />
        <div className="sys-hero-ov"></div>
        <div className="sys-hero-txt">
          <div className="label">{t.label}</div>
          <h2>{t.title[0]}<br/>{t.title[1]}</h2>
        </div>
      </div>

      <div className="sys-grid">
        {SYSTEMS.map(s => {
          const txt = s[lang];
          const selected = s.id === data.productType;
          return (
            <div key={s.id} className={`sys-card2${selected ? ' selected' : ''}`}>
              <div className="sys-card2-photo">
                {s.photo
                  ? <img src={s.photo} alt={s.id} />
                  : <div className="sys-card2-noimg"><img src={IMG.logoOnDark} alt={BRAND.nameRu} /></div>}
                {selected && <span className="sys-card2-badge">{t.chosen}</span>}
              </div>
              <div className="sys-card2-head">
                <h4>{s.id}</h4>
                <p>{txt.tagline}</p>
              </div>
              <div className="sys-card2-body">
                <p className="sys-card2-desc">{txt.desc}</p>
                <table className="spec-mini">
                  <tbody>
                    {txt.specs.map(([k, v]) => (
                      <tr key={k}><td>{k}</td><td>{v}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{flex:1}}></div>

      <div className="pg-footer">
        <img className="fb-logo" src={IMG.logoOnLight} alt={BRAND.nameRu} />
        <span className="fc">{t.page} {data.orderNumber} · {BRAND.site}</span>
        <span className="fn">{t.n}</span>
      </div>
    </div>
  );
}
