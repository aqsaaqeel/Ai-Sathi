/**
 * Audio Player Hook - Supports MP3 playback + TTS fallback
 * 
 * For prototype: uses Web Speech API (browser TTS)
 * For production: replace with pre-recorded MP3 files
 */

import { useState, useCallback, useRef } from "react";

interface UseAudioPlayerReturn {
  isPlaying: boolean;
  play: (text: string, lang?: string) => Promise<void>;
  stop: () => void;
  playMP3: (url: string) => Promise<void>;
}

export function useAudioPlayer(): UseAudioPlayerReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /**
   * Play text using Web Speech API (TTS)
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
      utterance.lang = lang; // "hi-IN" for Hindi, "en-US" for English
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1.0;

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
 * Helper: Get language code for TTS
 */
export function getTTSLanguageCode(language: "hindi" | "english"): string {
  return language === "hindi" ? "hi-IN" : "en-US";
}
