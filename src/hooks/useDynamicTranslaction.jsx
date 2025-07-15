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
export const translateText = async (str, to = "en") => {
  const key = `${to}:${str}`;
  const cached = sessionStorage.getItem(key);
  if (cached) return cached;

  const translated = await google(str, to);
  const cleaned = translated.replace(/\|+/g, " ").trim();

  sessionStorage.setItem(key, cleaned);
  return cleaned;
};

export const translateBatch = async (arr, to = "en") => {
  const results = [];
  for (const str of arr) {
    const t = await translateText(str, to);
    results.push(t);
  }
  return results;
};

/* ---------- Hook opcional ---------- */
const useDynamicTranslation = () => {
  const translateBatchCb = useCallback(translateBatch, []);
  const translateTextCb = useCallback(translateText, []);

  return { translateBatch: translateBatchCb, translateText: translateTextCb };
};

export default useDynamicTranslation;
