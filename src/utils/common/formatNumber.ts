export const formatNumber = (value: string): string => {
  // 数字とカンマだけを残して、他のすべてを削除
  const numbers = value.replace(/[^0-9,]/g, '');
  // カンマ削除
  const numberWithoutCommas = numbers.replace(/,/g, '');
  // 13桁に制限
  const limitedNumber = numberWithoutCommas.slice(0, 13);
  // 3桁ごとにカンマを追加
  return limitedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const unformatNumber = (value: string): number => {
  return Number(value.replace(/,/g, ''));
};