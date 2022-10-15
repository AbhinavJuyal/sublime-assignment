import { v4 } from "uuid";

export const store = (create = true, data: any) => {
  window.localStorage.setItem(
    "create",
    JSON.stringify({ saved: false, ...data })
  );
};
