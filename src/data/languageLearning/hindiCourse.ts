/**
 * HINDI LITERACY COURSE DATA
 * Duolingo-style lessons with vocab, audio, images
 */

export interface VocabEntry {
    id: string;
    hindi: string;
    english: string;
    romanization: string;
    picture: string;
    audio: string;
    category: string;
}

export interface Lesson {
    id: string;
    title: string;
    titleHindi: string;
    level: number;
    unlocked: boolean;
    vocabEntries: VocabEntry[];
    exercises: Exercise[];
}

export interface Exercise {
    id: string;
    type: 'vocab-viewer' | 'matching' | 'translation' | 'pronunciation' | 'sentence-builder' | 'tracing';
    title: string;
    titleHindi: string;
    data: any;
}

export const hindiVocabulary: VocabEntry[] = [
    // Greetings
    { id: 'h1', hindi: 'नमस्ते', english: 'Hello', romanization: 'Namaste', picture: '/images/vocabulary/hello.png', audio: '/audio/hindi/namaste.mp3', category: 'greetings' },
    { id: 'h2', hindi: 'धन्यवाद', english: 'Thank you', romanization: 'Dhanyavaad', picture: '/images/vocabulary/thanks.png', audio: '/audio/hindi/dhanyavaad.mp3', category: 'greetings' },
    { id: 'h3', hindi: 'अलविदा', english: 'Goodbye', romanization: 'Alvida', picture: '/images/vocabulary/goodbye.png', audio: '/audio/hindi/alvida.mp3', category: 'greetings' },
    { id: 'h4', hindi: 'कृपया', english: 'Please', romanization: 'Kripya', picture: '/images/vocabulary/please.png', audio: '/audio/hindi/kripya.mp3', category: 'greetings' },

    // Numbers 1-10
    { id: 'h5', hindi: 'एक', english: 'One', romanization: 'Ek', picture: '/images/vocabulary/one.png', audio: '/audio/hindi/ek.mp3', category: 'numbers' },
    { id: 'h6', hindi: 'दो', english: 'Two', romanization: 'Do', picture: '/images/vocabulary/two.png', audio: '/audio/hindi/do.mp3', category: 'numbers' },
    { id: 'h7', hindi: 'तीन', english: 'Three', romanization: 'Teen', picture: '/images/vocabulary/three.png', audio: '/audio/hindi/teen.mp3', category: 'numbers' },
    { id: 'h8', hindi: 'चार', english: 'Four', romanization: 'Chaar', picture: '/images/vocabulary/four.png', audio: '/audio/hindi/chaar.mp3', category: 'numbers' },
    { id: 'h9', hindi: 'पाँच', english: 'Five', romanization: 'Paanch', picture: '/images/vocabulary/five.png', audio: '/audio/hindi/paanch.mp3', category: 'numbers' },
    { id: 'h10', hindi: 'छह', english: 'Six', romanization: 'Chhah', picture: '/images/vocabulary/six.png', audio: '/audio/hindi/chhah.mp3', category: 'numbers' },
    { id: 'h11', hindi: 'सात', english: 'Seven', romanization: 'Saat', picture: '/images/vocabulary/seven.png', audio: '/audio/hindi/saat.mp3', category: 'numbers' },
    { id: 'h12', hindi: 'आठ', english: 'Eight', romanization: 'Aath', picture: '/images/vocabulary/eight.png', audio: '/audio/hindi/aath.mp3', category: 'numbers' },
    { id: 'h13', hindi: 'नौ', english: 'Nine', romanization: 'Nau', picture: '/images/vocabulary/nine.png', audio: '/audio/hindi/nau.mp3', category: 'numbers' },
    { id: 'h14', hindi: 'दस', english: 'Ten', romanization: 'Das', picture: '/images/vocabulary/ten.png', audio: '/audio/hindi/das.mp3', category: 'numbers' },

    // Family Words
    { id: 'h15', hindi: 'माँ', english: 'Mother', romanization: 'Maa', picture: '/images/vocabulary/mother.png', audio: '/audio/hindi/maa.mp3', category: 'family' },
    { id: 'h16', hindi: 'पिता', english: 'Father', romanization: 'Pita', picture: '/images/vocabulary/father.png', audio: '/audio/hindi/pita.mp3', category: 'family' },
    { id: 'h17', hindi: 'भाई', english: 'Brother', romanization: 'Bhai', picture: '/images/vocabulary/brother.png', audio: '/audio/hindi/bhai.mp3', category: 'family' },
    { id: 'h18', hindi: 'बहन', english: 'Sister', romanization: 'Bahan', picture: '/images/vocabulary/sister.png', audio: '/audio/hindi/bahan.mp3', category: 'family' },
    { id: 'h19', hindi: 'दादा', english: 'Grandfather', romanization: 'Dada', picture: '/images/vocabulary/grandfather.png', audio: '/audio/hindi/dada.mp3', category: 'family' },
    { id: 'h20', hindi: 'दादी', english: 'Grandmother', romanization: 'Dadi', picture: '/images/vocabulary/grandmother.png', audio: '/audio/hindi/dadi.mp3', category: 'family' },

    // Basic Verbs
    { id: 'h21', hindi: 'खाना', english: 'To eat', romanization: 'Khaana', picture: '/images/vocabulary/eat.png', audio: '/audio/hindi/khaana.mp3', category: 'verbs' },
    { id: 'h22', hindi: 'पीना', english: 'To drink', romanization: 'Peena', picture: '/images/vocabulary/drink.png', audio: '/audio/hindi/peena.mp3', category: 'verbs' },
    { id: 'h23', hindi: 'सोना', english: 'To sleep', romanization: 'Sona', picture: '/images/vocabulary/sleep.png', audio: '/audio/hindi/sona.mp3', category: 'verbs' },
    { id: 'h24', hindi: 'पढ़ना', english: 'To read', romanization: 'Padhna', picture: '/images/vocabulary/read.png', audio: '/audio/hindi/padhna.mp3', category: 'verbs' },
    { id: 'h25', hindi: 'लिखना', english: 'To write', romanization: 'Likhna', picture: '/images/vocabulary/write.png', audio: '/audio/hindi/likhna.mp3', category: 'verbs' },
    { id: 'h26', hindi: 'चलना', english: 'To walk', romanization: 'Chalna', picture: '/images/vocabulary/walk.png', audio: '/audio/hindi/chalna.mp3', category: 'verbs' },
];

