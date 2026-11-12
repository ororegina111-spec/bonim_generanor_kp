import { KPFormData } from '@/hooks/useKPData';
import { KPPage5Conditions } from '@/components/kp/KPPage5Conditions';

export function KPPage5ConditionsHe({ data }: { data: KPFormData }) {
  return <KPPage5Conditions data={data} lang="he" />;
}
