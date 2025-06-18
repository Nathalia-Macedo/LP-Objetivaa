// // src/hooks/useDynamicTranslation.js
// import { useCallback } from "react";

// const API = "https://api.mymemory.translated.net/get";

// /* ---------- Funções puras ---------- */

// /** Traduz várias strings em 1 requisição (PT → targetLang). */
// export const translateBatch = async (arr, targetLang = "en") => {
//   if (!arr?.length) return [];

//   const joined = arr.join("|||");
//   const cacheKey = `${targetLang}:${joined}`;

//   // cache em sessionStorage
//   const cached = sessionStorage.getItem(cacheKey);
//   if (cached) return JSON.parse(cached);

//   const url =
//     API +
//     "?" +
//     new URLSearchParams({ q: joined, langpair: `pt|${targetLang}` });

//   try {
//     const res = await fetch(url);
//     const data = await res.json();
//     const out = data.responseData.translatedText.split("|||");

//     sessionStorage.setItem(cacheKey, JSON.stringify(out));
//     return out;
//   } catch (err) {
//     console.error("Erro na tradução batch:", err);
//     return arr; // fallback
//   }
// };

// /** Traduz string única. */
// export const translateText = async (str, targetLang = "en") => {
//   const [result] = await translateBatch([str], targetLang);
//   return result;
// };

// /* ---------- Hook (opcional) ---------- */

// const useDynamicTranslation = () => {
//   const translateBatchCb = useCallback(translateBatch, []);
//   const translateTextCb = useCallback(translateText, []);

//   return { translateBatch: translateBatchCb, translateText: translateTextCb };
// };

// export default useDynamicTranslation;
// src/hooks/useDynamicTranslation.js
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
