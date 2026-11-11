import { KPFormData, KPComputed } from '@/hooks/useKPData';
import { getSystem } from '@/data/systems';
import { BRAND } from '@/data/brand';
import logoBlue from '@/assets/kp/bonim_logo_flat_blue.png';

interface Props {
  data: KPFormData;
  computed: KPComputed;
}

const heGlass = (type: string) => {
  const map: Record<string, string> = {
    'Прозрачное закалённое 10 мм': 'שקוף מחוסם 10 מ״מ',
    'Триплекс 5+5 мм прозрачный': 'טריפלקס 5+5 מ״מ שקוף',
    'Триплекс 5+5 мм молочный': 'טריפלקס 5+5 מ״מ חלבי',
    'Противосолнечное 10 мм': 'אנטי-שמש 10 מ״מ',
  };
  return map[type] || type;
};

export function KPPage3EstimateHe({ data, computed }: Props) {
  const fmt = (n: number) => n.toLocaleString('he-IL');
  const sys = getSystem(data.productType);

  return (
    <div className="kp-page kp-rtl" style={{display:'flex', flexDirection:'column', minHeight:'297mm'}}>
      <div className="est-header">
        <div className="label">אומדן מקדמי</div>
        <h2>{sys.he.coverTitle} – <span className="v">{data.productType}</span></h2>
        <div className="sub">לקוח: <span className="v">{data.clientName || '–'}</span> · <span className="v">{data.city || '–'}</span> · שטח: <span className="v">{computed.area}</span> מ״ר</div>
      </div>

      <div className="inner" style={{paddingTop:'16px', paddingBottom:'8px'}}>
        <div className="sizes-grid" style={{marginBottom:'14px'}}>
          <div className="size-card">
            <label>מערכת</label>
            <span className="val" style={{fontSize:'1rem'}}>{data.productType}</span>
          </div>
          <div className="size-card">
            <label>אורך</label>
            <span className="val">{data.length}</span>
            <span className="unit">ס״מ</span>
          </div>
          <div className="size-card">
            <label>גובה</label>
            <span className="val">{data.height}</span>
            <span className="unit">ס״מ</span>
          </div>
          <div className="size-card">
            <label>שטח</label>
            <span className="val">{computed.area}</span>
            <span className="unit">מ״ר</span>
          </div>
        </div>

        <div className="sys-box" style={{marginBottom:'14px'}}>
          <h4>{data.productType} – {sys.he.tagline}</h4>
          <p>{sys.he.desc}</p>
          <h4 className="glaz-head" style={{fontSize:'1.05rem', marginTop:'10px'}}>זיגוג</h4>
          <p>זכוכית בטיחות: מחוסמת 10 מ״מ או טריפלקס 5+5 מ״מ. כל הזכוכיות עומדות בדרישות התקן הישראלי.</p>
        </div>

        <table className="spec" style={{marginBottom:'12px'}}>
          <thead>
            <tr>
              <th>מס׳</th><th>פריט</th><th>מפרט</th><th>כמות</th><th>מחיר</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{data.productType}</td>
              <td>{sys.he.tagline}</td>
              <td><span className="v">{computed.area}</span> מ״ר</td>
              <td><span className="v">{fmt(computed.priceGross)}</span> ₪/מ״ר</td>
            </tr>
            <tr>
              <td>2</td>
              <td>זכוכית</td>
              <td><span className="v">{heGlass(data.glassType)}</span></td>
              <td>–</td>
              <td>כלול</td>
            </tr>
            <tr>
              <td>3</td>
              <td>התקנה ומונטאז׳</td>
              <td>התקנה מקצועית</td>
              <td>–</td>
              <td>מחירון נפרד</td>
            </tr>
            <tr>
              <td>4</td>
              <td>עבודות נוספות / פסי אלומיניום</td>
              <td>לפי מידות האתר</td>
              <td>–</td>
              <td><span className="v">{fmt(computed.extrasGross)}</span> ₪</td>
            </tr>
            <tr className="total">
              <td colSpan={3}><strong>סה״כ כולל מע״מ (אומדן)</strong></td>
              <td style={{whiteSpace:'nowrap', fontSize:'0.85rem'}}><span className="v">{computed.area}</span> מ״ר</td>
              <td style={{whiteSpace:'nowrap', fontSize:'0.85rem'}}><span className="v">{computed.totalPrice}</span> ₪</td>
            </tr>
          </tbody>
        </table>

        <div className="note-box" style={{fontSize:'0.75rem', lineHeight:'1.3', padding:'6px 12px'}}>
          ⚠️ כל המחירים כוללים מע״מ 18% (מתוכם מע״מ: {computed.vatStr} ₪) והינם אומדן בלבד. מבוססים על המידות שנמסרו על ידי הלקוח. המחיר הסופי ייקבע לאחר מדידה מקצועית. מחיר המ״ר נשאר קבוע.
        </div>

        <div className="guarantee-box" style={{marginTop:'6px', padding:'8px 16px', display:'flex', alignItems:'center', gap:'10px'}}>
          <h5 style={{fontSize:'0.85rem', whiteSpace:'nowrap'}}>🛡️ אחריות</h5>
          <p style={{fontSize:'0.78rem', lineHeight:'1.35', margin:0}}>אחריות לשנה על המוצר ועל ההתקנה. תקפה בתנאי שימוש תקין ותחזוקה נאותה.</p>
        </div>
      </div>

      <div style={{flex:1}}></div>

      <div className="pg-footer">
        <img className="fb-logo" src={logoBlue} alt="BONIM" />
        <span className="fc">לקוח: <span className="v">{data.clientName || '–'}</span> · {BRAND.phone}</span>
        <span className="fn">2</span>
      </div>
    </div>
  );
}