export const hindiLessons: Lesson[] = [
    {
        id: 'hindi-1',
        title: 'Greetings',
        titleHindi: 'अभिवादन',
        level: 1,
        unlocked: true,
        vocabEntries: hindiVocabulary.filter(v => v.category === 'greetings'),
        exercises: [
            {
                id: 'h1-ex1',
                type: 'vocab-viewer',
                title: 'Learn Greetings',
                titleHindi: 'अभिवादन सीखें',
                data: { vocabIds: ['h1', 'h2', 'h3', 'h4'] }
            },
            {
                id: 'h1-ex2',
                type: 'matching',
                title: 'Match Hindi to English',
                titleHindi: 'हिंदी को अंग्रेजी से मिलाएं',
                data: {
                    pairs: [
                        { hindi: 'नमस्ते', english: 'Hello' },
                        { hindi: 'धन्यवाद', english: 'Thank you' },
                        { hindi: 'अलविदा', english: 'Goodbye' },
                        { hindi: 'कृपया', english: 'Please' },
                    ]
                }
            }
        ]
    },
    {
        id: 'hindi-2',
        title: 'Numbers 1-10',
        titleHindi: 'संख्याएं 1-10',
        level: 2,
        unlocked: false,
        vocabEntries: hindiVocabulary.filter(v => v.category === 'numbers'),
        exercises: [
            {
                id: 'h2-ex1',
                type: 'vocab-viewer',
                title: 'Learn Numbers',
                titleHindi: 'संख्याएं सीखें',
                data: { vocabIds: ['h5', 'h6', 'h7', 'h8', 'h9', 'h10', 'h11', 'h12', 'h13', 'h14'] }
            },
            {
                id: 'h2-ex2',
                type: 'matching',
                title: 'Match Numbers',
                titleHindi: 'संख्याओं को मिलाएं',
                data: {
                    pairs: [
                        { hindi: 'एक', english: 'One' },
                        { hindi: 'दो', english: 'Two' },
                        { hindi: 'तीन', english: 'Three' },
                        { hindi: 'चार', english: 'Four' },
                        { hindi: 'पाँच', english: 'Five' },
                    ]
                }
            }
        ]
    },
    {
        id: 'hindi-3',
        title: 'Family Words',
        titleHindi: 'परिवार के शब्द',
        level: 3,
        unlocked: false,
        vocabEntries: hindiVocabulary.filter(v => v.category === 'family'),
        exercises: [
            {
                id: 'h3-ex1',
                type: 'vocab-viewer',
                title: 'Learn Family Words',
                titleHindi: 'परिवार के शब्द सीखें',
                data: { vocabIds: ['h15', 'h16', 'h17', 'h18', 'h19', 'h20'] }
            },
            {
                id: 'h3-ex2',
                type: 'matching',
                title: 'Match Family Members',
                titleHindi: 'परिवार के सदस्यों को मिलाएं',
                data: {
                    pairs: [
                        { hindi: 'माँ', english: 'Mother' },
                        { hindi: 'पिता', english: 'Father' },
                        { hindi: 'भाई', english: 'Brother' },
                        { hindi: 'बहन', english: 'Sister' },
                    ]
                }
            }
        ]
    },
    {
        id: 'hindi-4',
        title: 'Basic Verbs',
        titleHindi: 'मूल क्रियाएं',
        level: 4,
        unlocked: false,
        vocabEntries: hindiVocabulary.filter(v => v.category === 'verbs'),
        exercises: [
            {
                id: 'h4-ex1',
                type: 'vocab-viewer',
                title: 'Learn Verbs',
                titleHindi: 'क्रियाएं सीखें',
                data: { vocabIds: ['h21', 'h22', 'h23', 'h24', 'h25', 'h26'] }
            },
            {
                id: 'h4-ex2',
                type: 'sentence-builder',
                title: 'Build Sentences',
                titleHindi: 'वाक्य बनाएं',
                data: {
                    sentences: [
                        { words: ['मैं', 'खाना', 'खाता', 'हूं'], correct: 'मैं खाना खाता हूं', english: 'I eat food' },
                        { words: ['मैं', 'पानी', 'पीता', 'हूं'], correct: 'मैं पानी पीता हूं', english: 'I drink water' },
                    ]
                }
            }
        ]
    }
];
