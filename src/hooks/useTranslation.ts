import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const useTranslation = (text: string) => {
    const { translate, language } = useLanguage();
    const [translatedText, setTranslatedText] = useState(text);
    const [isTranslating, setIsTranslating] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const performTranslation = async () => {
            if (language === 'en') {
                setTranslatedText(text);
                return;
            }

            setIsTranslating(true);
            try {
                const result = await translate(text);
                if (isMounted) {
                    setTranslatedText(result);
                }
            } catch (error) {
                console.error('Translation error:', error);
                if (isMounted) {
                    setTranslatedText(text);
                }
            } finally {
                if (isMounted) {
                    setIsTranslating(false);
                }
            }
        };

        performTranslation();

        return () => {
            isMounted = false;
        };
    }, [text, language, translate]);

    return { text: translatedText, isTranslating };
};
