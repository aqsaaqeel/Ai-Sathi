import { useState, useCallback, useEffect } from 'react';

interface UseTextToSpeechReturn {
    isSpeaking: boolean;
    speak: (text: string, languageCode?: string) => void;
    stop: () => void;
    isSupported: boolean;
}

const getLanguageCode = (lang: string): string => {
    const languageCodes: Record<string, string> = {
        en: 'en-US',
        hi: 'hi-IN',
        kn: 'kn-IN',
    };
    return languageCodes[lang] || 'en-US';
};

export const useTextToSpeech = (language: string): UseTextToSpeechReturn => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        // Check if speech synthesis is supported
        setIsSupported('speechSynthesis' in window);
    }, []);

    const speak = useCallback((text: string, languageCode?: string) => {
        if (!isSupported || !text) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Determine the language to use
        // If languageCode is provided, use it directly. Otherwise, derive from hook's language prop.
        const targetLang = languageCode || getLanguageCode(language);

        // --- 1. SET THE LANGUAGE CODE ---
        utterance.lang = targetLang;

        // Set voice properties
        utterance.rate = 0.95; // Slightly slower for better comprehension
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // --- 2. SELECT THE SPECIFIC VOICE ---
        const voices = window.speechSynthesis.getVoices();

        // Find the most appropriate native voice for the requested language code
        // We prioritize a voice that starts with the target language code (e.g. 'hi-IN')
        const matchingVoice = voices.find(voice =>
            voice.lang.toLowerCase().startsWith(targetLang.toLowerCase())
        );

        if (matchingVoice) {
            utterance.voice = matchingVoice;
        } else {
            console.warn(`TTS: Native voice for ${targetLang} not found. Falling back.`);
        }

        // Event handlers
        utterance.onstart = () => {
            setIsSpeaking(true);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
        };

        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            setIsSpeaking(false);
        };

        // Speak the text
        window.speechSynthesis.speak(utterance);
    }, [language, isSupported]);

    const stop = useCallback(() => {
        if (isSupported) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }, [isSupported]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (isSupported) {
                window.speechSynthesis.cancel();
            }
        };
    }, [isSupported]);

    return {
        isSpeaking,
        speak,
        stop,
        isSupported,
    };
};
