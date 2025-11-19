import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import LanguageSelector from "@/components/LanguageSelector";
import { useTranslation } from "@/hooks/useTranslation";

const ClassSelection = () => {
    const navigate = useNavigate();
    const title = useTranslation("AI Sathi");
    const subtitle = useTranslation("Your personal AI tutor that works without internet. Learn anytime, anywhere!");
    const worksOffline = useTranslation("Works Offline");
    const ncertAligned = useTranslation("NCERT Aligned");
    const freeForever = useTranslation("Free Forever");
    const chooseClass = useTranslation("Choose Your Class");
    const selectGrade = useTranslation("Select your grade to start learning");
    const comingSoon = useTranslation("Coming Soon");
    const startClass5 = useTranslation("Start with Class 5");
    const infoText = useTranslation("Learn Maths, Language, and more with AI-powered explanations in simple language. More classes coming soon!");
    const footer = useTranslation("Powered by AI • Designed for Indian Students • Made with ❤️");
    const classLabel = useTranslation("Class");

    const classes = [
        { number: 5, available: true },
        { number: 6, available: false },
        { number: 7, available: false },
        { number: 8, available: false },
        { number: 9, available: false },
        { number: 10, available: false },
    ];

    const handleClassClick = (classNumber: number, available: boolean) => {
        if (available) {
            navigate("/subjects");
        } else {
            toast.info(`Class ${classNumber} coming soon! Start with Class 5 for now.`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
            {/* Language Selector - Top Right */}
            <div className="absolute top-4 right-4 z-10">
                <LanguageSelector />
            </div>

            {/* Hero Section */}
            <div className="px-6 pt-16 pb-12 text-center space-y-6">
                <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center shadow-[var(--shadow-medium)] animate-in fade-in zoom-in duration-500 overflow-hidden border-2 border-primary/20">
                    <img
                        src="/teacher-mascot.jpg"
                        alt="AI Sathi Teacher"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                    <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {title.text}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                        {subtitle.text}
                    </p>
                </div>

                {/* Feature Badges */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-success bg-success/10 px-3 py-1.5 rounded-full border border-success/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                        {worksOffline.text}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                        <GraduationCap className="w-3 h-3" />
                        {ncertAligned.text}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-accent bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20">
                        ✨ {freeForever.text}
                    </div>
                </div>
            </div>

            {/* Class Selection */}
            <div className="px-6 pb-12 space-y-6">
                <div className="text-center space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                    <h2 className="text-2xl font-bold text-foreground">{chooseClass.text}</h2>
                    <p className="text-sm text-muted-foreground">
                        {selectGrade.text}
                    </p>
                </div>

                {/* Class Grid */}
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
                    {classes.map((classItem, index) => (
                        <Button
                            key={classItem.number}
                            onClick={() => handleClassClick(classItem.number, classItem.available)}
                            disabled={!classItem.available}
                            className={`
                relative h-32 rounded-2xl text-lg font-semibold transition-all duration-300
                ${classItem.available
                                    ? 'bg-gradient-to-br from-primary to-secondary hover:shadow-xl hover:scale-105 text-white border-0'
                                    : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-border/50'
                                }
                animate-in fade-in zoom-in duration-500
              `}
                            style={{ animationDelay: `${800 + index * 100}ms` }}
                        >
                            <div className="flex flex-col items-center justify-center gap-2">
                                <span className="text-3xl font-bold">
                                    {classItem.number}
                                </span>
                                <span className="text-sm font-medium opacity-90">
                                    {classLabel.text} {classItem.number}
                                </span>
                                {classItem.available && (
                                    <div className="absolute top-2 right-2">
                                        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                                    </div>
                                )}
                                {!classItem.available && (
                                    <span className="absolute bottom-2 text-xs opacity-60">
                                        {comingSoon.text}
                                    </span>
                                )}
                            </div>
                        </Button>
                    ))}
                </div>

                {/* Info Card */}
                <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl border border-primary/20 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000">
                    <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-primary/20">
                            <img
                                src="/teacher-mascot.jpg"
                                alt="AI Sathi Teacher"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-semibold text-foreground">{startClass5.text}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {infoText.text}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-8 text-center animate-in fade-in duration-700 delay-1200">
                <p className="text-xs text-muted-foreground">
                    {footer.text}
                </p>
            </div>
        </div>
    );
};

export default ClassSelection;
