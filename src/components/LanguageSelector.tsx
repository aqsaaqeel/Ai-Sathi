import { Languages } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useLanguage, Language } from "@/contexts/LanguageContext";

const LanguageSelector = () => {
    const { language, setLanguage } = useLanguage();

    const languages = [
        { code: 'en' as Language, name: 'English', nativeName: 'English' },
        { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिन्दी' },
        { code: 'kn' as Language, name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    ];

    return (
        <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
            <SelectTrigger className="w-[140px] rounded-full border-border/50 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all">
                <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-muted-foreground" />
                    <SelectValue />
                </div>
            </SelectTrigger>
            <SelectContent>
                {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">{lang.nativeName}</span>
                            <span className="text-xs text-muted-foreground">({lang.name})</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default LanguageSelector;
