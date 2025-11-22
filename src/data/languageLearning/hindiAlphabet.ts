/**
 * HINDI ALPHABET LEARNING COURSE
 * Progressive curriculum from basic letters to reading
 * Designed for rural Indian children (ages 5-10)
 */

export interface HindiLetter {
    id: string;
    letter: string; // Devanagari
    romanization: string;
    sound: string; // Phonetic description
    type: 'vowel' | 'consonant' | 'matra';
    examples: {
        word: string; // Hindi word
        wordRoman: string;
        meaning: string;
        picture: string; // Emoji or image
    }[];
    audio: string;
    tracePoints?: { x: number; y: number }[]; // For letter tracing
}

export interface AlphabetLesson {
    id: string;
    level: number;
    title: string;
    titleHindi: string;
    description: string;
    icon: string;
    letters: string[]; // Letter IDs
    exercises: AlphabetExercise[];
    unlocked: boolean;
    estimatedMinutes: number;
}

export interface AlphabetExercise {
    id: string;
    type: 'introduction' | 'listen-repeat' | 'match' | 'trace' | 'identify' | 'word-building' | 'reading';
    title: string;
    instructions: string;
    instructionsHindi: string;
    data: any; // Exercise-specific data
}

// ============================================
// VOWELS (स्वर - Swar)
// ============================================

export const hindiVowels: HindiLetter[] = [
    {
        id: 'v1',
        letter: 'अ',
        romanization: 'a',
        sound: 'a as in "about"',
        type: 'vowel',
        examples: [
            { word: 'अनार', wordRoman: 'anaar', meaning: 'Pomegranate', picture: '🍎' },
            { word: 'अंगूर', wordRoman: 'angoor', meaning: 'Grapes', picture: '🍇' },
        ],
        audio: '/audio/hindi/vowels/a.mp3',
    },
    {
        id: 'v2',
        letter: 'आ',
        romanization: 'aa',
        sound: 'aa as in "father"',
        type: 'vowel',
        examples: [
            { word: 'आम', wordRoman: 'aam', meaning: 'Mango', picture: '🥭' },
            { word: 'आग', wordRoman: 'aag', meaning: 'Fire', picture: '🔥' },
        ],
        audio: '/audio/hindi/vowels/aa.mp3',
    },
    {
        id: 'v3',
        letter: 'इ',
        romanization: 'i',
        sound: 'i as in "sit"',
        type: 'vowel',
        examples: [
            { word: 'इमली', wordRoman: 'imli', meaning: 'Tamarind', picture: '🌰' },
        ],
        audio: '/audio/hindi/vowels/i.mp3',
    },
    {
        id: 'v4',
        letter: 'ई',
        romanization: 'ee',
        sound: 'ee as in "see"',
        type: 'vowel',
        examples: [
            { word: 'ईख', wordRoman: 'eekh', meaning: 'Sugarcane', picture: '🎋' },
        ],
        audio: '/audio/hindi/vowels/ee.mp3',
    },
    {
        id: 'v5',
        letter: 'उ',
        romanization: 'u',
        sound: 'u as in "put"',
        type: 'vowel',
        examples: [
            { word: 'उल्लू', wordRoman: 'ullu', meaning: 'Owl', picture: '🦉' },
        ],
        audio: '/audio/hindi/vowels/u.mp3',
    },
    {
        id: 'v6',
        letter: 'ऊ',
        romanization: 'oo',
        sound: 'oo as in "moon"',
        type: 'vowel',
        examples: [
            { word: 'ऊन', wordRoman: 'oon', meaning: 'Wool', picture: '🧶' },
        ],
        audio: '/audio/hindi/vowels/oo.mp3',
    },
    {
        id: 'v7',
        letter: 'ए',
        romanization: 'e',
        sound: 'e as in "bed"',
        type: 'vowel',
        examples: [
            { word: 'एक', wordRoman: 'ek', meaning: 'One', picture: '1️⃣' },
        ],
        audio: '/audio/hindi/vowels/e.mp3',
    },
    {
        id: 'v8',
        letter: 'ऐ',
        romanization: 'ai',
        sound: 'ai as in "rain"',
        type: 'vowel',
        examples: [
            { word: 'ऐनक', wordRoman: 'ainak', meaning: 'Glasses', picture: '👓' },
        ],
        audio: '/audio/hindi/vowels/ai.mp3',
    },
    {
        id: 'v9',
        letter: 'ओ',
        romanization: 'o',
        sound: 'o as in "go"',
        type: 'vowel',
        examples: [
            { word: 'ओस', wordRoman: 'os', meaning: 'Dew', picture: '💧' },
        ],
        audio: '/audio/hindi/vowels/o.mp3',
    },
    {
        id: 'v10',
        letter: 'औ',
        romanization: 'au',
        sound: 'au as in "cow"',
        type: 'vowel',
        examples: [
            { word: 'औरत', wordRoman: 'aurat', meaning: 'Woman', picture: '👩' },
        ],
        audio: '/audio/hindi/vowels/au.mp3',
    },
    {
        id: 'v11',
        letter: 'अं',
        romanization: 'an',
        sound: 'nasal sound',
        type: 'vowel',
        examples: [
            { word: 'अंडा', wordRoman: 'anda', meaning: 'Egg', picture: '🥚' },
        ],
        audio: '/audio/hindi/vowels/an.mp3',
    },
    {
        id: 'v12',
        letter: 'अः',
        romanization: 'ah',
        sound: 'visarga',
        type: 'vowel',
        examples: [
            { word: 'अतः', wordRoman: 'atah', meaning: 'Therefore', picture: '➡️' },
        ],
        audio: '/audio/hindi/vowels/ah.mp3',
    },
];

