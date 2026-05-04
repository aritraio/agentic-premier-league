import { useState, useEffect, useCallback, useRef } from "react";
import { Mic, MicOff, Languages } from "lucide-react";
import { LANGUAGES, type LanguageConfig } from "../../lib/multilingual";

interface VoiceInputProps {
  /** Called with the final transcript to insert into the form. */
  onTranscript: (text: string) => void;
}

/**
 * Microphone button with real-time speech-to-text transcription.
 *
 * Uses the Web Speech API (`SpeechRecognition`). Hidden entirely when the
 * browser does not support it. Supports English, Bengali, and Hindi via a
 * language selector.
 */
export function VoiceInput({ onTranscript }: VoiceInputProps) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [lang, setLang] = useState<LanguageConfig>(LANGUAGES[0]);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognitionApi =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    setSupported(Boolean(SpeechRecognitionApi));
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognitionApi =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionApi) return;

    const recognition = new SpeechRecognitionApi();
    recognition.lang = lang.speechLocale;
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
    setTranscript("");
  }, [lang]);

  const handleInsert = () => {
    if (transcript.trim()) {
      onTranscript(transcript.trim());
      setTranscript("");
    }
  };

  if (!supported) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={listening ? stopListening : startListening}
          className={
            "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold shadow-sm transition-all " +
            (listening
              ? "bg-red-500 text-white shadow-red-900/20 hover:bg-red-600"
              : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700")
          }
          aria-label={listening ? "Stop recording" : "Start voice input"}
        >
          {listening ? (
            <>
              <MicOff className="h-3.5 w-3.5" aria-hidden />
              <span className="parapulse-voice-pulse inline-block h-2 w-2 rounded-full bg-white" />
              Stop
            </>
          ) : (
            <>
              <Mic className="h-3.5 w-3.5" aria-hidden />
              Voice
            </>
          )}
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowLangPicker((v) => !v)}
            className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
            aria-label="Select voice language"
          >
            <Languages className="h-3.5 w-3.5" aria-hidden />
            {lang.nativeLabel}
          </button>
          {showLangPicker && (
            <div className="absolute left-0 top-full z-20 mt-1 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    setLang(l);
                    setShowLangPicker(false);
                  }}
                  className={
                    "block w-full px-3 py-1.5 text-left text-xs hover:bg-emerald-50 " +
                    (l.code === lang.code
                      ? "font-semibold text-emerald-700"
                      : "text-slate-700")
                  }
                >
                  {l.nativeLabel} ({l.label})
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {(listening || transcript) && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-medium text-slate-500">
            {listening ? "Listening…" : "Transcript"}
          </p>
          <p className="mt-1 min-h-[2rem] text-sm text-slate-800">
            {transcript || (
              <span className="text-slate-400">Start speaking…</span>
            )}
          </p>
          {transcript && (
            <button
              type="button"
              onClick={handleInsert}
              className="mt-2 inline-flex items-center gap-1 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              Insert into description
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* Ambient type declarations for the Web Speech API. */
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
