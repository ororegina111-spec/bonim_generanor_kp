import { KPFormData, KPComputed } from '@/hooks/useKPData';
import { getSystem } from '@/data/systems';
import { BRAND } from '@/data/brand';
import logoBlue from '@/assets/kp/bonim_logo_flat_blue.png';
import hero from '@/assets/kp/hero_cover.jpg';

interface Props {
  data: KPFormData;
  computed: KPComputed;
}

export function KPPage1Cover({ data, computed }: Props) {
  const sys = getSystem(data.productType);
  return (
    <div className="kp-page cover">
      <div className="cover-top">
        <div className="cover-logo">
          <img src={logoBlue} alt="BONIM" />
        </div>
        <div className="cover-meta">
          <span className="order-no">№ {data.orderNumber || '–'}</span>
          Дата: {data.date || '–'}<br />
          Действует 10 дней
        </div>
      </div>

      <div className="cover-hero">
        <img src={hero} alt="Hero" />
        <div className="cover-hero-grad"></div>
        <div className="cover-title">
          <div className="label">Коммерческое предложение</div>
          <h1>
            {sys.ru.coverTitle}<br />
            <span className="gold-text">{data.productType}</span>
          </h1>
          <div className="sub">{BRAND.site} · Израиль · Производство и монтаж</div>
        </div>
      </div>

      <div className="cover-strip">
        <div className="strip-item">
          <label>Клиент</label>
          <span className="v">{data.clientName || '–'}</span>
        </div>
        <div className="strip-item">
          <label>Город</label>
          <span className="v">{data.city || '–'}</span>
        </div>
        <div className="strip-item">
          <label>Размеры</label>
          <span>{data.length} × {data.height} см</span>
        </div>
        <div className="strip-item">
          <label>Площадь</label>
          <span className="v">{computed.area} м²</span>
        </div>
      </div>

      <div className="cover-greet">
        Здравствуйте, <strong>{data.clientName || '–'}</strong>! Благодарим за интерес к <strong>BONIM</strong>. На основании ваших данных мы подготовили предложение по системе <strong>{data.productType}</strong>.
      </div>

      <div className="pg-footer">
        <img className="fb-logo" src={logoBlue} alt="BONIM" />
        <span className="fc">{BRAND.site} · {BRAND.phone}</span>
        <span className="fn">1</span>
      </div>
    </div>
  );
}
