import { useState, useCallback, useEffect } from 'react';

interface UseTextToSpeechReturn {
    isSpeaking: boolean;
    speak: (text: string) => void;
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

    const speak = useCallback((text: string) => {
        if (!isSupported || !text) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Set language based on selected language
        utterance.lang = getLanguageCode(language);

        // Set voice properties
        utterance.rate = 0.9; // Slightly slower for better comprehension
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Try to find a voice that matches the language
        const voices = window.speechSynthesis.getVoices();
        const matchingVoice = voices.find(voice =>
            voice.lang.startsWith(language === 'en' ? 'en' : language === 'hi' ? 'hi' : 'kn')
        );

        if (matchingVoice) {
            utterance.voice = matchingVoice;
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
