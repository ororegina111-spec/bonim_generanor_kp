import { useState, useCallback, useMemo } from 'react';
import type { SystemId } from '@/data/systems';

export interface KPFormData {
  orderNumber: string;
  date: string;
  clientName: string;
  city: string;
  productType: SystemId;
  glassType: string;
  length: number;
  height: number;
  pricePerSqm: number;
  extras: number;
}

export interface KPComputed {
  area: string;
  systemCost: string;
  totalPrice: string;
  lengthStr: string;
  heightStr: string;
  extrasStr: string;
}

const fmt = (n: number) => n.toLocaleString('ru-RU');

const todayStr = () => new Date().toLocaleDateString('ru-RU');

const newOrderNo = () => '2026-' + String(Math.floor(Math.random() * 900) + 100);

const defaultData: KPFormData = {
  orderNumber: newOrderNo(),
  date: todayStr(),
  clientName: '',
  city: '',
  productType: 'FINZONE-30',
  glassType: 'Прозрачное закалённое 10 мм',
  length: 450,
  height: 280,
  pricePerSqm: 0,
  extras: 0,
};

export function useKPData() {
  const [formData, setFormData] = useState<KPFormData>(defaultData);

  const updateField = useCallback(<K extends keyof KPFormData>(key: K, value: KPFormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({ ...defaultData, orderNumber: newOrderNo(), date: todayStr() });
  }, []);

  // Расчёт как в исходном генераторе: площадь = длина x высота, стоимость = площадь x цена за м2
  const computed: KPComputed = useMemo(() => {
    const area = (formData.length * formData.height) / 10000;
    const systemCost = Math.round(area * formData.pricePerSqm);
    const total = systemCost + formData.extras;
    return {
      area: area.toFixed(2),
      systemCost: fmt(systemCost),
      totalPrice: fmt(total),
      lengthStr: formData.length + ' см',
      heightStr: formData.height + ' см',
      extrasStr: fmt(formData.extras),
    };
  }, [formData]);

  return { formData, updateField, resetForm, computed };
}
