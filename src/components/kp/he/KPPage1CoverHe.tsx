import { KPFormData, KPComputed } from '@/hooks/useKPData';
import { getSystem } from '@/data/systems';
import { BRAND } from '@/data/brand';
import logoBlue from '@/assets/kp/bonim_logo_flat_blue.png';
import hero from '@/assets/kp/hero_cover.jpg';

interface Props {
  data: KPFormData;
  computed: KPComputed;
}

export function KPPage1CoverHe({ data, computed }: Props) {
  const sys = getSystem(data.productType);
  return (
    <div className="kp-page kp-rtl cover">
      <div className="cover-top">
        <div className="cover-logo">
          <img src={logoBlue} alt="BONIM" />
        </div>
        <div className="cover-meta">
          <span className="order-no">מס׳ <span className="v">{data.orderNumber || '–'}</span></span>
          תאריך: <span className="v">{data.date || '–'}</span><br />
          תוקף ההצעה 10 ימים
        </div>
      </div>

      <div className="cover-hero">
        <img src={hero} alt="BONIM" />
        <div className="cover-hero-grad"></div>
        <div className="cover-title">
          <div className="label">הצעת מחיר</div>
          <h1>
            {sys.he.coverTitle}<br />
            <span className="gold-text"><span className="v">{data.productType}</span></span>
          </h1>
          <div className="sub">{BRAND.site} · ישראל · ייצור והתקנה</div>
        </div>
      </div>

      <div className="cover-strip">
        <div className="strip-item"><label>לקוח</label><span className="v">{data.clientName || '–'}</span></div>
        <div className="strip-item"><label>עיר</label><span className="v">{data.city || '–'}</span></div>
        <div className="strip-item"><label>אורך × גובה</label><span>{data.length} × {data.height} ס״מ</span></div>
        <div className="strip-item"><label>שטח</label><span><span className="v">{computed.area}</span> מ״ר</span></div>
      </div>

      <div className="cover-greet">
        שלום, <strong><span className="v">{data.clientName || '–'}</span></strong>!<br />
        תודה על המידות שמסרת. על בסיס הנתונים הכנו עבורך הצעת מחיר מקדמית למערכת <strong>{data.productType}</strong>.
      </div>

      <div className="pg-footer">
        <img className="fb-logo" src={logoBlue} alt="BONIM" />
        <span className="fc">{BRAND.site} · {BRAND.phone}</span>
        <span className="fn">1</span>
      </div>
    </div>
  );
}
