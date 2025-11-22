/**
 * ENGLISH COURSE - Alphabet and basic words
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Lock, CheckCircle2, Play } from 'lucide-react';
import { englishLessons, type EnglishLesson } from '@/data/languageLearning/englishCourse';

export default function EnglishCourse() {
    const navigate = useNavigate();
    const [lessons, setLessons] = useState<EnglishLesson[]>(englishLessons);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);

    useEffect(() => {
        const completed = JSON.parse(localStorage.getItem('englishCompletedLessons') || '[]');
        setCompletedLessons(completed);

        const demoMode = localStorage.getItem('demoMode') === 'true';
        if (demoMode) {
            setLessons(lessons.map(l => ({ ...l, unlocked: true })));
        } else {
            const updatedLessons = lessons.map((lesson, index) => {
                if (index === 0) return { ...lesson, unlocked: true };
                const previousCompleted = completed.includes(lessons[index - 1].id);
                return { ...lesson, unlocked: previousCompleted };
            });
            setLessons(updatedLessons);
        }
    }, []);

    const getProgress = () => {
        return (completedLessons.length / lessons.length) * 100;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Header */}
            <div className="px-4 pt-4 flex items-center justify-between">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/language-learning')}
                    className="rounded-full"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
            </div>

            {/* Hero */}
            <div className="px-6 pt-8 pb-6 text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <span className="text-4xl">🇬🇧</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground">English Course</h1>
                <p className="text-muted-foreground">अंग्रेज़ी कोर्स</p>

                {/* Progress */}
                <div className="max-w-md mx-auto">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold">Progress</span>
                        <span>{completedLessons.length} / {lessons.length} lessons</span>
                    </div>
                    <Progress value={getProgress()} className="h-3" />
                </div>
            </div>

            {/* Lessons List */}
            <div className="px-6 pb-12 space-y-4">
                {lessons.map((lesson, index) => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    const isLocked = !lesson.unlocked;

                    return (
                        <Card
                            key={lesson.id}
                            className={`p-6 transition-all ${isLocked
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'cursor-pointer hover:shadow-lg'
                                }`}
                            onClick={() => {
                                if (!isLocked) {
                                    // For now, just mark as completed
                                    const completed = JSON.parse(localStorage.getItem('englishCompletedLessons') || '[]');
                                    if (!completed.includes(lesson.id)) {
                                        completed.push(lesson.id);
                                        localStorage.setItem('englishCompletedLessons', JSON.stringify(completed));
                                        setCompletedLessons(completed);
                                    }
                                }
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${isCompleted
                                        ? 'bg-green-100'
                                        : isLocked
                                            ? 'bg-gray-100'
                                            : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                                    }`}>
                                    {isCompleted ? (
                                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                                    ) : isLocked ? (
                                        <Lock className="w-8 h-8 text-gray-400" />
                                    ) : (
                                        <Play className="w-8 h-8 text-white" />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-semibold text-muted-foreground">
                                            Level {lesson.level}
                                        </span>
                                        {isCompleted && (
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                                ✓ Completed
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-1">
                                        {lesson.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {lesson.titleHindi}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {lesson.type === 'alphabet' ? 'Alphabet Learning' :
                                            lesson.type === 'words' ? 'Vocabulary' :
                                                lesson.type === 'phonics' ? 'Phonics Practice' : 'Sentences'}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Coming Soon Notice */}
            <div className="px-6 pb-12">
                <Card className="p-6 bg-blue-50 text-center">
                    <p className="text-sm text-muted-foreground">
                        📚 Full interactive lessons coming soon! For now, tap lessons to mark as complete.
                    </p>
                </Card>
            </div>
        </div>
    );
}
