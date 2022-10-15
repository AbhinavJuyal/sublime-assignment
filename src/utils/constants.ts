export const CHECKBOX = "Multichoice Checkbox";
export const TEXT = "Text";
export const RADIO = "Single Select Radio";

export const categories: string[] = [CHECKBOX, RADIO, TEXT];

export const switchCase = (cases: any) => (defaultCase: any) => (key: string) =>
  cases.hasOwnProperty(key) ? cases[key]() : defaultCase;
