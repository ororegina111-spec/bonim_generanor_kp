import { KPFormData, KPComputed } from '@/hooks/useKPData';
import { getSystem } from '@/data/systems';
import { BRAND } from '@/data/brand';
import logoBlue from '@/assets/kp/bonim_logo_flat_blue.png';

interface Props {
  data: KPFormData;
  computed: KPComputed;
}

export function KPPage3Estimate({ data, computed }: Props) {
  const fmt = (n: number) => n.toLocaleString('ru-RU');
  const sys = getSystem(data.productType);

  return (
    <div className="kp-page" style={{display:'flex', flexDirection:'column', minHeight:'297mm'}}>
      <div className="est-header">
        <div className="label">Предварительная смета</div>
        <h2>{sys.ru.coverTitle} – <span className="v">{data.productType}</span></h2>
        <div className="sub">Клиент: <span className="v">{data.clientName || '–'}</span> · <span className="v">{data.city || '–'}</span> · Площадь: <span className="v">{computed.area}</span> м²</div>
      </div>

      <div className="inner" style={{paddingTop:'16px', paddingBottom:'10px'}}>
        <div className="sizes-grid" style={{marginBottom:'14px'}}>
          <div className="size-card">
            <label>Длина</label>
            <span className="val">{data.length}</span>
            <span className="unit">см</span>
          </div>
          <div className="size-card">
            <label>Высота</label>
            <span className="val">{data.height}</span>
            <span className="unit">см</span>
          </div>
          <div className="size-card">
            <label>Площадь</label>
            <span className="val">{computed.area}</span>
            <span className="unit">м²</span>
          </div>
          <div className="size-card">
            <label>Система</label>
            <span className="val" style={{fontSize:'1rem'}}>{data.productType}</span>
          </div>
        </div>

        <div className="sys-box">
          <h4>Система <span className="v">{data.productType}</span> – {sys.ru.tagline.toLowerCase()}</h4>
          <p>{sys.ru.desc}</p>
          <h4 className="glaz-head" style={{fontSize:'1.05rem', marginTop:'10px'}}>Остекление</h4>
          <p>Безопасное стекло: закалённое 10 мм или триплекс 5+5 мм. Все стёкла соответствуют требованиям израильского стандарта.</p>
        </div>

        <table className="spec">
          <thead>
            <tr>
              <th>№</th><th>Наименование</th><th>Спецификация</th><th>Кол-во</th><th>Цена</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Система <span className="v">{data.productType}</span></td>
              <td>{sys.ru.tagline}</td>
              <td><span className="v">{computed.area}</span> м²</td>
              <td><span className="v">{fmt(computed.priceGross)}</span> ₪/м²</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Стекло</td>
              <td><span className="v">{data.glassType}</span></td>
              <td>–</td>
              <td>Включено</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Монтаж и установка</td>
              <td>Профессиональный монтаж</td>
              <td>–</td>
              <td>Отдельный прайс</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Доп. работы / алюминиевые планки</td>
              <td>По размерам объекта</td>
              <td>–</td>
              <td><span className="v">{fmt(computed.extrasGross)}</span> ₪</td>
            </tr>
            <tr className="total">
              <td colSpan={3}><strong>ИТОГО с НДС (ориентировочно)</strong></td>
              <td><span className="v">{computed.area}</span> м²</td>
              <td><span className="v">{computed.totalPrice}</span> ₪</td>
            </tr>
          </tbody>
        </table>

        <div className="note-box" style={{fontSize:'0.75rem', lineHeight:'1.3', padding:'6px 12px'}}>
          Все цены указаны с НДС 18% (в том числе НДС: {computed.vatStr} ₪), ориентировочные. Основаны на размерах клиента. Окончательная цена – после замера. Цена за м² фиксируется.
        </div>

        <div className="guarantee-box" style={{marginTop:'6px', padding:'8px 16px', display:'flex', alignItems:'center', gap:'10px'}}>
          <h5 style={{whiteSpace:'nowrap'}}>🛡️ Гарантия</h5>
          <p style={{fontSize:'0.78rem', lineHeight:'1.35', margin:0}}>{BRAND.warrantyYears} год на изделие и монтаж. Действует при нормальной эксплуатации и надлежащем обслуживании.</p>
        </div>
      </div>

      <div style={{flex:1}}></div>

      <div className="pg-footer">
        <img className="fb-logo" src={logoBlue} alt="BONIM" />
        <span className="fc">Клиент: <span className="v">{data.clientName || '–'}</span> · {BRAND.phone}</span>
        <span className="fn">2</span>
      </div>
    </div>
  );
}
