/**
 * ENGLISH LITERACY COURSE DATA
 * A-Z alphabet + basic words + phonics
 */

export interface EnglishVocabEntry {
    id: string;
    word: string;
    hindi: string;
    picture: string;
    audio: string;
    category: string;
    phonics?: string;
}

export interface AlphabetEntry {
    letter: string;
    uppercase: string;
    lowercase: string;
    phonics: string;
    exampleWord: string;
    picture: string;
    audio: string;
}

export const englishAlphabet: AlphabetEntry[] = [
    { letter: 'A', uppercase: 'A', lowercase: 'a', phonics: '/eɪ/', exampleWord: 'Apple', picture: '/images/vocabulary/apple.png', audio: '/audio/english/a.mp3' },
    { letter: 'B', uppercase: 'B', lowercase: 'b', phonics: '/biː/', exampleWord: 'Ball', picture: '/images/vocabulary/ball.png', audio: '/audio/english/b.mp3' },
    { letter: 'C', uppercase: 'C', lowercase: 'c', phonics: '/siː/', exampleWord: 'Cat', picture: '/images/vocabulary/cat.png', audio: '/audio/english/c.mp3' },
    { letter: 'D', uppercase: 'D', lowercase: 'd', phonics: '/diː/', exampleWord: 'Dog', picture: '/images/vocabulary/dog.png', audio: '/audio/english/d.mp3' },
    { letter: 'E', uppercase: 'E', lowercase: 'e', phonics: '/iː/', exampleWord: 'Elephant', picture: '/images/vocabulary/elephant.png', audio: '/audio/english/e.mp3' },
    { letter: 'F', uppercase: 'F', lowercase: 'f', phonics: '/ɛf/', exampleWord: 'Fish', picture: '/images/vocabulary/fish.png', audio: '/audio/english/f.mp3' },
    { letter: 'G', uppercase: 'G', lowercase: 'g', phonics: '/dʒiː/', exampleWord: 'Goat', picture: '/images/vocabulary/goat.png', audio: '/audio/english/g.mp3' },
    { letter: 'H', uppercase: 'H', lowercase: 'h', phonics: '/eɪtʃ/', exampleWord: 'House', picture: '/images/vocabulary/house.png', audio: '/audio/english/h.mp3' },
    { letter: 'I', uppercase: 'I', lowercase: 'i', phonics: '/aɪ/', exampleWord: 'Ice cream', picture: '/images/vocabulary/icecream.png', audio: '/audio/english/i.mp3' },
    { letter: 'J', uppercase: 'J', lowercase: 'j', phonics: '/dʒeɪ/', exampleWord: 'Jug', picture: '/images/vocabulary/jug.png', audio: '/audio/english/j.mp3' },
];

export const englishVocabulary: EnglishVocabEntry[] = [
    // Basic Words
    { id: 'e1', word: 'Cat', hindi: 'बिल्ली', picture: '/images/vocabulary/cat.png', audio: '/audio/english/cat.mp3', category: 'animals', phonics: '/kæt/' },
    { id: 'e2', word: 'Dog', hindi: 'कुत्ता', picture: '/images/vocabulary/dog.png', audio: '/audio/english/dog.mp3', category: 'animals', phonics: '/dɒɡ/' },
    { id: 'e3', word: 'Sun', hindi: 'सूरज', picture: '/images/vocabulary/sun.png', audio: '/audio/english/sun.mp3', category: 'nature', phonics: '/sʌn/' },
    { id: 'e4', word: 'Ball', hindi: 'गेंद', picture: '/images/vocabulary/ball.png', audio: '/audio/english/ball.mp3', category: 'toys', phonics: '/bɔːl/' },
    { id: 'e5', word: 'Book', hindi: 'किताब', picture: '/images/vocabulary/book.png', audio: '/audio/english/book.mp3', category: 'school', phonics: '/bʊk/' },
    { id: 'e6', word: 'Tree', hindi: 'पेड़', picture: '/images/vocabulary/tree.png', audio: '/audio/english/tree.mp3', category: 'nature', phonics: '/triː/' },
    { id: 'e7', word: 'Apple', hindi: 'सेब', picture: '/images/vocabulary/apple.png', audio: '/audio/english/apple.mp3', category: 'food', phonics: '/ˈæp.əl/' },
    { id: 'e8', word: 'Water', hindi: 'पानी', picture: '/images/vocabulary/water.png', audio: '/audio/english/water.mp3', category: 'food', phonics: '/ˈwɔː.tər/' },
    { id: 'e9', word: 'House', hindi: 'घर', picture: '/images/vocabulary/house.png', audio: '/audio/english/house.mp3', category: 'home', phonics: '/haʊs/' },
    { id: 'e10', word: 'School', hindi: 'स्कूल', picture: '/images/vocabulary/school.png', audio: '/audio/english/school.mp3', category: 'places', phonics: '/skuːl/' },
];

export interface EnglishLesson {
    id: string;
    title: string;
    titleHindi: string;
    level: number;
    unlocked: boolean;
    type: 'alphabet' | 'phonics' | 'words' | 'sentences';
    content: any;
}

export const englishLessons: EnglishLesson[] = [
    {
        id: 'eng-1',
        title: 'Alphabet A-J',
        titleHindi: 'वर्णमाला A-J',
        level: 1,
        unlocked: true,
        type: 'alphabet',
        content: {
            letters: englishAlphabet.slice(0, 10),
            exercises: [
                {
                    type: 'letter-recognition',
                    title: 'Find the Letter',
                    questions: [
                        { letter: 'A', options: ['A', 'B', 'C', 'D'] },
                        { letter: 'B', options: ['A', 'B', 'C', 'D'] },
                        { letter: 'C', options: ['A', 'B', 'C', 'D'] },
                    ]
                },
                {
                    type: 'tracing',
                    title: 'Trace Letters',
                    letters: ['A', 'B', 'C']
                }
            ]
        }
    },
    {
        id: 'eng-2',
        title: 'Basic Words',
        titleHindi: 'मूल शब्द',
        level: 2,
        unlocked: false,
        type: 'words',
        content: {
            vocab: englishVocabulary.slice(0, 5),
            exercises: [
                {
                    type: 'word-picture-match',
                    title: 'Match Word to Picture',
                    pairs: [
                        { word: 'Cat', picture: '/images/vocabulary/cat.png' },
                        { word: 'Dog', picture: '/images/vocabulary/dog.png' },
                        { word: 'Sun', picture: '/images/vocabulary/sun.png' },
                    ]
                }
            ]
        }
    },
    {
        id: 'eng-3',
        title: 'Phonics Practice',
        titleHindi: 'ध्वनि अभ्यास',
        level: 3,
        unlocked: false,
        type: 'phonics',
        content: {
            sounds: [
                { phoneme: 'a', sound: '/æ/', words: ['cat', 'bat', 'hat'] },
                { phoneme: 'e', sound: '/ɛ/', words: ['bed', 'red', 'pen'] },
                { phoneme: 'i', sound: '/ɪ/', words: ['sit', 'bit', 'hit'] },
            ]
        }
    }
];
