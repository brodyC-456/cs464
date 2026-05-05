import { DatasetItem } from '@/types/data';

export const statusColors = {
  correct: '#e6f4ea',
  close: '#fff9e6',
  wrong: '#f0f0f0',
  default: 'white',
};

export function getItemStatus(
  item: DatasetItem,
  index: number,
  feedback: any
) {
  if (!feedback) return 'default';

  const diff = Math.abs(item.order - (index + 1));

  if (diff === 0) return 'correct';
  if (diff <= 2) return 'close';
  return 'wrong';
}