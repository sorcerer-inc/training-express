//string型のチェック
export function stringCheck(data: number | string) {
  return typeof data === 'string';
}

//number型のチェック
export function numberCheck(data: number | string) {
  return typeof data === 'number';
}
