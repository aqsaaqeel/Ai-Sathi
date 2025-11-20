/**
 * LITERACY ASSESSMENT SCREEN
 * 
 * 1-minute diagnostic test:
 * - Hindi: letter recognition (क, म, अ) + sound matching
 * - English: letter recognition (A, B, C) + word-picture matching
 * - Audio-first UI for non-readers
 * - Scores 0-100 for each language
 * - Automatic placement recommendation
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Volume2, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { scoreLiteracyAssessment, type AssessmentResult } from "@/services/geminiService";
import { toast } from "sonner";

type AssessmentStep = "hindi-letters" | "hindi-sounds" | "english-letters" | "english-words" | "results";

export default function LiteracyAssessment() {
  const navigate = useNavigate();
  const { play, isPlaying } = useAudioPlayer();
  const { setLiteracyState } = useLanguage();
  
  const [step, setStep] = useState<AssessmentStep>("hindi-letters");
  const [hindiAnswers, setHindiAnswers] = useState<Record<string, string>>({});
  const [englishAnswers, setEnglishAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  // Hindi Questions
  const hindiLetterQuestions = [
    { id: "h1", question: "कौन सा अक्षर 'क' है?", audio: "कौन सा अक्षर 'क' है?", options: ["क", "म", "अ", "ब"], correct: "क" },
    { id: "h2", question: "कौन सा अक्षर 'म' है?", audio: "कौन सा अक्षर 'म' है?", options: ["क", "म", "अ", "ब"], correct: "म" },
    { id: "h3", question: "कौन सा अक्षर 'अ' है?", audio: "कौन सा अक्षर 'अ' है?", options: ["क", "म", "अ", "ब"], correct: "अ" },
  ];

  const hindiSoundQuestions = [
    { id: "h4", question: "'क' की आवाज़ सुनें", audio: "क", options: ["क", "ख", "ग", "घ"], correct: "क" },
    { id: "h5", question: "'म' की आवाज़ सुनें", audio: "म", options: ["म", "न", "ल", "र"], correct: "म" },
  ];

  // English Questions
  const englishLetterQuestions = [
    { id: "e1", question: "Which letter is 'A'?", audio: "Which letter is A?", options: ["A", "B", "C", "D"], correct: "A" },
    { id: "e2", question: "Which letter is 'B'?", audio: "Which letter is B?", options: ["A", "B", "C", "D"], correct: "B" },
    { id: "e3", question: "Which letter is 'C'?", audio: "Which letter is C?", options: ["A", "B", "C", "D"], correct: "C" },
  ];

  const englishWordQuestions = [
    { id: "e4", question: "What is this? 🐱", audio: "What is this?", options: ["Cat", "Dog", "Bird", "Fish"], correct: "Cat" },
    { id: "e5", question: "What is this? 🌳", audio: "What is this?", options: ["Tree", "Flower", "Grass", "Bush"], correct: "Tree" },
  ];

  const getCurrentQuestions = () => {
    switch (step) {
      case "hindi-letters":
        return hindiLetterQuestions;
      case "hindi-sounds":
        return hindiSoundQuestions;
      case "english-letters":
        return englishLetterQuestions;
      case "english-words":
        return englishWordQuestions;
      default:
        return [];
    }
  };

  const getCurrentAnswers = () => {
    return step.startsWith("hindi") ? hindiAnswers : englishAnswers;
  };

  const setCurrentAnswer = (questionId: string, answer: string) => {
    if (step.startsWith("hindi")) {
      setHindiAnswers({ ...hindiAnswers, [questionId]: answer });
    } else {
      setEnglishAnswers({ ...englishAnswers, [questionId]: answer });
    }
  };

  const playQuestionAudio = (text: string, isHindi: boolean) => {
    const lang = isHindi ? "hi-IN" : "en-US";
    play(text, lang).catch(console.error);
  };

  const handleNext = async () => {
    if (step === "hindi-letters") {
      setStep("hindi-sounds");
    } else if (step === "hindi-sounds") {
      setStep("english-letters");
    } else if (step === "english-letters") {
      setStep("english-words");
    } else if (step === "english-words") {
      // Calculate results
      setLoading(true);
      try {
        const assessmentResult = await scoreLiteracyAssessment(hindiAnswers, englishAnswers);
        setResult(assessmentResult);
        
        // Save to context and localStorage
        const literacyState = {
          completedAssessment: true,
          hindiScore: assessmentResult.hindiScore,
          englishScore: assessmentResult.englishScore,
          placement: assessmentResult.placement,
        };
        setLiteracyState(literacyState);
        localStorage.setItem('completedAssessment', 'true');
        localStorage.setItem('hindiScore', assessmentResult.hindiScore.toString());
        localStorage.setItem('englishScore', assessmentResult.englishScore.toString());
        localStorage.setItem('placement', assessmentResult.placement);
        
        setStep("results");
      } catch (error) {
        console.error("Assessment scoring failed:", error);
        toast.error("Assessment failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleContinue = () => {
    if (!result) return;
    
    if (result.placement === "skip-to-subjects") {
      navigate("/subjects");
    } else {
      // Go to appropriate quiz/literacy course
      navigate("/quiz", { state: { placement: result.placement } });
    }
  };

  const getProgress = () => {
    const steps = ["hindi-letters", "hindi-sounds", "english-letters", "english-words"];
    const currentIndex = steps.indexOf(step);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  if (step === "results" && result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 shadow-lg">
          <div className="text-center mb-6">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Assessment Complete!</h1>
            <p className="text-gray-600">मूल्यांकन पूर्ण!</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Hindi Score:</span>
                <span className="text-2xl font-bold text-blue-600">{result.hindiScore}%</span>
              </div>
              <Progress value={result.hindiScore} className="h-2" />
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">English Score:</span>
                <span className="text-2xl font-bold text-purple-600">{result.englishScore}%</span>
              </div>
              <Progress value={result.englishScore} className="h-2" />
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">📚 Recommendation:</h3>
            <p className="text-sm">{result.recommendations}</p>
          </div>

          <Button onClick={handleContinue} className="w-full py-6 text-xl" size="lg">
            {result.placement === "skip-to-subjects" ? "Start Learning 🚀" : "Start Literacy Course 📖"}
          </Button>
        </Card>
      </div>
    );
  }

  const questions = getCurrentQuestions();
  const answers = getCurrentAnswers();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4">
      <div className="max-w-2xl mx-auto py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold">Assessment Progress</span>
            <span>{Math.round(getProgress())}%</span>
          </div>
          <Progress value={getProgress()} className="h-3" />
        </div>

        <Card className="p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {step.startsWith("hindi") ? "Hindi Assessment" : "English Assessment"}
          </h2>

          {questions.map((q, index) => {
            const isAnswered = !!answers[q.id];
            return (
              <div key={q.id} className="mb-8 pb-8 border-b last:border-b-0">
                <div className="flex items-start justify-between mb-4">
                  <p className="text-lg font-semibold flex-1">
                    {index + 1}. {q.question}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => playQuestionAudio(q.audio, step.startsWith("hindi"))}
                    disabled={isPlaying}
                  >
                    <Volume2 className="h-5 w-5 text-blue-600" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {q.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => setCurrentAnswer(q.id, option)}
                      className={`p-4 text-xl font-bold rounded-lg border-2 transition-all ${
                        answers[q.id] === option
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-300 hover:border-blue-300 hover:bg-gray-50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          <Button
            onClick={handleNext}
            disabled={Object.keys(answers).length < questions.length || loading}
            className="w-full py-6 text-xl mt-4"
            size="lg"
          >
            {loading ? "Calculating..." : "Next →"}
          </Button>
        </Card>
      </div>
    </div>
  );
}
