export const CHECKBOX = "Multichoice Checkbox";
export const TEXT = "Text";
export const RADIO = "Single Select Radio";

export const categories: string[] = [CHECKBOX, RADIO, TEXT];

export const switchCase = (cases: any) => (defaultCase: any) => (key: string) =>
  cases.hasOwnProperty(key) ? cases[key]() : defaultCase;

export const storageKey: string = "form";

export const fetchData = () => ({
  ...JSON.parse(window.localStorage.getItem(storageKey) as string),
});

export const deleteStorage = (id: string) => {
  const forms = fetchData();
  delete forms[id as string];
  window.localStorage.setItem(storageKey, JSON.stringify(forms));
};
