// Convert English digits to Persian
export const toPersianDigits = (input: number | string): string =>
  input.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
