import { Fragment } from 'react';
import { fill } from '@/client';

/** Текст клиента с подстановкой {days} и выделением **жирного** */
export function Rich({ text }: { text: string }) {
  const parts = fill(text).split('**');
  return <>{parts.map((p, i) => (i % 2 ? <strong key={i}>{p}</strong> : <Fragment key={i}>{p}</Fragment>))}</>;
}