// ============================================
// CONSONANTS (व्यंजन - Vyanjan) - Ka Varga
// ============================================

export const hindiConsonants: HindiLetter[] = [
    // Ka Varga (क वर्ग)
    {
        id: 'c1',
        letter: 'क',
        romanization: 'ka',
        sound: 'k as in "kite"',
        type: 'consonant',
        examples: [
            { word: 'कमल', wordRoman: 'kamal', meaning: 'Lotus', picture: '🌸' },
            { word: 'कबूतर', wordRoman: 'kabootar', meaning: 'Pigeon', picture: '🕊️' },
        ],
        audio: '/audio/hindi/consonants/ka.mp3',
    },
    {
        id: 'c2',
        letter: 'ख',
        romanization: 'kha',
        sound: 'kh as in "khan"',
        type: 'consonant',
        examples: [
            { word: 'खरगोश', wordRoman: 'khargosh', meaning: 'Rabbit', picture: '🐰' },
            { word: 'खिड़की', wordRoman: 'khidki', meaning: 'Window', picture: '🪟' },
        ],
        audio: '/audio/hindi/consonants/kha.mp3',
    },
    {
        id: 'c3',
        letter: 'ग',
        romanization: 'ga',
        sound: 'g as in "go"',
        type: 'consonant',
        examples: [
            { word: 'गाय', wordRoman: 'gaay', meaning: 'Cow', picture: '🐄' },
            { word: 'गुलाब', wordRoman: 'gulaab', meaning: 'Rose', picture: '🌹' },
        ],
        audio: '/audio/hindi/consonants/ga.mp3',
    },
    {
        id: 'c4',
        letter: 'घ',
        romanization: 'gha',
        sound: 'gh as in "ghost"',
        type: 'consonant',
        examples: [
            { word: 'घर', wordRoman: 'ghar', meaning: 'House', picture: '🏠' },
            { word: 'घड़ी', wordRoman: 'ghadi', meaning: 'Clock', picture: '⏰' },
        ],
        audio: '/audio/hindi/consonants/gha.mp3',
    },
    {
        id: 'c5',
        letter: 'ङ',
        romanization: 'nga',
        sound: 'ng as in "sing"',
        type: 'consonant',
        examples: [
            { word: 'अंगूठा', wordRoman: 'angootha', meaning: 'Thumb', picture: '👍' },
        ],
        audio: '/audio/hindi/consonants/nga.mp3',
    },

    // Cha Varga (च वर्ग)
    {
        id: 'c6',
        letter: 'च',
        romanization: 'cha',
        sound: 'ch as in "chair"',
        type: 'consonant',
        examples: [
            { word: 'चम्मच', wordRoman: 'chammach', meaning: 'Spoon', picture: '🥄' },
            { word: 'चाय', wordRoman: 'chaay', meaning: 'Tea', picture: '☕' },
        ],
        audio: '/audio/hindi/consonants/cha.mp3',
    },
    {
        id: 'c7',
        letter: 'छ',
        romanization: 'chha',
        sound: 'chh as in "chhatra"',
        type: 'consonant',
        examples: [
            { word: 'छतरी', wordRoman: 'chhatri', meaning: 'Umbrella', picture: '☂️' },
            { word: 'छत', wordRoman: 'chhat', meaning: 'Roof', picture: '🏠' },
        ],
        audio: '/audio/hindi/consonants/chha.mp3',
    },
    {
        id: 'c8',
        letter: 'ज',
        romanization: 'ja',
        sound: 'j as in "jump"',
        type: 'consonant',
        examples: [
            { word: 'जल', wordRoman: 'jal', meaning: 'Water', picture: '💧' },
            { word: 'जूता', wordRoman: 'joota', meaning: 'Shoe', picture: '👞' },
        ],
        audio: '/audio/hindi/consonants/ja.mp3',
    },
    {
        id: 'c9',
        letter: 'झ',
        romanization: 'jha',
        sound: 'jh as in "jhanda"',
        type: 'consonant',
        examples: [
            { word: 'झंडा', wordRoman: 'jhanda', meaning: 'Flag', picture: '🚩' },
            { word: 'झूला', wordRoman: 'jhoola', meaning: 'Swing', picture: '🎪' },
        ],
        audio: '/audio/hindi/consonants/jha.mp3',
    },
    {
        id: 'c10',
        letter: 'ञ',
        romanization: 'nya',
        sound: 'ny as in "canyon"',
        type: 'consonant',
        examples: [
            { word: 'ज्ञान', wordRoman: 'gyaan', meaning: 'Knowledge', picture: '📚' },
        ],
        audio: '/audio/hindi/consonants/nya.mp3',
    },

    // Ta Varga (ट वर्ग)
    {
        id: 'c11',
        letter: 'ट',
        romanization: 'ta',
        sound: 't (hard)',
        type: 'consonant',
        examples: [
            { word: 'टमाटर', wordRoman: 'tamatar', meaning: 'Tomato', picture: '🍅' },
        ],
        audio: '/audio/hindi/consonants/ta-hard.mp3',
    },
    {
        id: 'c12',
        letter: 'ठ',
        romanization: 'tha',
        sound: 'th (hard)',
        type: 'consonant',
        examples: [
            { word: 'ठंडा', wordRoman: 'thanda', meaning: 'Cold', picture: '🧊' },
        ],
        audio: '/audio/hindi/consonants/tha-hard.mp3',
    },
    {
        id: 'c13',
        letter: 'ड',
        romanization: 'da',
        sound: 'd (hard)',
        type: 'consonant',
        examples: [
            { word: 'डमरू', wordRoman: 'damroo', meaning: 'Drum', picture: '🥁' },
        ],
        audio: '/audio/hindi/consonants/da-hard.mp3',
    },
    {
        id: 'c14',
        letter: 'ढ',
        romanization: 'dha',
        sound: 'dh (hard)',
        type: 'consonant',
        examples: [
            { word: 'ढोल', wordRoman: 'dhol', meaning: 'Drum', picture: '🥁' },
        ],
        audio: '/audio/hindi/consonants/dha-hard.mp3',
    },
    {
        id: 'c15',
        letter: 'ण',
        romanization: 'na',
        sound: 'n (hard)',
        type: 'consonant',
        examples: [
            { word: 'गणित', wordRoman: 'ganit', meaning: 'Mathematics', picture: '🔢' },
        ],
        audio: '/audio/hindi/consonants/na-hard.mp3',
    },

    // Ta Varga (त वर्ग) - Soft
    {
        id: 'c16',
        letter: 'त',
        romanization: 'ta',
        sound: 't (soft)',
        type: 'consonant',
        examples: [
            { word: 'तारा', wordRoman: 'taara', meaning: 'Star', picture: '⭐' },
            { word: 'तोता', wordRoman: 'tota', meaning: 'Parrot', picture: '🦜' },
        ],
        audio: '/audio/hindi/consonants/ta-soft.mp3',
    },
    {
        id: 'c17',
        letter: 'थ',
        romanization: 'tha',
        sound: 'th (soft)',
        type: 'consonant',
        examples: [
            { word: 'थाली', wordRoman: 'thaali', meaning: 'Plate', picture: '🍽️' },
        ],
        audio: '/audio/hindi/consonants/tha-soft.mp3',
    },
    {
        id: 'c18',
        letter: 'द',
        romanization: 'da',
        sound: 'd (soft)',
        type: 'consonant',
        examples: [
            { word: 'दवा', wordRoman: 'dawa', meaning: 'Medicine', picture: '💊' },
            { word: 'दूध', wordRoman: 'doodh', meaning: 'Milk', picture: '🥛' },
        ],
        audio: '/audio/hindi/consonants/da-soft.mp3',
    },
    {
        id: 'c19',
        letter: 'ध',
        romanization: 'dha',
        sound: 'dh (soft)',
        type: 'consonant',
        examples: [
            { word: 'धनुष', wordRoman: 'dhanush', meaning: 'Bow', picture: '🏹' },
        ],
        audio: '/audio/hindi/consonants/dha-soft.mp3',
    },
    {
        id: 'c20',
        letter: 'न',
        romanization: 'na',
        sound: 'n (soft)',
        type: 'consonant',
        examples: [
            { word: 'नाक', wordRoman: 'naak', meaning: 'Nose', picture: '👃' },
            { word: 'नल', wordRoman: 'nal', meaning: 'Tap', picture: '🚰' },
        ],
        audio: '/audio/hindi/consonants/na-soft.mp3',
    },

    // Pa Varga (प वर्ग)
    {
        id: 'c21',
        letter: 'प',
        romanization: 'pa',
        sound: 'p as in "pen"',
        type: 'consonant',
        examples: [
            { word: 'पानी', wordRoman: 'paani', meaning: 'Water', picture: '💧' },
            { word: 'पत्ता', wordRoman: 'patta', meaning: 'Leaf', picture: '🍃' },
        ],
        audio: '/audio/hindi/consonants/pa.mp3',
    },
    {
        id: 'c22',
        letter: 'फ',
        romanization: 'pha',
        sound: 'ph as in "phone"',
        type: 'consonant',
        examples: [
            { word: 'फल', wordRoman: 'phal', meaning: 'Fruit', picture: '🍎' },
            { word: 'फूल', wordRoman: 'phool', meaning: 'Flower', picture: '🌺' },
        ],
        audio: '/audio/hindi/consonants/pha.mp3',
    },
    {
        id: 'c23',
        letter: 'ब',
        romanization: 'ba',
        sound: 'b as in "ball"',
        type: 'consonant',
        examples: [
            { word: 'बकरी', wordRoman: 'bakri', meaning: 'Goat', picture: '🐐' },
            { word: 'बस', wordRoman: 'bas', meaning: 'Bus', picture: '🚌' },
        ],
        audio: '/audio/hindi/consonants/ba.mp3',
    },
    {
        id: 'c24',
        letter: 'भ',
        romanization: 'bha',
        sound: 'bh as in "bharat"',
        type: 'consonant',
        examples: [
            { word: 'भालू', wordRoman: 'bhaalu', meaning: 'Bear', picture: '🐻' },
        ],
        audio: '/audio/hindi/consonants/bha.mp3',
    },
    {
        id: 'c25',
        letter: 'म',
        romanization: 'ma',
        sound: 'm as in "mother"',
        type: 'consonant',
        examples: [
            { word: 'माँ', wordRoman: 'maa', meaning: 'Mother', picture: '👩' },
            { word: 'मछली', wordRoman: 'machhli', meaning: 'Fish', picture: '🐟' },
        ],
        audio: '/audio/hindi/consonants/ma.mp3',
    },

    // Ya Ra La Va (य र ल व)
    {
        id: 'c26',
        letter: 'य',
        romanization: 'ya',
        sound: 'y as in "yes"',
        type: 'consonant',
        examples: [
            { word: 'यज्ञ', wordRoman: 'yagya', meaning: 'Ritual', picture: '🔥' },
        ],
        audio: '/audio/hindi/consonants/ya.mp3',
    },
    {
        id: 'c27',
        letter: 'र',
        romanization: 'ra',
        sound: 'r as in "red"',
        type: 'consonant',
        examples: [
            { word: 'रथ', wordRoman: 'rath', meaning: 'Chariot', picture: '🏛️' },
            { word: 'रोटी', wordRoman: 'roti', meaning: 'Bread', picture: '🫓' },
        ],
        audio: '/audio/hindi/consonants/ra.mp3',
    },
    {
        id: 'c28',
        letter: 'ल',
        romanization: 'la',
        sound: 'l as in "lamp"',
        type: 'consonant',
        examples: [
            { word: 'लड़का', wordRoman: 'ladka', meaning: 'Boy', picture: '👦' },
            { word: 'लाल', wordRoman: 'laal', meaning: 'Red', picture: '🔴' },
        ],
        audio: '/audio/hindi/consonants/la.mp3',
    },
    {
        id: 'c29',
        letter: 'व',
        romanization: 'va',
        sound: 'v/w as in "van"',
        type: 'consonant',
        examples: [
            { word: 'वन', wordRoman: 'van', meaning: 'Forest', picture: '🌳' },
        ],
        audio: '/audio/hindi/consonants/va.mp3',
    },

    // Sha Sa Ha (श ष स ह)
    {
        id: 'c30',
        letter: 'श',
        romanization: 'sha',
        sound: 'sh as in "ship"',
        type: 'consonant',
        examples: [
            { word: 'शेर', wordRoman: 'sher', meaning: 'Lion', picture: '🦁' },
        ],
        audio: '/audio/hindi/consonants/sha.mp3',
    },
    {
        id: 'c31',
        letter: 'ष',
        romanization: 'sha',
        sound: 'sh (hard)',
        type: 'consonant',
        examples: [
            { word: 'षट्', wordRoman: 'shat', meaning: 'Six', picture: '6️⃣' },
        ],
        audio: '/audio/hindi/consonants/sha-hard.mp3',
    },
    {
        id: 'c32',
        letter: 'स',
        romanization: 'sa',
        sound: 's as in "sun"',
        type: 'consonant',
        examples: [
            { word: 'सेब', wordRoman: 'seb', meaning: 'Apple', picture: '🍎' },
            { word: 'सूरज', wordRoman: 'sooraj', meaning: 'Sun', picture: '☀️' },
        ],
        audio: '/audio/hindi/consonants/sa.mp3',
    },
    {
        id: 'c33',
        letter: 'ह',
        romanization: 'ha',
        sound: 'h as in "house"',
        type: 'consonant',
        examples: [
            { word: 'हाथी', wordRoman: 'haathi', meaning: 'Elephant', picture: '🐘' },
            { word: 'हल', wordRoman: 'hal', meaning: 'Plow', picture: '🚜' },
        ],
        audio: '/audio/hindi/consonants/ha.mp3',
    },

    // Additional consonants
    {
        id: 'c34',
        letter: 'क्ष',
        romanization: 'ksha',
        sound: 'ksh',
        type: 'consonant',
        examples: [
            { word: 'क्षमा', wordRoman: 'kshama', meaning: 'Forgiveness', picture: '🙏' },
        ],
        audio: '/audio/hindi/consonants/ksha.mp3',
    },
    {
        id: 'c35',
        letter: 'त्र',
        romanization: 'tra',
        sound: 'tr',
        type: 'consonant',
        examples: [
            { word: 'त्रिशूल', wordRoman: 'trishul', meaning: 'Trident', picture: '🔱' },
        ],
        audio: '/audio/hindi/consonants/tra.mp3',
    },
    {
        id: 'c36',
        letter: 'ज्ञ',
        romanization: 'gya',
        sound: 'gy',
        type: 'consonant',
        examples: [
            { word: 'ज्ञान', wordRoman: 'gyaan', meaning: 'Knowledge', picture: '📚' },
        ],
        audio: '/audio/hindi/consonants/gya.mp3',
    },
];

