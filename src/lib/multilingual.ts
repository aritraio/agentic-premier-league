/**
 * Language configuration for multilingual AI report generation.
 *
 * Controls the language instruction injected into the Gemini prompt
 * and provides UI labels for the language selector.
 */

import type { ReportLanguage } from "../types/issue";

export interface LanguageConfig {
  code: ReportLanguage;
  label: string;
  nativeLabel: string;
  /** Locale for the Web Speech API (e.g. "bn-IN"). */
  speechLocale: string;
  /** Instruction appended to the Gemini prompt. */
  promptInstruction: string;
}

export const LANGUAGES: LanguageConfig[] = [
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
    speechLocale: "en-IN",
    promptInstruction: "",
  },
  {
    code: "bn",
    label: "Bengali",
    nativeLabel: "বাংলা",
    speechLocale: "bn-IN",
    promptInstruction:
      "IMPORTANT: Write the title, summary, complaintMessage, volunteerAction, and suggestedAuthority in Bengali (বাংলা). Keep the JSON keys in English. Keep category and severity values in English exactly as listed above.",
  },
  {
    code: "hi",
    label: "Hindi",
    nativeLabel: "हिन्दी",
    speechLocale: "hi-IN",
    promptInstruction:
      "IMPORTANT: Write the title, summary, complaintMessage, volunteerAction, and suggestedAuthority in Hindi (हिन्दी). Keep the JSON keys in English. Keep category and severity values in English exactly as listed above.",
  },
];

export const LANGUAGE_BY_CODE: Record<ReportLanguage, LanguageConfig> =
  LANGUAGES.reduce(
    (acc, lang) => {
      acc[lang.code] = lang;
      return acc;
    },
    {} as Record<ReportLanguage, LanguageConfig>,
  );

export function getLanguageConfig(code: ReportLanguage): LanguageConfig {
  return LANGUAGE_BY_CODE[code] ?? LANGUAGE_BY_CODE.en;
}
