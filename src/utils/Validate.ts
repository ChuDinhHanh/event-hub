export interface InputTextValidate {
  textError: string;
  isError: boolean;
  visible: boolean;
}

export function isEmail(text: string): boolean {
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return pattern.test(text);
}

export function isPassword(text: string): boolean {
  const pattern = /^[0-9a-zA-Z]{1,8}$/;
  return pattern.test(text);
}

export function isBlank(text: string): boolean {
  const pattern = /^\s*$/;
  return pattern.test(text);
}

export function isNotSpecialCharacter(text: string): boolean {
  const pattern = /^[a-zA-Z0-9]*$/;
  return pattern.test(text);
}

export function isInsideLimitedLength(
  text: string,
  limitMin: number,
  limitMax: number,
): boolean {
  const pattern = new RegExp(`^[a-zA-Z0-9]{${limitMin},${limitMax}}$`);
  return pattern.test(text);
}
