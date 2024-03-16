export interface InputTextValidate {
  textError: string;
  isError: boolean;
  visible: boolean;
}

export class Validator {
  static isEmail(text: string): boolean {
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return pattern.test(text);
  }

  static isPassword(text: string): boolean {
    const pattern = /^[0-9a-zA-Z]{1,8}$/;
    return pattern.test(text);
  }

  static isBlank(text: string): boolean {
    const pattern = /^\s*$/;
    return pattern.test(text);
  }

  static isNotSpecialCharacter(text: string): boolean {
    const pattern = /^[a-zA-Z0-9\s]*$/;
    return pattern.test(text);
  }

  static isInsideLimitedLength(
    text: string,
    limitMin: number,
    limitMax: number,
  ): boolean {
    const pattern = text.length >= limitMin && text.length <= limitMax;
    return pattern;
  }
}
