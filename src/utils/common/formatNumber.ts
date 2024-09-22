export const formatNumber = (value: string): string => {
  // 숫자와 쉼표만 남기고 모두 제거
  const numbers = value.replace(/[^0-9,]/g, '');
  // 쉼표 제거
  const numberWithoutCommas = numbers.replace(/,/g, '');
  // 13자리로 제한
  const limitedNumber = numberWithoutCommas.slice(0, 13);
  // 세 자리마다 쉼표 추가
  return limitedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const unformatNumber = (value: string): number => {
  return Number(value.replace(/,/g, ''));
};