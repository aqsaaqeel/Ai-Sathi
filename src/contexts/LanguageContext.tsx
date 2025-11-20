import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'kn';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    translate: (text: string, targetLang?: Language) => Promise<string>;
    t: (text: string) => string;
    aiPipeline: any;
    setAiPipeline: (pipeline: any) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Static translations moved to component scope for access by both translate and t
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
        'Maths Chapters': 'गणित के अध्याय',
        'Numbers and Operations': 'संख्याएं और संक्रियाएं',
        'Learn about numbers, addition, and subtraction': 'संख्याओं, जोड़ और घटाव के बारे में जानें',
        'Shapes and Patterns': 'आकृतियां और पैटर्न',
        'Identify shapes and create patterns': 'आकृतियों को पहचानें और पैटर्न बनाएं',
        'Measurement': 'मापन',
        'Learn about length, weight, and capacity': 'लंबाई, वजन और क्षमता के बारे में जानें',
        'Time and Money': 'समय और पैसा',
        'Tell time and understand money': 'समय बताएं और पैसे को समझें',
        'Science Chapters': 'विज्ञान के अध्याय',
        'The Human Body': 'मानव शरीर',
        'Learn about body parts and their functions': 'शरीर के अंगों और उनके कार्यों के बारे में जानें',
        'Plants Around Us': 'हमारे चारों ओर के पौधे',
        'Understand plant parts and their importance': 'पौधों के अंगों और उनके महत्व को समझें',
        'Animal Life': 'जीव जंतु',
        'Discover different animals and their habitats': 'विभिन्न जानवरों और उनके आवासों की खोज करें',
        'Weather and Climate': 'मौसम और जलवायु',
        'Explore weather patterns and seasons': 'मौसम के पैटर्न और ऋतुओं का पता लगाएं',
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
        'Maths Chapters': 'ಗಣಿತ ಅಧ್ಯಾಯಗಳು',
        'Numbers and Operations': 'ಸಂಖ್ಯೆಗಳು ಮತ್ತು ಕಾರ್ಯಾಚರಣೆಗಳು',
        'Learn about numbers, addition, and subtraction': 'ಸಂಖ್ಯೆಗಳು, ಸಂಕಲನ ಮತ್ತು ವ್ಯವಕಲನದ ಬಗ್ಗೆ ಕಲಿಯಿರಿ',
        'Shapes and Patterns': 'ಆಕಾರಗಳು ಮತ್ತು ಮಾದರಿಗಳು',
        'Identify shapes and create patterns': 'ಆಕಾರಗಳನ್ನು ಗುರುತಿಸಿ ಮತ್ತು ಮಾದರಿಗಳನ್ನು ರಚಿಸಿ',
        'Measurement': 'ಅಳತೆ',
        'Learn about length, weight, and capacity': 'ಉದ್ದ, ತೂಕ ಮತ್ತು ಸಾಮರ್ಥ್ಯದ ಬಗ್ಗೆ ಕಲಿಯಿರಿ',
        'Time and Money': 'ಸಮಯ ಮತ್ತು ಹಣ',
        'Tell time and understand money': 'ಸಮಯ ಹೇಳಿ ಮತ್ತು ಹಣವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ',
        'Science Chapters': 'ವಿಜ್ಞಾನ ಅಧ್ಯಾಯಗಳು',
        'The Human Body': 'ಮಾನವ ದೇಹ',
        'Learn about body parts and their functions': 'ದೇಹದ ಭಾಗಗಳು ಮತ್ತು ಅವುಗಳ ಕಾರ್ಯಗಳ ಬಗ್ಗೆ ಕಲಿಯಿರಿ',
        'Plants Around Us': 'ನಮ್ಮ ಸುತ್ತಲಿನ ಸಸ್ಯಗಳು',
        'Understand plant parts and their importance': 'ಸಸ್ಯದ ಭಾಗಗಳು ಮತ್ತು ಅವುಗಳ ಮಹತ್ವವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ',
        'Animal Life': 'ಪ್ರಾಣಿ ಜೀವನ',
        'Discover different animals and their habitats': 'ವಿವಿಧ ಪ್ರಾಣಿಗಳು ಮತ್ತು ಅವುಗಳ ಆವಾಸಸ್ಥಾನಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
        'Weather and Climate': 'ಹವಾಮಾನ ಮತ್ತು ವಾಯುಗುಣ',
        'Explore weather patterns and seasons': 'ಹವಾಮಾನ ಮಾದರಿಗಳು ಮತ್ತು ಋತುಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    },
    en: {},
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');
    const [aiPipeline, setAiPipeline] = useState<any>(null);

    const t = (text: string): string => {
        if (language === 'en') return text;
        return staticTranslations[language]?.[text] || text;
    };

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

                const prompt = `Translate the following text to ${languageNames[lang]}. Only provide the translation, nothing else.`;

                const messages = [
                    { role: "system", content: prompt },
                    { role: "user", content: text }
                ];

                const result = await aiPipeline.chat.completions.create({
                    messages,
                    max_tokens: 200,
                    temperature: 0.3,
                });

                const translation = result.choices[0].message.content || text;

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

        return staticTranslations[lang][text] || text;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, translate, t, aiPipeline, setAiPipeline }}>
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
