/**
 * OCR from screenshots via Gemini.
 *
 * Sends an image to the Gemini API with an OCR-specific prompt to
 * extract readable text from complaint screenshots, forms, or notices.
 * Uses the shared rate limiter to respect free-tier limits.
 */

import { waitForSlot } from "./rateLimiter";

const GEMINI_MODEL =
  import.meta.env.VITE_GEMINI_MODEL || "gemini-3.1-flash-lite-preview";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const OCR_PROMPT = `You are an OCR text extractor. Extract ALL readable text from this image.
Return ONLY the extracted text, preserving line breaks and formatting.
Do not add any commentary, explanation, or analysis.
If no text is found, return exactly: [No text found]`;

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message?: string;
  };
}

/**
 * Extract text from an image using Gemini's vision capability.
 *
 * @param imageData Base64-encoded image data (without the data: prefix).
 * @param mimeType  MIME type of the image (e.g. "image/jpeg").
 * @returns Extracted text, or an empty string on failure.
 */
export async function extractTextFromImage(
  imageData: string,
  mimeType: string,
): Promise<{ text: string; error?: string }> {
  const apiKey = GEMINI_API_KEY.trim();
  if (!apiKey) {
    return { text: "", error: "No API key configured for OCR." };
  }

  try {
    await waitForSlot();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        GEMINI_MODEL,
      )}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: OCR_PROMPT },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: imageData,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
          },
        }),
      },
    );

    if (!response.ok) {
      let message = response.statusText;
      try {
        const errorBody = (await response.json()) as GeminiResponse;
        message = errorBody.error?.message || message;
      } catch {
        // keep statusText
      }
      if (response.status === 429) {
        return { text: "", error: "Rate limited — please wait a moment and try again." };
      }
      return { text: "", error: `OCR request failed: ${message}` };
    }

    const data = (await response.json()) as GeminiResponse;
    const text =
      data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? "")
        .join("\n")
        .trim() ?? "";

    if (!text || text === "[No text found]") {
      return { text: "", error: "No readable text found in the image." };
    }

    return { text };
  } catch (error) {
    console.warn("OCR extraction failed:", error);
    return { text: "", error: "Could not extract text. Please try again." };
  }
}
