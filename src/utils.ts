
export function stringify(value: any) {
  return value == null ?
    'null' :
    typeof value === 'symbol' ?
      (value as any).description :
      value.toString();
}
