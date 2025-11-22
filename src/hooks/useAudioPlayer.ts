/**
 * Audio Player Hook - Supports MP3 playback + TTS fallback
 * 
 * For prototype: uses Web Speech API (browser TTS) with Indian accent
 * For production: replace with pre-recorded MP3 files
 */

import { useState, useCallback, useRef, useEffect } from "react";

interface UseAudioPlayerReturn {
  isPlaying: boolean;
  play: (text: string, lang?: string) => Promise<void>;
  stop: () => void;
  playMP3: (url: string) => Promise<void>;
}

/**
 * Get the best Indian accent voice for the given language
 */
function getIndianVoice(lang: string): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();

  // For Hindi, prefer hi-IN voices
  if (lang === "hi-IN" || lang.startsWith("hi")) {
    // Try to find Hindi Indian voice
    const hindiVoice = voices.find(voice =>
      voice.lang === "hi-IN" || voice.lang.startsWith("hi")
    );
    if (hindiVoice) return hindiVoice;
  }

  // For Kannada
  if (lang === "kn-IN" || lang.startsWith("kn")) {
    const kannadaVoice = voices.find(voice =>
      voice.lang === "kn-IN" || voice.lang.startsWith("kn")
    );
    if (kannadaVoice) return kannadaVoice;
  }

  // For English, prefer Indian English (en-IN)
  if (lang === "en-US" || lang === "en-GB" || lang.startsWith("en")) {
    // Priority order: en-IN > en-GB > en-US
    const indianEnglish = voices.find(voice => voice.lang === "en-IN");
    if (indianEnglish) return indianEnglish;

    // Fallback to British English (closer to Indian accent than American)
    const britishEnglish = voices.find(voice => voice.lang === "en-GB");
    if (britishEnglish) return britishEnglish;

    // Last resort: any English voice
    const anyEnglish = voices.find(voice => voice.lang.startsWith("en"));
    if (anyEnglish) return anyEnglish;
  }

  return null;
}

export function useAudioPlayer(): UseAudioPlayerReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Load voices on mount
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true);
        console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`));
      }
    };

    // Chrome loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Try loading immediately
    loadVoices();
  }, []);

  /**
   * Play text using Web Speech API (TTS) with Indian accent
   * Use this for dynamic content (quiz questions, feedback)
   */
  const play = useCallback(async (text: string, lang: string = "hi-IN") => {
    // Stop any current playback
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setIsPlaying(true);

    return new Promise<void>((resolve, reject) => {
      if (!("speechSynthesis" in window)) {
        console.warn("Text-to-Speech not supported in this browser");
        setIsPlaying(false);
        reject(new Error("TTS not supported"));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);

      // Convert en-US to en-IN for Indian accent
      let targetLang = lang;
      if (lang === "en-US") {
        targetLang = "en-IN";
      }

      utterance.lang = targetLang;
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1.0;

      // Try to select an Indian accent voice
      const indianVoice = getIndianVoice(targetLang);
      if (indianVoice) {
        utterance.voice = indianVoice;
        console.log(`Using voice: ${indianVoice.name} (${indianVoice.lang})`);
      } else {
        console.log(`No Indian voice found for ${targetLang}, using default`);
      }

      utterance.onend = () => {
        setIsPlaying(false);
        utteranceRef.current = null;
        resolve();
      };

      utterance.onerror = (error) => {
        console.error("TTS error:", error);
        setIsPlaying(false);
        utteranceRef.current = null;
        reject(error);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    });
  }, []);

  /**
   * Play pre-recorded MP3 file
   * Use this for button labels ("Hindi", "English") when you have recordings
   */
  const playMP3 = useCallback(async (url: string) => {
    // Stop any current playback
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
      utteranceRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setIsPlaying(true);

    return new Promise<void>((resolve, reject) => {
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        audioRef.current = null;
        resolve();
      };

      audio.onerror = (error) => {
        console.error("MP3 playback error:", error);
        setIsPlaying(false);
        audioRef.current = null;
        reject(error);
      };

      audio.play().catch(reject);
    });
  }, []);

  /**
   * Stop all audio playback
   */
  const stop = useCallback(() => {
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
      utteranceRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  return {
    isPlaying,
    play,
    stop,
    playMP3,
  };
}

/**
 * Helper: Get language code for TTS with Indian accent
 */
export function getTTSLanguageCode(language: "hindi" | "english" | "kannada"): string {
  if (language === "hindi") return "hi-IN";
  if (language === "kannada") return "kn-IN";
  return "en-IN"; // Indian English accent
}
