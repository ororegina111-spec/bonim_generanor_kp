import { CLIENT, img } from '@/client';

export type SystemId = string;

interface SystemText {
  /** Короткая подпись под названием */
  tagline: string;
  /** Описание в 1-2 предложения */
  desc: string;
  /** Строки характеристик: [название, значение] */
  specs: [string, string][];
  /** Заголовок обложки: что именно предлагаем */
  coverTitle: string;
}

export interface SystemInfo {
  id: SystemId;
  /** Фото системы. Если фото нет, показывается плашка с логотипом. */
  photo?: string;
  ru: SystemText;
  he: SystemText;
}

/** Список систем клиента берётся из clients/<клиент>/client.json */
export const SYSTEMS: SystemInfo[] = CLIENT.systems.map((s: any) => ({ ...s, photo: img(s.photo) }));

export const getSystem = (id: string): SystemInfo =>
  SYSTEMS.find(s => s.id === id) ?? SYSTEMS.find(s => s.id === CLIENT.defaultSystem) ?? SYSTEMS[0];
