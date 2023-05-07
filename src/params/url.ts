export function match(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return parseInt(value) > 0;
  }
}
