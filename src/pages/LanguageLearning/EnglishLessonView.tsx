/**
 * ENGLISH ALPHABET LESSON VIEW
 * Interactive exercises for learning English letters
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Volume2, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import {
    getEnglishLessonById,
    getEnglishLetterById,
    type EnglishLesson,
    type EnglishExercise,
    type EnglishLetter,
} from '@/data/languageLearning/englishAlphabet';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import confetti from 'canvas-confetti';

export default function EnglishLessonView() {
    const { lessonId } = useParams<{ lessonId: string }>();
    const navigate = useNavigate();
    const { play, isPlaying } = useAudioPlayer();

    const [lesson, setLesson] = useState<EnglishLesson | null>(null);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [exerciseProgress, setExerciseProgress] = useState<Record<string, boolean>>({});
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        if (lessonId) {
            const foundLesson = getEnglishLessonById(lessonId);
            setLesson(foundLesson || null);
        }
    }, [lessonId]);

    if (!lesson) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Lesson not found</p>
            </div>
        );
    }

    const currentExercise = lesson.exercises[currentExerciseIndex];
    const progressPercentage = ((currentExerciseIndex + 1) / lesson.exercises.length) * 100;

    const playLetterSound = (letterId: string) => {
        const letter = getEnglishLetterById(letterId);
        if (letter) {
            // Play letter name and example word
            play(`${letter.letter}. ${letter.examples[0].word}`, 'en-IN').catch(console.error);
        }
    };

    const handleNext = () => {
        if (currentExerciseIndex < lesson.exercises.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
        } else {
            // Lesson complete!
            completeLesson();
        }
    };

    const completeLesson = () => {
        // Save to localStorage
        const saved = localStorage.getItem('englishCompletedLessons');
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes(lesson.id)) {
            completed.push(lesson.id);
            localStorage.setItem('englishCompletedLessons', JSON.stringify(completed));
        }

        // Celebrate!
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });

        // Show completion screen
        setTimeout(() => {
            navigate('/language-learning/english-course');
        }, 2000);
    };

    const handleAnswerSelect = (answer: string, correctAnswer: string) => {
        setSelectedAnswer(answer);
        setIsCorrect(answer === correctAnswer);
        setShowFeedback(true);

        if (answer === correctAnswer) {
            // Mark exercise as complete
            setExerciseProgress({
                ...exerciseProgress,
                [currentExercise.id]: true,
            });

            // Auto-advance after 1.5 seconds
            setTimeout(() => {
                handleNext();
            }, 1500);
        }
    };

    // Render different exercise types
    const renderExercise = () => {
        switch (currentExercise.type) {
            case 'introduction':
                return <IntroductionExercise exercise={currentExercise} onNext={handleNext} playSound={playLetterSound} />;

            case 'listen-repeat':
                return <ListenRepeatExercise exercise={currentExercise} onNext={handleNext} playSound={playLetterSound} />;

            case 'match':
                return (
                    <MatchExercise
                        exercise={currentExercise}
                        selectedAnswer={selectedAnswer}
                        showFeedback={showFeedback}
                        isCorrect={isCorrect}
                        onAnswerSelect={handleAnswerSelect}
                        onNext={handleNext}
                    />
                );

            case 'quiz':
                return (
                    <QuizExercise
                        exercise={currentExercise}
                        selectedAnswer={selectedAnswer}
                        showFeedback={showFeedback}
                        isCorrect={isCorrect}
                        onAnswerSelect={handleAnswerSelect}
                        playSound={playLetterSound}
                    />
                );

            default:
                return <div>Exercise type not implemented</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-12">
            {/* Header */}
            <div className="px-4 pt-4 flex items-center justify-between">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/language-learning/english-course')}
                    className="rounded-full"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 pt-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                        Exercise {currentExerciseIndex + 1} of {lesson.exercises.length}
                    </span>
                    <span className="text-sm text-muted-foreground">
                        {Math.round(progressPercentage)}%
                    </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
            </div>

            {/* Lesson Title */}
            <div className="px-6 pt-6 pb-4 text-center">
                <h1 className="text-2xl font-bold text-foreground mb-1">{lesson.title}</h1>
                <p className="text-lg text-blue-600">{lesson.titleHindi}</p>
            </div>

            {/* Exercise Content */}
            <div className="px-6">{renderExercise()}</div>
        </div>
    );
}

// ============================================
// INTRODUCTION EXERCISE
// ============================================

