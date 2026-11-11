import { KPFormData } from '@/hooks/useKPData';
import { BRAND } from '@/data/brand';
import { KPContacts } from '@/components/kp/KPContacts';
import logoBlue from '@/assets/kp/bonim_logo_flat_blue.png';

interface Props {
  data: KPFormData;
}

export function KPPage5Conditions({ data }: Props) {
  return (
    <div className="kp-page" style={{display:'flex', flexDirection:'column', minHeight:'297mm'}}>
      <div className="cond-head">
        <div className="label">Общие условия</div>
        <h2>Условия коммерческого предложения</h2>
      </div>

      <div className="inner" style={{paddingTop:'12px'}}>
        <ul className="cond-list">
          <li>Цена ориентировочная, основана на размерах и информации заказчика, указана с НДС 18%. Окончательная цена определяется после профессионального замера на объекте.</li>
          <li>Цена за м² остаётся неизменной. Если фактические размеры отличаются от заявленных, стоимость корректируется пропорционально.</li>
          <li>КП не является подтверждением заказа. Заказ вступает в силу после подписания формы заказа и/или внесения аванса. Внесение аванса означает согласие со всеми условиями.</li>
          <li>Срок изготовления – {BRAND.productionDays} рабочих дня с момента оплаты аванса. Окончательный срок фиксируется после замера.</li>
          <li>При особых требованиях инженера, архитектора или местных органов возможны технические изменения и корректировка цены, согласованные с заказчиком заранее.</li>
          <li>Компания не отвечает за задержки по причинам непреодолимой силы: война, чрезвычайные ситуации, забастовки, дефицит сырья.</li>
          <li>Все системы изготавливаются по индивидуальным размерам. Отмена заказа невозможна, уплаченные суммы не возвращаются.</li>
          <li>Право собственности на продукцию остаётся за компанией до полной оплаты.</li>
          <li><strong>Предложение действительно 10 дней</strong> с даты выдачи.</li>
        </ul>

        <div className="label" style={{marginBottom:'10px'}}>Условия оплаты</div>
        <div className="pay-steps">
          <div className="pay-step pay-free">
            <span className="pct">ЗАМЕР</span>
            <span className="pct-sub">БЕСПЛАТНО</span>
            <div className="when">Выезд замерщика на объект бесплатно.</div>
          </div>
          <div className="pay-step">
            <span className="pct">от 600 ₪</span>
            <div className="when">За проект.</div>
          </div>
          <div className="pay-step">
            <span className="pct">50%</span>
            <div className="when">Аванс. После утверждения итоговой цены заказ идёт в производство.</div>
          </div>
          <div className="pay-step">
            <span className="pct">50%</span>
            <div className="when">Перед отправкой на установку клиенту.</div>
          </div>
        </div>

        <div className="bank-box">
          <div className="btitle">Реквизиты для оплаты</div>
          <div className="bank-row"><span>Получатель</span><strong>BONIM / <bdi dir="rtl">בונים</bdi></strong></div>
          <div className="bank-row"><span>Банк</span><strong><bdi dir="rtl">בנק לאומי 10</bdi></strong></div>
          <div className="bank-row"><span>Филиал</span><strong><bdi dir="rtl">רמלה 936</bdi></strong></div>
          <div className="bank-row"><span>Счёт</span><strong>047432/17</strong></div>
        </div>

        <div className="valid-note">
          ⏱ Срок изготовления: <strong>{BRAND.productionDays} рабочих дня</strong> с момента оплаты аванса.
        </div>
      </div>

      <KPContacts lang="ru" />

      <div style={{flex:1}}></div>

      <div className="pg-footer">
        <img className="fb-logo" src={logoBlue} alt="BONIM" />
        <span className="fc"><span className="v">{data.clientName || '–'}</span> · <span className="v">{data.city || '–'}</span> · {BRAND.site}</span>
        <span className="fn">4</span>
      </div>
    </div>
  );
}
