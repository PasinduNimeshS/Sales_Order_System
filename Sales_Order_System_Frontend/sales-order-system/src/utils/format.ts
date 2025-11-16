export const formatCurrency = (value: number): string => {
  return value.toFixed(2);
};

export const toSLDateString = (dateInput: string | Date): string => {
  let date: Date;

  if (typeof dateInput === 'string') {
    const parsed = Date.parse(dateInput.replace(/\//g, '-')); 
    if (isNaN(parsed)) return '';
    date = new Date(parsed);
  } else {
    date = dateInput;
  }

  if (isNaN(date.getTime())) return '';

  const slOffset = 5.5 * 60 * 60 * 1000;
  const slTime = new Date(date.getTime() + slOffset);

  return slTime.toISOString().split('T')[0];
};

export const formatDate = (dateInput: string | Date): string => {
  return toSLDateString(dateInput);
};