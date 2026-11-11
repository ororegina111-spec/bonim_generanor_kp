import { KPFormData } from '@/hooks/useKPData';
import { KPPage4Systems } from '@/components/kp/KPPage4Systems';

export function KPPage4SystemsHe({ data }: { data: KPFormData }) {
  return <KPPage4Systems data={data} lang="he" />;
}