// ============================================
// PROGRESSIVE LESSONS
// ============================================

export const hindiAlphabetLessons: AlphabetLesson[] = [
    // Level 1: Introduction to Vowels (स्वर)
    {
        id: 'alphabet-1',
        level: 1,
        title: 'First Vowels: अ आ इ',
        titleHindi: 'पहले स्वर: अ आ इ',
        description: 'Learn the first three Hindi vowels with sounds and pictures',
        icon: '🎯',
        letters: ['v1', 'v2', 'v3'],
        estimatedMinutes: 10,
        unlocked: true,
        exercises: [
            {
                id: 'ex1-1',
                type: 'introduction',
                title: 'Meet the Vowels',
                instructions: 'Listen and watch as we introduce each letter',
                instructionsHindi: 'सुनो और देखो जब हम हर अक्षर से मिलते हैं',
                data: { letters: ['v1', 'v2', 'v3'] },
            },
            {
                id: 'ex1-2',
                type: 'listen-repeat',
                title: 'Listen and Repeat',
                instructions: 'Tap each letter to hear its sound, then say it aloud',
                instructionsHindi: 'हर अक्षर को छूकर सुनो, फिर जोर से बोलो',
                data: { letters: ['v1', 'v2', 'v3'] },
            },
            {
                id: 'ex1-3',
                type: 'match',
                title: 'Match the Letter',
                instructions: 'Match the letter to its picture',
                instructionsHindi: 'अक्षर को उसकी तस्वीर से मिलाओ',
                data: {
                    pairs: [
                        { letter: 'v1', image: '🍎' },
                        { letter: 'v2', image: '🥭' },
                        { letter: 'v3', image: '🌰' },
                    ],
                },
            },
        ],
    },

    // Level 2: More Vowels
    {
        id: 'alphabet-2',
        level: 2,
        title: 'More Vowels: ई उ ऊ',
        titleHindi: 'और स्वर: ई उ ऊ',
        description: 'Continue learning vowels with new sounds',
        icon: '📝',
        letters: ['v4', 'v5', 'v6'],
        estimatedMinutes: 10,
        unlocked: false,
        exercises: [
            {
                id: 'ex2-1',
                type: 'introduction',
                title: 'New Vowels',
                instructions: 'Learn three more vowel sounds',
                instructionsHindi: 'तीन और स्वर सीखो',
                data: { letters: ['v4', 'v5', 'v6'] },
            },
            {
                id: 'ex2-2',
                type: 'listen-repeat',
                title: 'Practice Sounds',
                instructions: 'Listen carefully and repeat each sound',
                instructionsHindi: 'ध्यान से सुनो और हर आवाज़ दोहराओ',
                data: { letters: ['v4', 'v5', 'v6'] },
            },
            {
                id: 'ex2-3',
                type: 'identify',
                title: 'Find the Letter',
                instructions: 'Listen to the sound and tap the correct letter',
                instructionsHindi: 'आवाज़ सुनो और सही अक्षर छूओ',
                data: { letters: ['v4', 'v5', 'v6'] },
            },
        ],
    },

    // Level 3: Complete Vowels
    {
        id: 'alphabet-3',
        level: 3,
        title: 'All Vowels: ए ऐ ओ औ',
        titleHindi: 'सभी स्वर: ए ऐ ओ औ',
        description: 'Master all Hindi vowels',
        icon: '⭐',
        letters: ['v7', 'v8', 'v9', 'v10'],
        estimatedMinutes: 12,
        unlocked: false,
        exercises: [
            {
                id: 'ex3-1',
                type: 'introduction',
                title: 'Final Vowels',
                instructions: 'Learn the last vowel sounds',
                instructionsHindi: 'आखिरी स्वर सीखो',
                data: { letters: ['v7', 'v8', 'v9', 'v10'] },
            },
            {
                id: 'ex3-2',
                type: 'listen-repeat',
                title: 'Review All Vowels',
                instructions: 'Practice all 10 vowels',
                instructionsHindi: 'सभी 10 स्वर का अभ्यास करो',
                data: { letters: ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10'] },
            },
        ],
    },

    // Level 4: First Consonants (Ka Varga)
    {
        id: 'alphabet-4',
        level: 4,
        title: 'Ka Family: क ख ग घ ङ',
        titleHindi: 'क वर्ग: क ख ग घ ङ',
        description: 'Learn the Ka family of consonants',
        icon: '🔤',
        letters: ['c1', 'c2', 'c3', 'c4', 'c5'],
        estimatedMinutes: 15,
        unlocked: false,
        exercises: [
            {
                id: 'ex4-1',
                type: 'introduction',
                title: 'Ka Family',
                instructions: 'Meet the first consonant family',
                instructionsHindi: 'पहले व्यंजन परिवार से मिलो',
                data: { letters: ['c1', 'c2', 'c3', 'c4', 'c5'] },
            },
            {
                id: 'ex4-2',
                type: 'listen-repeat',
                title: 'Practice Consonants',
                instructions: 'Listen and repeat each consonant',
                instructionsHindi: 'सुनो और हर व्यंजन दोहराओ',
                data: { letters: ['c1', 'c2', 'c3', 'c4', 'c5'] },
            },
            {
                id: 'ex4-3',
                type: 'word-building',
                title: 'Build Words',
                instructions: 'Combine consonants with vowels to make words',
                instructionsHindi: 'व्यंजन और स्वर मिलाकर शब्द बनाओ',
                data: {
                    combinations: [
                        { consonant: 'c1', vowel: 'v2', word: 'का', meaning: 'of' },
                        { consonant: 'c3', vowel: 'v2', word: 'गा', meaning: 'sing' },
                    ],
                },
            },
        ],
    },

    // Level 5: Cha Varga
    {
        id: 'alphabet-5',
        level: 5,
        title: 'Cha Family: च छ ज झ ञ',
        titleHindi: 'च वर्ग: च छ ज झ ञ',
        description: 'Learn the Cha family of consonants',
        icon: '📖',
        letters: ['c6', 'c7', 'c8', 'c9', 'c10'],
        estimatedMinutes: 15,
        unlocked: false,
        exercises: [
            {
                id: 'ex5-1',
                type: 'introduction',
                title: 'Cha Family',
                instructions: 'Learn the second consonant family',
                instructionsHindi: 'दूसरे व्यंजन परिवार को सीखो',
                data: { letters: ['c6', 'c7', 'c8', 'c9', 'c10'] },
            },
            {
                id: 'ex5-2',
                type: 'word-building',
                title: 'Make Words',
                instructions: 'Create simple words with these letters',
                instructionsHindi: 'इन अक्षरों से आसान शब्द बनाओ',
                data: {
                    combinations: [
                        { consonant: 'c6', vowel: 'v2', word: 'चा', meaning: 'tea (informal)' },
                        { consonant: 'c8', vowel: 'v2', word: 'जा', meaning: 'go' },
                    ],
                },
            },
        ],
    },

    // Level 6: Ta Varga (Hard)
    {
        id: 'alphabet-6',
        level: 6,
        title: 'Ta Family (Hard): ट ठ ड ढ ण',
        titleHindi: 'ट वर्ग: ट ठ ड ढ ण',
        description: 'Learn hard Ta consonants',
        icon: '💪',
        letters: ['c11', 'c12', 'c13', 'c14', 'c15'],
        estimatedMinutes: 15,
        unlocked: false,
        exercises: [
            {
                id: 'ex6-1',
                type: 'introduction',
                title: 'Hard T Sounds',
                instructions: 'Learn the hard T family',
                instructionsHindi: 'कठोर ट परिवार सीखो',
                data: { letters: ['c11', 'c12', 'c13', 'c14', 'c15'] },
            },
        ],
    },

    // Level 7: Ta Varga (Soft)
    {
        id: 'alphabet-7',
        level: 7,
        title: 'Ta Family (Soft): त थ द ध न',
        titleHindi: 'त वर्ग: त थ द ध न',
        description: 'Learn soft Ta consonants',
        icon: '🌸',
        letters: ['c16', 'c17', 'c18', 'c19', 'c20'],
        estimatedMinutes: 15,
        unlocked: false,
        exercises: [
            {
                id: 'ex7-1',
                type: 'introduction',
                title: 'Soft T Sounds',
                instructions: 'Learn the soft T family',
                instructionsHindi: 'कोमल त परिवार सीखो',
                data: { letters: ['c16', 'c17', 'c18', 'c19', 'c20'] },
            },
            {
                id: 'ex7-2',
                type: 'word-building',
                title: 'Build Words',
                instructions: 'Make words with soft T sounds',
                instructionsHindi: 'कोमल त से शब्द बनाओ',
                data: {
                    combinations: [
                        { consonant: 'c16', vowel: 'v2', word: 'ता', meaning: 'heat' },
                        { consonant: 'c18', vowel: 'v2', word: 'दा', meaning: 'give' },
                        { consonant: 'c20', vowel: 'v2', word: 'ना', meaning: 'no' },
                    ],
                },
            },
        ],
    },

    // Level 8: Pa Varga
    {
        id: 'alphabet-8',
        level: 8,
        title: 'Pa Family: प फ ब भ म',
        titleHindi: 'प वर्ग: प फ ब भ म',
        description: 'Learn the Pa family of consonants',
        icon: '🎨',
        letters: ['c21', 'c22', 'c23', 'c24', 'c25'],
        estimatedMinutes: 15,
        unlocked: false,
        exercises: [
            {
                id: 'ex8-1',
                type: 'introduction',
                title: 'Pa Family',
                instructions: 'Learn the Pa consonant family',
                instructionsHindi: 'प व्यंजन परिवार सीखो',
                data: { letters: ['c21', 'c22', 'c23', 'c24', 'c25'] },
            },
            {
                id: 'ex8-2',
                type: 'word-building',
                title: 'Create Words',
                instructions: 'Build words with Pa family',
                instructionsHindi: 'प परिवार से शब्द बनाओ',
                data: {
                    combinations: [
                        { consonant: 'c21', vowel: 'v2', word: 'पा', meaning: 'get' },
                        { consonant: 'c23', vowel: 'v2', word: 'बा', meaning: 'father (informal)' },
                        { consonant: 'c25', vowel: 'v2', word: 'मा', meaning: 'mother (informal)' },
                    ],
                },
            },
        ],
    },

    // Level 9: Ya Ra La Va
    {
        id: 'alphabet-9',
        level: 9,
        title: 'Special Letters: य र ल व',
        titleHindi: 'विशेष अक्षर: य र ल व',
        description: 'Learn special consonants',
        icon: '✨',
        letters: ['c26', 'c27', 'c28', 'c29'],
        estimatedMinutes: 12,
        unlocked: false,
        exercises: [
            {
                id: 'ex9-1',
                type: 'introduction',
                title: 'Special Sounds',
                instructions: 'Learn these important consonants',
                instructionsHindi: 'ये महत्वपूर्ण व्यंजन सीखो',
                data: { letters: ['c26', 'c27', 'c28', 'c29'] },
            },
            {
                id: 'ex9-2',
                type: 'reading',
                title: 'Read Simple Words',
                instructions: 'Practice reading words with these letters',
                instructionsHindi: 'इन अक्षरों से शब्द पढ़ो',
                data: {
                    words: [
                        { word: 'रथ', roman: 'rath', meaning: 'chariot' },
                        { word: 'लाल', roman: 'laal', meaning: 'red' },
                        { word: 'वन', roman: 'van', meaning: 'forest' },
                    ],
                },
            },
        ],
    },

    // Level 10: Sha Sa Ha
    {
        id: 'alphabet-10',
        level: 10,
        title: 'Final Letters: श ष स ह',
        titleHindi: 'अंतिम अक्षर: श ष स ह',
        description: 'Complete the Hindi alphabet',
        icon: '🏆',
        letters: ['c30', 'c31', 'c32', 'c33'],
        estimatedMinutes: 12,
        unlocked: false,
        exercises: [
            {
                id: 'ex10-1',
                type: 'introduction',
                title: 'Last Consonants',
                instructions: 'Learn the final consonants',
                instructionsHindi: 'आखिरी व्यंजन सीखो',
                data: { letters: ['c30', 'c31', 'c32', 'c33'] },
            },
            {
                id: 'ex10-2',
                type: 'reading',
                title: 'Read Words',
                instructions: 'Practice reading complete words',
                instructionsHindi: 'पूरे शब्द पढ़ने का अभ्यास करो',
                data: {
                    words: [
                        { word: 'शेर', roman: 'sher', meaning: 'lion' },
                        { word: 'सेब', roman: 'seb', meaning: 'apple' },
                        { word: 'हाथी', roman: 'haathi', meaning: 'elephant' },
                    ],
                },
            },
        ],
    },

    // Level 11: Combined Consonants
    {
        id: 'alphabet-11',
        level: 11,
        title: 'Combined Letters: क्ष त्र ज्ञ',
        titleHindi: 'संयुक्त अक्षर: क्ष त्र ज्ञ',
        description: 'Learn special combined consonants',
        icon: '🔗',
        letters: ['c34', 'c35', 'c36'],
        estimatedMinutes: 10,
        unlocked: false,
        exercises: [
            {
                id: 'ex11-1',
                type: 'introduction',
                title: 'Combined Sounds',
                instructions: 'Learn special letter combinations',
                instructionsHindi: 'विशेष अक्षर संयोजन सीखो',
                data: { letters: ['c34', 'c35', 'c36'] },
            },
        ],
    },

    // Level 12: Reading Practice
    {
        id: 'alphabet-12',
        level: 12,
        title: 'Reading Practice: Simple Words',
        titleHindi: 'पढ़ने का अभ्यास: आसान शब्द',
        description: 'Practice reading simple Hindi words',
        icon: '📚',
        letters: [],
        estimatedMinutes: 20,
        unlocked: false,
        exercises: [
            {
                id: 'ex12-1',
                type: 'reading',
                title: 'Read 2-Letter Words',
                instructions: 'Practice reading two-letter words',
                instructionsHindi: 'दो अक्षर के शब्द पढ़ो',
                data: {
                    words: [
                        { word: 'का', roman: 'kaa', meaning: 'of' },
                        { word: 'की', roman: 'kee', meaning: 'of (feminine)' },
                        { word: 'को', roman: 'ko', meaning: 'to' },
                        { word: 'ना', roman: 'naa', meaning: 'no' },
                        { word: 'मा', roman: 'maa', meaning: 'mother' },
                        { word: 'बा', roman: 'baa', meaning: 'father' },
                    ],
                },
            },
            {
                id: 'ex12-2',
                type: 'reading',
                title: 'Read 3-Letter Words',
                instructions: 'Practice reading three-letter words',
                instructionsHindi: 'तीन अक्षर के शब्द पढ़ो',
                data: {
                    words: [
                        { word: 'घर', roman: 'ghar', meaning: 'house' },
                        { word: 'जल', roman: 'jal', meaning: 'water' },
                        { word: 'फल', roman: 'phal', meaning: 'fruit' },
                        { word: 'हल', roman: 'hal', meaning: 'plow' },
                        { word: 'नल', roman: 'nal', meaning: 'tap' },
                    ],
                },
            },
        ],
    },

    // Level 13: Reading Sentences
    {
        id: 'alphabet-13',
        level: 13,
        title: 'Reading Practice: Sentences',
        titleHindi: 'पढ़ने का अभ्यास: वाक्य',
        description: 'Practice reading simple Hindi sentences',
        icon: '📝',
        letters: [],
        estimatedMinutes: 25,
        unlocked: false,
        exercises: [
            {
                id: 'ex13-1',
                type: 'reading',
                title: 'Read Simple Sentences',
                instructions: 'Practice reading complete sentences',
                instructionsHindi: 'पूरे वाक्य पढ़ने का अभ्यास करो',
                data: {
                    sentences: [
                        { sentence: 'मैं घर जाता हूँ।', roman: 'Main ghar jaata hoon.', meaning: 'I go home.' },
                        { sentence: 'यह मेरा घर है।', roman: 'Yah mera ghar hai.', meaning: 'This is my house.' },
                        { sentence: 'माँ खाना बनाती है।', roman: 'Maa khaana banaati hai.', meaning: 'Mother cooks food.' },
                        { sentence: 'बच्चे स्कूल जाते हैं।', roman: 'Bachche school jaate hain.', meaning: 'Children go to school.' },
                    ],
                },
            },
        ],
    },

    // Level 14: Story Reading
    {
        id: 'alphabet-14',
        level: 14,
        title: 'Story Time: Read Your First Story',
        titleHindi: 'कहानी का समय: अपनी पहली कहानी पढ़ो',
        description: 'Read a complete Hindi story',
        icon: '📖',
        letters: [],
        estimatedMinutes: 30,
        unlocked: false,
        exercises: [
            {
                id: 'ex14-1',
                type: 'reading',
                title: 'The Little Bird',
                instructions: 'Read this short story in Hindi',
                instructionsHindi: 'यह छोटी कहानी हिंदी में पढ़ो',
                data: {
                    story: {
                        title: 'छोटी चिड़िया',
                        titleRoman: 'Chhoti Chidiya',
                        titleEnglish: 'The Little Bird',
                        text: 'एक छोटी चिड़िया थी। वह पेड़ पर रहती थी। वह रोज गाना गाती थी। सब उसका गाना सुनते थे। सब बहुत खुश होते थे।',
                        textRoman: 'Ek chhoti chidiya thi. Vah ped par rahti thi. Vah roz gaana gaati thi. Sab uska gaana sunte the. Sab bahut khush hote the.',
                        textEnglish: 'There was a little bird. She lived on a tree. She sang every day. Everyone listened to her song. Everyone was very happy.',
                    },
                },
            },
        ],
    },
];

// Helper function to get letter by ID
export function getLetterById(id: string): HindiLetter | undefined {
    const allLetters = [...hindiVowels, ...hindiConsonants];
    return allLetters.find(letter => letter.id === id);
}

// Helper function to get lesson by ID
export function getLessonById(id: string): AlphabetLesson | undefined {
    return hindiAlphabetLessons.find(lesson => lesson.id === id);
}
