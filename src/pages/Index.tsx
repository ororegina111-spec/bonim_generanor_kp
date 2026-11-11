import { useEffect, useState } from 'react';
import { useKPData } from '@/hooks/useKPData';
import { KPSidebar, KPLang } from '@/components/kp/KPSidebar';
import { KPPage1Cover } from '@/components/kp/KPPage1Cover';
import { KPPage3Estimate } from '@/components/kp/KPPage3Estimate';
import { KPPage4Systems } from '@/components/kp/KPPage4Systems';
import { KPPage5Conditions } from '@/components/kp/KPPage5Conditions';
import { KPPage1CoverHe } from '@/components/kp/he/KPPage1CoverHe';
import { KPPage3EstimateHe } from '@/components/kp/he/KPPage3EstimateHe';
import { KPPage4SystemsHe } from '@/components/kp/he/KPPage4SystemsHe';
import { KPPage5ConditionsHe } from '@/components/kp/he/KPPage5ConditionsHe';
import { exportAsHTML, printPDF } from '@/lib/kp-export';
import '@/styles/kp-template.css';
import '@/styles/kp-template-he.css';
import '@/styles/kp-bonim-extra.css';
import '@/styles/kp-bonim-light.css';

const Index = () => {
  const { formData, updateField, resetForm, computed } = useKPData();
  const [lang, setLang] = useState<KPLang>('ru');

  // Телефон: меню сверху, страницы КП уменьшаются по ширине экрана
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const narrow = vw < 900;

  const handlePrintPDF = async () => {
    if (!formData.clientName) {
      alert(lang === 'ru' ? 'Введите имя клиента' : 'נא להזין שם לקוח');
      return;
    }
    const prefix = lang === 'ru' ? 'КП' : 'הצעת_מחיר';
    const fileName = `${prefix}_${formData.clientName}_${formData.orderNumber}`;
    await printPDF('kp-render-area', fileName, lang);
  };

  const handleDownloadHTML = async () => {
    if (!formData.clientName) {
      alert(lang === 'ru' ? 'Введите имя клиента' : 'נא להזין שם לקוח');
      return;
    }
    const prefix = lang === 'ru' ? 'КП' : 'הצעת_מחיר';
    const fileName = `${prefix}_${formData.clientName}_${formData.orderNumber}`;
    await exportAsHTML('kp-render-area', fileName, lang);
  };

  return (
    <div style={{ display: 'flex', flexDirection: narrow ? 'column' : 'row', minHeight: '100vh' }}>
      <KPSidebar
        data={formData}
        computed={computed}
        lang={lang}
        onLangChange={setLang}
        onUpdate={updateField}
        onReset={resetForm}
        onPrintPDF={handlePrintPDF}
        onDownloadHTML={handleDownloadHTML}
      />
      
      <div
        className="kp-preview-wrapper"
        style={{
          marginLeft: narrow ? 0 : '300px',
          padding: narrow ? '8px 0' : '20px',
          background: '#2A2A2A',
          flex: 1,
          minHeight: '100vh',
          ...(narrow ? { zoom: Math.min(1, vw / 794) } : {}),
        }}
      >
        <div id="kp-render-area">
          {lang === 'ru' ? (
            <>
              <KPPage1Cover data={formData} computed={computed} />
              <KPPage3Estimate data={formData} computed={computed} />
              <KPPage4Systems data={formData} />
              <KPPage5Conditions data={formData} />
            </>
          ) : (
            <>
              <KPPage1CoverHe data={formData} computed={computed} />
              <KPPage3EstimateHe data={formData} computed={computed} />
              <KPPage4SystemsHe data={formData} />
              <KPPage5ConditionsHe data={formData} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
