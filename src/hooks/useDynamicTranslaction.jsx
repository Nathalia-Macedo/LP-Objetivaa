import { useCallback } from "react";

const google = async (text, to = "en") => {
  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=pt&tl=" +
    to +
    "&dt=t&q=" +
    encodeURIComponent(text);

  const res = await fetch(url);
  const data = await res.json();
  return data[0]?.map((seg) => seg[0]).join("") || text;
};

/* ---------- Funções puras ---------- */
export const translateBatch = async (arr, to = "en") => {
  const joined = arr.join("|||");
  const key = `${to}:${joined}`;

  const cached = sessionStorage.getItem(key);
  if (cached) return JSON.parse(cached);

  const translatedJoined = await google(joined, to);
  const out = translatedJoined.split("|||");

  sessionStorage.setItem(key, JSON.stringify(out));
  return out;
};

export const translateText = async (str, to = "en") => {
  const [t] = await translateBatch([str], to);
  return t;
};

/* ---------- Hook opcional ---------- */
const useDynamicTranslation = () => {
  const translateBatchCb = useCallback(translateBatch, []);
  const translateTextCb  = useCallback(translateText,  []);

  return { translateBatch: translateBatchCb, translateText: translateTextCb };
};

export default useDynamicTranslation;