function IntroductionExercise({
    exercise,
    onNext,
    playSound,
}: {
    exercise: EnglishExercise;
    onNext: () => void;
    playSound: (letterId: string) => void;
}) {
    const letters = exercise.data.letters.map((id: string) => getEnglishLetterById(id)).filter(Boolean) as EnglishLetter[];

    return (
        <div className="space-y-6">
            <Card className="p-6 bg-blue-50 border-blue-200">
                <h2 className="text-xl font-bold text-foreground mb-2">{exercise.title}</h2>
                <p className="text-sm text-muted-foreground mb-1">{exercise.instructions}</p>
                <p className="text-sm text-blue-600">{exercise.instructionsHindi}</p>
            </Card>

            <div className="grid gap-4">
                {letters.map((letter) => (
                    <Card key={letter.id} className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                <span className="text-4xl text-white font-bold">{letter.letter}</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold text-foreground mb-1">{letter.letter}</h3>
                                <p className="text-lg text-blue-600 mb-1">{letter.pronunciation}</p>
                            </div>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => playSound(letter.id)}
                                className="rounded-full"
                            >
                                <Volume2 className="w-6 h-6" />
                            </Button>
                        </div>

                        {/* Examples */}
                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-foreground">Examples:</p>
                            {letter.examples.map((example, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                    <span className="text-2xl">{example.image}</span>
                                    <div>
                                        <p className="font-bold text-foreground">{example.word}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {example.hindi} / {example.kannada}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>

            <Button onClick={onNext} size="lg" className="w-full rounded-2xl h-14 bg-gradient-to-r from-blue-500 to-cyan-500">
                Continue →
            </Button>
        </div>
    );
}

// ============================================
// LISTEN & REPEAT EXERCISE
// ============================================

function ListenRepeatExercise({
    exercise,
    onNext,
    playSound,
}: {
    exercise: EnglishExercise;
    onNext: () => void;
    playSound: (letterId: string) => void;
}) {
    const letters = exercise.data.letters.map((id: string) => getEnglishLetterById(id)).filter(Boolean) as EnglishLetter[];

    return (
        <div className="space-y-6">
            <Card className="p-6 bg-green-50 border-green-200">
                <h2 className="text-xl font-bold text-foreground mb-2">{exercise.title}</h2>
                <p className="text-sm text-muted-foreground mb-1">{exercise.instructions}</p>
                <p className="text-sm text-blue-600">{exercise.instructionsHindi}</p>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                {letters.map((letter) => (
                    <Card
                        key={letter.id}
                        className="p-6 cursor-pointer hover:shadow-lg transition-all"
                        onClick={() => playSound(letter.id)}
                    >
                        <div className="text-center space-y-3">
                            <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                <span className="text-5xl text-white font-bold">{letter.letter}</span>
                            </div>
                            <p className="text-lg font-bold text-blue-600">{letter.pronunciation}</p>
                            <Button size="sm" variant="outline" className="w-full rounded-full">
                                <Volume2 className="w-4 h-4 mr-2" />
                                Listen
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            <Button onClick={onNext} size="lg" className="w-full rounded-2xl h-14 bg-gradient-to-r from-blue-500 to-cyan-500">
                I've Practiced! →
            </Button>
        </div>
    );
}

// ============================================
// MATCH EXERCISE
// ============================================

function MatchExercise({
    exercise,
    selectedAnswer,
    showFeedback,
    isCorrect,
    onAnswerSelect,
    onNext,
}: {
    exercise: EnglishExercise;
    selectedAnswer: string | null;
    showFeedback: boolean;
    isCorrect: boolean;
    onAnswerSelect: (answer: string, correct: string) => void;
    onNext: () => void;
}) {
    const [currentPairIndex, setCurrentPairIndex] = useState(0);
    const pairs = exercise.data.pairs;
    const currentPair = pairs[currentPairIndex];
    const letter = getEnglishLetterById(currentPair.letter);

    if (!letter) return null;

    // Create options (correct + 2 random)
    const allImages = pairs.map((p: any) => p.image);
    const options = [currentPair.image];
    const otherImages = allImages.filter((img: string) => img !== currentPair.image);
    while (options.length < 3 && otherImages.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherImages.length);
        options.push(otherImages[randomIndex]);
        otherImages.splice(randomIndex, 1);
    }
    // Shuffle
    options.sort(() => Math.random() - 0.5);

    const handleSelect = (image: string) => {
        onAnswerSelect(image, currentPair.image);
        if (image === currentPair.image && currentPairIndex < pairs.length - 1) {
            setTimeout(() => {
                setCurrentPairIndex(currentPairIndex + 1);
            }, 1500);
        }
    };

    return (
        <div className="space-y-6">
            <Card className="p-6 bg-yellow-50 border-yellow-200">
                <h2 className="text-xl font-bold text-foreground mb-2">{exercise.title}</h2>
                <p className="text-sm text-muted-foreground mb-1">{exercise.instructions}</p>
                <p className="text-sm text-blue-600">{exercise.instructionsHindi}</p>
            </Card>

            {/* Letter to match */}
            <Card className="p-8">
                <div className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground">Match this letter:</p>
                    <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-6xl text-white font-bold">{letter.letter}</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{letter.pronunciation}</p>
                </div>
            </Card>

            {/* Options */}
            <div className="grid grid-cols-3 gap-4">
                {options.map((image, idx) => (
                    <Card
                        key={idx}
                        className={`p-6 cursor-pointer transition-all ${selectedAnswer === image
                            ? isCorrect
                                ? 'bg-green-100 border-green-500 border-2'
                                : 'bg-red-100 border-red-500 border-2'
                            : 'hover:shadow-lg hover:scale-105'
                            }`}
                        onClick={() => !showFeedback && handleSelect(image)}
                    >
                        <div className="text-center">
                            <div className="text-6xl mb-2">{image}</div>
                            {selectedAnswer === image && showFeedback && (
                                <div className="mt-2">
                                    {isCorrect ? (
                                        <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto" />
                                    ) : (
                                        <XCircle className="w-6 h-6 text-red-600 mx-auto" />
                                    )}
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>

            {showFeedback && isCorrect && currentPairIndex === pairs.length - 1 && (
                <Button onClick={onNext} size="lg" className="w-full rounded-2xl h-14 bg-gradient-to-r from-green-500 to-emerald-500">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Continue
                </Button>
            )}
        </div>
    );
}

// ============================================
// QUIZ EXERCISE
// ============================================

function QuizExercise({
    exercise,
    selectedAnswer,
    showFeedback,
    isCorrect,
    onAnswerSelect,
    playSound,
}: {
    exercise: EnglishExercise;
    selectedAnswer: string | null;
    showFeedback: boolean;
    isCorrect: boolean;
    onAnswerSelect: (answer: string, correct: string) => void;
    playSound: (letterId: string) => void;
}) {
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const letters = exercise.data.letters;
    const currentLetterId = letters[currentLetterIndex];
    const currentLetter = getEnglishLetterById(currentLetterId);

    if (!currentLetter) return null;

    // Create options
    const options = [currentLetterId];
    const otherLetters = letters.filter((id: string) => id !== currentLetterId);
    while (options.length < 3 && otherLetters.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherLetters.length);
        options.push(otherLetters[randomIndex]);
        otherLetters.splice(randomIndex, 1);
    }
    options.sort(() => Math.random() - 0.5);

    const handleSelect = (letterId: string) => {
        onAnswerSelect(letterId, currentLetterId);
        if (letterId === currentLetterId && currentLetterIndex < letters.length - 1) {
            setTimeout(() => {
                setCurrentLetterIndex(currentLetterIndex + 1);
            }, 1500);
        }
    };

    return (
        <div className="space-y-6">
            <Card className="p-6 bg-orange-50 border-orange-200">
                <h2 className="text-xl font-bold text-foreground mb-2">{exercise.title}</h2>
                <p className="text-sm text-muted-foreground mb-1">{exercise.instructions}</p>
                <p className="text-sm text-blue-600">{exercise.instructionsHindi}</p>
            </Card>

            {/* Play sound */}
            <Card className="p-8">
                <div className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground">Listen to the sound:</p>
                    <Button
                        size="lg"
                        onClick={() => playSound(currentLetterId)}
                        className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    >
                        <Volume2 className="w-6 h-6 mr-2" />
                        Play Sound
                    </Button>
                    <p className="text-sm text-muted-foreground">Then tap the correct letter below</p>
                </div>
            </Card>

            {/* Options */}
            <div className="grid grid-cols-3 gap-4">
                {options.map((letterId) => {
                    const letter = getEnglishLetterById(letterId);
                    if (!letter) return null;

                    return (
                        <Card
                            key={letterId}
                            className={`p-6 cursor-pointer transition-all ${selectedAnswer === letterId
                                ? isCorrect
                                    ? 'bg-green-100 border-green-500 border-2'
                                    : 'bg-red-100 border-red-500 border-2'
                                : 'hover:shadow-lg hover:scale-105'
                                }`}
                            onClick={() => !showFeedback && handleSelect(letterId)}
                        >
                            <div className="text-center">
                                <div className="text-5xl font-bold mb-2">{letter.letter}</div>
                                <p className="text-sm text-blue-600">{letter.pronunciation}</p>
                                {selectedAnswer === letterId && showFeedback && (
                                    <div className="mt-2">
                                        {isCorrect ? (
                                            <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto" />
                                        ) : (
                                            <XCircle className="w-6 h-6 text-red-600 mx-auto" />
                                        )}
                                    </div>
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
