import { KPFormData } from '@/hooks/useKPData';
import { BRAND } from '@/data/brand';
import logoWhite from '@/assets/kp/bonim_logo_flat_white.png';

interface Props {
  data: KPFormData;
}

export function KPPage5ConditionsHe({ data }: Props) {
  return (
    <div className="kp-page kp-rtl" style={{display:'flex', flexDirection:'column', minHeight:'297mm'}}>
      <div className="cond-head">
        <div className="label">תנאים כלליים</div>
        <h2>תנאי הצעת המחיר</h2>
      </div>

      <div className="inner" style={{paddingTop:'12px'}}>
        <ul className="cond-list">
          <li>המחיר הוא אומדן, מבוסס על המידות והמידע שנמסרו על ידי הלקוח, ללא מע״מ. המחיר הסופי ייקבע לאחר מדידה מקצועית באתר.</li>
          <li>מחיר המ״ר נשאר ללא שינוי. אם יימצאו סטיות במידות, המחיר הכולל יעודכן בהתאם.</li>
          <li>הצעה זו אינה אישור הזמנה. ההזמנה נכנסת לתוקף עם חתימה על טופס הזמנה ו/או תשלום מקדמה. תשלום המקדמה מהווה הסכמה לכל התנאים.</li>
          <li>זמן הייצור – {BRAND.productionDays} ימי עבודה ממועד תשלום המקדמה. המועד הסופי נקבע לאחר המדידה.</li>
          <li>בדרישות מיוחדות של מהנדס, אדריכל או הרשות המקומית ייתכנו שינויים טכניים והתאמת מחיר, בהסכמה מראש.</li>
          <li>החברה לא תישא באחריות לעיכובים הנובעים מכוח עליון, לרבות מלחמה, מצב חירום, שביתות ומחסור בחומרי גלם.</li>
          <li>כל המערכות מיוצרות לפי מידות מיוחדות. לא ניתן לבטל הזמנה והסכומים ששולמו לא יוחזרו.</li>
          <li>הבעלות על המוצרים נשארת בידי החברה עד לתשלום מלוא התמורה.</li>
          <li><strong>הצעה זו תקפה ל-10 ימים</strong> ממועד הנפקתה.</li>
        </ul>

        <div className="label" style={{marginBottom:'10px'}}>תנאי תשלום</div>
        <div className="pay-steps">
          <div className="pay-step pay-free">
            <span className="pct">מדידה</span>
            <span className="pct-sub">ללא תשלום</span>
            <div className="when">הגעת המודד לאתר ללא עלות.</div>
          </div>
          <div className="pay-step">
            <span className="pct">מ-600 ₪</span>
            <div className="when">עבור תכנון הפרויקט.</div>
          </div>
          <div className="pay-step">
            <span className="pct">50%</span>
            <div className="when">מקדמה. לאחר אישור המחיר הסופי ההזמנה עוברת לייצור.</div>
          </div>
          <div className="pay-step">
            <span className="pct">50%</span>
            <div className="when">לפני שליחת המערכת להתקנה אצל הלקוח.</div>
          </div>
        </div>

        <div className="bank-box">
          <div className="btitle">פרטי חשבון לתשלום</div>
          <div className="bank-row"><span>מוטב</span><strong>BONIM / בונים</strong></div>
          <div className="bank-row"><span>בנק</span><strong>בנק לאומי 10</strong></div>
          <div className="bank-row"><span>סניף</span><strong>רמלה 936</strong></div>
          <div className="bank-row"><span>מספר חשבון</span><strong dir="ltr">047432/17</strong></div>
        </div>

        <div className="valid-note">
          ⏱ זמן ייצור: <strong>{BRAND.productionDays} ימי עבודה</strong> ממועד תשלום המקדמה.
        </div>
      </div>

      <div style={{flex:1}}></div>

      <div className="pg-footer">
        <img className="fb-logo" src={logoWhite} alt="BONIM" />
        <span className="fc"><span className="v">{data.clientName || '–'}</span> · <span className="v">{data.city || '–'}</span> · {BRAND.site}</span>
        <span className="fn">4</span>
      </div>
    </div>
  );
}
