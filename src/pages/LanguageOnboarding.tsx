/**
 * LANGUAGE ONBOARDING SCREEN
 * 
 * First screen for non-readers:
 * - Text + Icon + Audio for each language
 * - Saves preference to localStorage
 * - Redirects to literacy assessment
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Volume2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

export default function LanguageOnboarding() {
  const navigate = useNavigate();
  const { setLanguage } = useLanguage();
  const { play, isPlaying } = useAudioPlayer();
  const [selectedLang, setSelectedLang] = useState<"hindi" | "kannada" | "english" | null>(null);

  const handleLanguageSelect = (lang: "hindi" | "kannada" | "english") => {
    setSelectedLang(lang);
  };

  const handleContinue = () => {
    if (selectedLang) {
      // Map hindi/kannada/english to hi/kn/en for context
      const langCode = selectedLang === "hindi" ? "hi" : selectedLang === "kannada" ? "kn" : "en";
      setLanguage(langCode);
      localStorage.setItem("selectedLanguage", selectedLang);
      
      // NEW FLOW: After language selection, go to class selection
      navigate("/class-selection");
    }
  };

  const playLanguageAudio = (lang: "hindi" | "kannada" | "english") => {
    if (isPlaying) return;
    
    const text = lang === "hindi" ? "हिंदी" : lang === "kannada" ? "ಕನ್ನಡ" : "English";
    const ttsLang = lang === "hindi" ? "hi-IN" : lang === "kannada" ? "kn-IN" : "en-US";
    play(text, ttsLang).catch(console.error);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 shadow-2xl border-2 border-blue-100">
        {/* Teacher Mascot */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-white p-1 overflow-hidden">
                <img
                  src="/teacher-mascot.jpg"
                  alt="AI Sathi Teacher"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Select Your Language
          </h1>
          <h2 className="text-lg font-bold text-gray-600">
            अपनी भाषा चुनें | ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ
          </h2>
        </div>

        <div className="space-y-4 mb-8">
          {/* Hindi Button */}
          <button
            onClick={() => handleLanguageSelect("hindi")}
            className={`w-full p-6 rounded-lg border-2 transition-all flex items-center justify-between ${
              selectedLang === "hindi"
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-300 hover:border-blue-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">🇮🇳</span>
              <span className="text-2xl font-bold">हिंदी</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                playLanguageAudio("hindi");
              }}
              disabled={isPlaying}
              className="hover:bg-blue-100"
            >
              <Volume2 className="h-6 w-6 text-blue-600" />
            </Button>
          </button>

          {/* Kannada Button */}
          <button
            onClick={() => handleLanguageSelect("kannada")}
            className={`w-full p-6 rounded-lg border-2 transition-all flex items-center justify-between ${
              selectedLang === "kannada"
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-300 hover:border-blue-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">🇮🇳</span>
              <span className="text-2xl font-bold">ಕನ್ನಡ</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                playLanguageAudio("kannada");
              }}
              disabled={isPlaying}
              className="hover:bg-blue-100"
            >
              <Volume2 className="h-6 w-6 text-blue-600" />
            </Button>
          </button>

          {/* English Button */}
          <button
            onClick={() => handleLanguageSelect("english")}
            className={`w-full p-6 rounded-lg border-2 transition-all flex items-center justify-between ${
              selectedLang === "english"
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-300 hover:border-blue-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">🇬🇧</span>
              <span className="text-2xl font-bold">English</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                playLanguageAudio("english");
              }}
              disabled={isPlaying}
              className="hover:bg-blue-100"
            >
              <Volume2 className="h-6 w-6 text-blue-600" />
            </Button>
          </button>
        </div>

        <Button
          onClick={handleContinue}
          disabled={!selectedLang}
          className="w-full py-6 text-xl"
          size="lg"
        >
          {selectedLang === "hindi" ? "जारी रखें" : selectedLang === "kannada" ? "ಮುಂದುವರಿಸಿ" : "Continue"}
        </Button>

        <p className="text-center text-sm text-gray-500 mt-4">
          {selectedLang === "hindi" 
            ? "🔊 किसी भी शब्द को सुनने के लिए स्पीकर आइकन दबाएं"
            : selectedLang === "kannada"
            ? "🔊 ಯಾವುದೇ ಪದವನ್ನು ಕೇಳಲು ಸ್ಪೀಕರ್ ಐಕಾನ್ ಟ್ಯಾಪ್ ಮಾಡಿ"
            : "🔊 Tap speaker icon to hear any word"}
        </p>
      </Card>
    </div>
  );
}
