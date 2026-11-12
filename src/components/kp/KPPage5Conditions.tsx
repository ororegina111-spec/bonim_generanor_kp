import { KPFormData } from '@/hooks/useKPData';
import { BRAND } from '@/data/brand';
import { CLIENT, IMG } from '@/client';
import { Rich } from '@/client/rich';
import { KPContacts } from '@/components/kp/KPContacts';

interface Props {
  data: KPFormData;
  lang?: 'ru' | 'he';
}

/** Страница «Условия»: тексты, шаги оплаты и реквизиты берутся из clients/<клиент>/client.json */
export function KPPage5Conditions({ data, lang = 'ru' }: Props) {
  const t = CLIENT.texts[lang];
  return (
    <div className={`kp-page${lang === 'he' ? ' kp-rtl' : ''}`} style={{display:'flex', flexDirection:'column', minHeight:'297mm'}}>
      <div className="cond-head">
        <div className="label">{t.conditionsLabel}</div>
        <h2>{t.conditionsTitle}</h2>
      </div>

      <div className="inner" style={{paddingTop:'12px'}}>
        <ul className="cond-list">
          {t.conditions.map((c, i) => <li key={i}><span><Rich text={c} /></span></li>)}
        </ul>

        <div className="label" style={{marginBottom:'10px'}}>{t.payLabel}</div>
        <div className="pay-steps">
          {t.paySteps.map((s, i) => (
            <div key={i} className={`pay-step${s.free ? ' pay-free' : ''}`}>
              <span className="pct">{s.pct}</span>
              {s.sub && <span className="pct-sub">{s.sub}</span>}
              <div className="when">{s.text}</div>
            </div>
          ))}
        </div>

        <div className="bank-box">
          <div className="btitle">{t.bankTitle}</div>
          {t.bank.map((r, i) => (
            <div key={i} className="bank-row"><span>{r.label}</span><strong><bdi dir="auto">{r.value}</bdi></strong></div>
          ))}
        </div>

        <div className="valid-note">
          ⏱ <Rich text={t.validNote} />
        </div>
      </div>

      <KPContacts lang={lang} />

      <div style={{flex:1}}></div>

      <div className="pg-footer">
        <img className="fb-logo" src={IMG.logoOnLight} alt={BRAND.nameRu} />
        <span className="fc"><span className="v">{data.clientName || '–'}</span> · <span className="v">{data.city || '–'}</span> · {BRAND.site}</span>
        <span className="fn">4</span>
      </div>
    </div>
  );
}
