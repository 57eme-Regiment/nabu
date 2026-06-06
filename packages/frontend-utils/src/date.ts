import { format } from 'date-fns';

export function formatDateTime(date: Date | string): string {
  return format(new Date(date), 'dd/MM/yy, HH:mm:ss');
}

/** Calcule une durée au format `hh:mm:ss` entre `from` et `to`. */
export function getTimeBetween(from: Date | string, to: Date | string): string {
  const ms = new Date(to).getTime() - new Date(from).getTime();
  const totalSeconds = Math.floor(Math.abs(ms) / 1000);
  const hh = Math.floor(totalSeconds / 3600);
  const mm = Math.floor((totalSeconds % 3600) / 60);
  const ss = totalSeconds % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
}
