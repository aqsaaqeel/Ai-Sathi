import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'kn';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    translate: (text: string, targetLang?: Language) => Promise<string>;
    aiPipeline: any;
    setAiPipeline: (pipeline: any) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');
    const [aiPipeline, setAiPipeline] = useState<any>(null);

    const translate = async (text: string, targetLang?: Language): Promise<string> => {
        const lang = targetLang || language;

        // If the target language is English or no translation needed, return as is
        if (lang === 'en' || !text) {
            return text;
        }

        // Use AI pipeline for translation if available
        if (aiPipeline) {
            try {
                const languageNames = {
                    hi: 'Hindi',
                    kn: 'Kannada',
                    en: 'English'
                };

                const prompt = `Translate the following text to ${languageNames[lang]}. Only provide the translation, nothing else.\n\nText: ${text}\n\nTranslation:`;

                const result = await aiPipeline(prompt, {
                    max_new_tokens: 200,
                    temperature: 0.3,
                    do_sample: true,
                });

                const translation = (result as any)[0]?.generated_text || text;

                // Extract just the translation part (after "Translation:")
                const translationMatch = translation.match(/Translation:\s*(.+)/s);
                if (translationMatch) {
                    return translationMatch[1].trim();
                }

                return translation.trim();
            } catch (error) {
                console.error('Translation error:', error);
                return text; // Fallback to original text
            }
        }

        // Fallback: Basic static translations for common phrases
        const staticTranslations: Record<Language, Record<string, string>> = {
            hi: {
                'Choose Your Class': 'अपनी कक्षा चुनें',
                'Select your grade to start learning': 'सीखना शुरू करने के लिए अपनी कक्षा चुनें',
                'Choose a Subject': 'विषय चुनें',
                'Back': 'वापस',
                'Coming Soon': 'जल्द आ रहा है',
                'Class': 'कक्षा',
                'Start with Class 5': 'कक्षा 5 से शुरू करें',
                'Learn Maths, Language, and more with AI-powered explanations in simple language. More classes coming soon!': 'सरल भाषा में AI-संचालित स्पष्टीकरण के साथ गणित, भाषा और अधिक सीखें। अधिक कक्षाएं जल्द आ रही हैं!',
                'Your personal AI tutor that works without internet. Learn anytime, anywhere!': 'आपका व्यक्तिगत AI शिक्षक जो इंटरनेट के बिना काम करता है। कभी भी, कहीं भी सीखें!',
                'AI Sathi': 'AI साथी',
                'Works Offline': 'ऑफ़लाइन काम करता है',
                'NCERT Aligned': 'NCERT के अनुसार',
                'Free Forever': 'हमेशा मुफ़्त',
                'Powered by AI • Designed for Indian Students • Made with ❤️': 'AI द्वारा संचालित • भारतीय छात्रों के लिए डिज़ाइन किया गया • ❤️ के साथ बनाया गया',
                'Hello! I\'m your AI tutor. Ask me anything about your lesson or share your doubts!': 'नमस्ते! मैं आपका AI शिक्षक हूं। अपने पाठ के बारे में कुछ भी पूछें!',
                'Type your question...': 'अपना प्रश्न लिखें...',
            },
            kn: {
                'Choose Your Class': 'ನಿಮ್ಮ ತರಗತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
                'Select your grade to start learning': 'ಕಲಿಕೆಯನ್ನು ಪ್ರಾರಂಭಿಸಲು ನಿಮ್ಮ ತರಗತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
                'Choose a Subject': 'ವಿಷಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
                'Back': 'ಹಿಂದೆ',
                'Coming Soon': 'ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ',
                'Class': 'ತರಗತಿ',
                'Start with Class 5': 'ತರಗತಿ 5 ರಿಂದ ಪ್ರಾರಂಭಿಸಿ',
                'Learn Maths, Language, and more with AI-powered explanations in simple language. More classes coming soon!': 'ಸರಳ ಭಾಷೆಯಲ್ಲಿ AI-ಚಾಲಿತ ವಿವರಣೆಗಳೊಂದಿಗೆ ಗಣಿತ, ಭಾಷೆ ಮತ್ತು ಹೆಚ್ಚಿನದನ್ನು ಕಲಿಯಿರಿ. ಹೆಚ್ಚಿನ ತರಗತಿಗಳು ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿವೆ!',
                'Your personal AI tutor that works without internet. Learn anytime, anywhere!': 'ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದೆ ಕೆಲಸ ಮಾಡುವ ನಿಮ್ಮ ವೈಯಕ್ತಿಕ AI ಶಿಕ್ಷಕ. ಯಾವಾಗ ಬೇಕಾದರೂ, ಎಲ್ಲಿಯಾದರೂ ಕಲಿಯಿರಿ!',
                'AI Sathi': 'AI ಸಾಥಿ',
                'Works Offline': 'ಆಫ್‌ಲೈನ್ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
                'NCERT Aligned': 'NCERT ಪ್ರಕಾರ',
                'Free Forever': 'ಶಾಶ್ವತವಾಗಿ ಉಚಿತ',
                'Powered by AI • Designed for Indian Students • Made with ❤️': 'AI ನಿಂದ ನಡೆಸಲ್ಪಡುತ್ತದೆ • ಭಾರತೀಯ ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ • ❤️ ನೊಂದಿಗೆ ತಯಾರಿಸಲಾಗಿದೆ',
                'Hello! I\'m your AI tutor. Ask me anything about your lesson or share your doubts!': 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಶಿಕ್ಷಕ. ನಿಮ್ಮ ಪಾಠದ ಬಗ್ಗೆ ಏನನ್ನು ಬೇಕಾದರೂ ಕೇಳಿ!',
                'Type your question...': 'ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಬರೆಯಿರಿ...',
            },
            en: {},
        };

        return staticTranslations[lang][text] || text;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, translate, aiPipeline, setAiPipeline }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
