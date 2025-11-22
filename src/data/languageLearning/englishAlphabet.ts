
export interface EnglishLetter {
    id: string;
    letter: string;
    uppercase: string;
    lowercase: string;
    pronunciation: string; // e.g., "ए" for A
    hindi: string;
    kannada: string;
    examples: {
        word: string;
        hindi: string;
        kannada: string;
        image: string; // Emoji for now
    }[];
}

export interface EnglishLesson {
    id: string;
    title: string;
    titleHindi: string;
    titleKannada: string;
    description: string;
    letters: string[]; // IDs of letters in this lesson
    unlocked?: boolean;
    exercises: EnglishExercise[];
}

export interface EnglishExercise {
    id: string;
    type: 'introduction' | 'listen-repeat' | 'match' | 'quiz';
    title: string;
    instructions: string;
    instructionsHindi: string;
    instructionsKannada: string;
    data: any;
}

export const englishLetters: EnglishLetter[] = [
    {
        id: 'A',
        letter: 'Aa',
        uppercase: 'A',
        lowercase: 'a',
        pronunciation: 'ए',
        hindi: 'ए',
        kannada: 'ಎ',
        examples: [
            { word: 'Apple', hindi: 'सेब', kannada: 'ಸೇಬು', image: '🍎' },
            { word: 'Ant', hindi: 'चींटी', kannada: 'ಇರುವೆ', image: '🐜' },
            { word: 'Airplane', hindi: 'हवाई जहाज', kannada: 'ವಿಮಾನ', image: '✈️' }
        ]
    },
    {
        id: 'B',
        letter: 'Bb',
        uppercase: 'B',
        lowercase: 'b',
        pronunciation: 'बी',
        hindi: 'बी',
        kannada: 'ಬಿ',
        examples: [
            { word: 'Ball', hindi: 'गेंद', kannada: 'ಚೆಂಡು', image: '⚽' },
            { word: 'Bat', hindi: 'बल्ला', kannada: 'ಬ್ಯಾಟ್', image: '🏏' },
            { word: 'Boy', hindi: 'लड़का', kannada: 'ಹುಡುಗ', image: '👦' }
        ]
    },
    {
        id: 'C',
        letter: 'Cc',
        uppercase: 'C',
        lowercase: 'c',
        pronunciation: 'सी',
        hindi: 'सी',
        kannada: 'ಸಿ',
        examples: [
            { word: 'Cat', hindi: 'बिल्ली', kannada: 'ಬೆಕ್ಕು', image: '🐱' },
            { word: 'Car', hindi: 'गाड़ी', kannada: 'ಕಾರು', image: '🚗' },
            { word: 'Cup', hindi: 'प्याला', kannada: 'ಕಪ್', image: '☕' }
        ]
    },
    {
        id: 'D',
        letter: 'Dd',
        uppercase: 'D',
        lowercase: 'd',
        pronunciation: 'डी',
        hindi: 'डी',
        kannada: 'ಡಿ',
        examples: [
            { word: 'Dog', hindi: 'कुत्ता', kannada: 'ನಾಯಿ', image: '🐶' },
            { word: 'Doll', hindi: 'गुड़िया', kannada: 'ಗೊಂಬೆ', image: '🎎' },
            { word: 'Duck', hindi: 'बत्तख', kannada: 'ಬಾತುಕೋಳಿ', image: '🦆' }
        ]
    },
    {
        id: 'E',
        letter: 'Ee',
        uppercase: 'E',
        lowercase: 'e',
        pronunciation: 'ई',
        hindi: 'ई',
        kannada: 'ಇ',
        examples: [
            { word: 'Elephant', hindi: 'हाथी', kannada: 'ಆನೆ', image: '🐘' },
            { word: 'Egg', hindi: 'अंडा', kannada: 'ಮೊಟ್ಟೆ', image: '🥚' },
            { word: 'Eye', hindi: 'आंख', kannada: 'ಕಣ್ಣು', image: '👁️' }
        ]
    },
    {
        id: 'F',
        letter: 'Ff',
        uppercase: 'F',
        lowercase: 'f',
        pronunciation: 'एफ',
        hindi: 'एफ',
        kannada: 'ಎಫ್',
        examples: [
            { word: 'Fish', hindi: 'मछली', kannada: 'ಮೀನು', image: '🐟' },
            { word: 'Fan', hindi: 'पंखा', kannada: 'ಪಂಖಾ', image: '🌀' },
            { word: 'Flower', hindi: 'फूल', kannada: 'ಹೂವು', image: '🌸' }
        ]
    },
    {
        id: 'G',
        letter: 'Gg',
        uppercase: 'G',
        lowercase: 'g',
        pronunciation: 'जी',
        hindi: 'जी',
        kannada: 'ಜಿ',
        examples: [
            { word: 'Grapes', hindi: 'अंगूर', kannada: 'ದ್ರಾಕ್ಷಿ', image: '🍇' },
            { word: 'Goat', hindi: 'बकरी', kannada: 'ಮೇಕೆ', image: '🐐' },
            { word: 'Girl', hindi: 'लड़की', kannada: 'ಹುಡುಗಿ', image: '👧' }
        ]
    },
    {
        id: 'H',
        letter: 'Hh',
        uppercase: 'H',
        lowercase: 'h',
        pronunciation: 'एच',
        hindi: 'एच',
        kannada: 'ಎಚ್',
        examples: [
            { word: 'House', hindi: 'घर', kannada: 'ಮನೆ', image: '🏠' },
            { word: 'Hat', hindi: 'टोपी', kannada: 'ಟೋಪಿ', image: '🎩' },
            { word: 'Hen', hindi: 'मुर्गी', kannada: 'ಕೋಳಿ', image: '🐔' }
        ]
    },
    {
        id: 'I',
        letter: 'Ii',
        uppercase: 'I',
        lowercase: 'i',
        pronunciation: 'आई',
        hindi: 'आई',
        kannada: 'ಐ',
        examples: [
            { word: 'Ice Cream', hindi: 'आइसक्रीम', kannada: 'ಐಸ್ ಕ್ರೀಮ್', image: '🍦' },
            { word: 'Igloo', hindi: 'इग्लू', kannada: 'ಇಗ್ಲೂ', image: '🏠' },
            { word: 'Ink', hindi: 'स्याही', kannada: 'ಶಾಯಿ', image: '✒️' }
        ]
    },
    {
        id: 'J',
        letter: 'Jj',
        uppercase: 'J',
        lowercase: 'j',
        pronunciation: 'जे',
        hindi: 'जे',
        kannada: 'ಜೆ',
        examples: [
            { word: 'Jug', hindi: 'जग', kannada: 'ಜಗ್', image: '🏺' },
            { word: 'Joker', hindi: 'जोकर', kannada: 'ಜೋಕರ್', image: '🤡' },
            { word: 'Jeep', hindi: 'जीप', kannada: 'ಜೀಪ್', image: '🚙' }
        ]
    },
    {
        id: 'K',
        letter: 'Kk',
        uppercase: 'K',
        lowercase: 'k',
        pronunciation: 'के',
        hindi: 'के',
        kannada: 'ಕೆ',
        examples: [
            { word: 'Kite', hindi: 'पतंग', kannada: 'ಗಾಳಿಪಟ', image: '🪁' },
            { word: 'Key', hindi: 'चाबी', kannada: 'ಕೀ', image: '🔑' },
            { word: 'King', hindi: 'राजा', kannada: 'ರಾಜ', image: '👑' }
        ]
    },
    {
        id: 'L',
        letter: 'Ll',
        uppercase: 'L',
        lowercase: 'l',
        pronunciation: 'एल',
        hindi: 'एल',
        kannada: 'ಎಲ್',
        examples: [
            { word: 'Lion', hindi: 'शेर', kannada: 'ಸಿಂಹ', image: '🦁' },
            { word: 'Leaf', hindi: 'पत्ता', kannada: 'ಎಲೆ', image: '🍃' },
            { word: 'Lamp', hindi: 'दीपक', kannada: 'ದೀಪ', image: '💡' }
        ]
    },
    {
        id: 'M',
        letter: 'Mm',
        uppercase: 'M',
        lowercase: 'm',
        pronunciation: 'एम',
        hindi: 'एम',
        kannada: 'ಎಂ',
        examples: [
            { word: 'Mango', hindi: 'आम', kannada: 'ಮಾವಿನಹಣ್ಣು', image: '🥭' },
            { word: 'Moon', hindi: 'चांद', kannada: 'ಚಂದ್ರ', image: '🌙' },
            { word: 'Monkey', hindi: 'बंदर', kannada: 'ಮಂಗ', image: '🐒' }
        ]
    },
    {
        id: 'N',
        letter: 'Nn',
        uppercase: 'N',
        lowercase: 'n',
        pronunciation: 'एन',
        hindi: 'एन',
        kannada: 'ಎನ್',
        examples: [
            { word: 'Nest', hindi: 'घोंसला', kannada: 'ಗೂಡು', image: '🪺' },
            { word: 'Net', hindi: 'जाल', kannada: 'ಬಲೆ', image: '🕸️' },
            { word: 'Nose', hindi: 'नाक', kannada: 'ಮೂಗು', image: '👃' }
        ]
    },
    {
        id: 'O',
        letter: 'Oo',
        uppercase: 'O',
        lowercase: 'o',
        pronunciation: 'ओ',
        hindi: 'ओ',
        kannada: 'ಓ',
        examples: [
            { word: 'Orange', hindi: 'संतरा', kannada: 'ಕಿತ್ತಳೆ', image: '🍊' },
            { word: 'Owl', hindi: 'उल्लू', kannada: 'ಗೂಬೆ', image: '🦉' },
            { word: 'Octopus', hindi: 'ऑक्टोपस', kannada: 'ಆಕ್ಟೋಪಸ್', image: '🐙' }
        ]
    },
    {
        id: 'P',
        letter: 'Pp',
        uppercase: 'P',
        lowercase: 'p',
        pronunciation: 'पी',
        hindi: 'पी',
        kannada: 'ಪಿ',
        examples: [
            { word: 'Parrot', hindi: 'तोता', kannada: 'ಗಿಳಿ', image: '🦜' },
            { word: 'Pen', hindi: 'कलम', kannada: 'ಪೆನ್', image: '🖊️' },
            { word: 'Pencil', hindi: 'पेंसिल', kannada: 'ಪೆನ್ಸಿಲ್', image: '✏️' }
        ]
    },
    {
        id: 'Q',
        letter: 'Qq',
        uppercase: 'Q',
        lowercase: 'q',
        pronunciation: 'क्यू',
        hindi: 'क्यू',
        kannada: 'ಕ್ಯೂ',
        examples: [
            { word: 'Queen', hindi: 'रानी', kannada: 'ರಾಣಿ', image: '👸' },
            { word: 'Quilt', hindi: 'रजाई', kannada: 'ಹೊದಿಕೆ', image: '🛌' },
            { word: 'Queue', hindi: 'कतार', kannada: 'ಸರತಿ ಸಾಲು', image: '🚶' }
        ]
    },
    {
        id: 'R',
        letter: 'Rr',
        uppercase: 'R',
        lowercase: 'r',
        pronunciation: 'आर',
        hindi: 'आर',
        kannada: 'ಆರ್',
        examples: [
            { word: 'Rose', hindi: 'गुलाब', kannada: 'ಗುಲಾಬಿ', image: '🌹' },
            { word: 'Rat', hindi: 'चूहा', kannada: 'ಇಲಿ', image: '🐀' },
            { word: 'Rabbit', hindi: 'खरगोश', kannada: 'ಮೊಲ', image: '🐇' }
        ]
    },
    {
        id: 'S',
        letter: 'Ss',
        uppercase: 'S',
        lowercase: 's',
        pronunciation: 'एस',
        hindi: 'एस',
        kannada: 'ಎಸ್',
        examples: [
            { word: 'Sun', hindi: 'सूरज', kannada: 'ಸೂರ್ಯ', image: '☀️' },
            { word: 'Star', hindi: 'तारा', kannada: 'ನಕ್ಷತ್ರ', image: '⭐' },
            { word: 'Snake', hindi: 'सांप', kannada: 'ಹಾವು', image: '🐍' }
        ]
    },
    {
        id: 'T',
        letter: 'Tt',
        uppercase: 'T',
        lowercase: 't',
        pronunciation: 'टी',
        hindi: 'टी',
        kannada: 'ಟಿ',
        examples: [
            { word: 'Tiger', hindi: 'बाघ', kannada: 'ಹುಲಿ', image: '🐅' },
            { word: 'Tree', hindi: 'पेड़', kannada: 'ಮರ', image: '🌳' },
            { word: 'Table', hindi: 'मेज़', kannada: 'ಮೇಜು', image: '🪑' }
        ]
    },
    {
        id: 'U',
        letter: 'Uu',
        uppercase: 'U',
        lowercase: 'u',
        pronunciation: 'यू',
        hindi: 'यू',
        kannada: 'ಯು',
        examples: [
            { word: 'Umbrella', hindi: 'छाता', kannada: 'ಕೊಡೆ', image: '☂️' },
            { word: 'Uniform', hindi: 'वर्दी', kannada: 'ಸಮವಸ್ತ್ರ', image: '👔' },
            { word: 'Unicorn', hindi: 'एक तंगावाला', kannada: 'ಯುನಿಕಾರ್ನ್', image: '🦄' }
        ]
    },
    {
        id: 'V',
        letter: 'Vv',
        uppercase: 'V',
        lowercase: 'v',
        pronunciation: 'वी',
        hindi: 'वी',
        kannada: 'ವಿ',
        examples: [
            { word: 'Van', hindi: 'वैन', kannada: 'ವ್ಯಾನ್', image: '🚐' },
            { word: 'Violin', hindi: 'वायलिन', kannada: 'ಪಿಟೀಲು', image: '🎻' },
            { word: 'Vase', hindi: 'फूलदान', kannada: 'ಹೂದಾನಿ', image: '🏺' }
        ]
    },
    {
        id: 'W',
        letter: 'Ww',
        uppercase: 'W',
        lowercase: 'w',
        pronunciation: 'डब्लू',
        hindi: 'डब्लू',
        kannada: 'ಡಬ್ಲ್ಯೂ',
        examples: [
            { word: 'Watch', hindi: 'घड़ी', kannada: 'ಗಡಿಯಾರ', image: '⌚' },
            { word: 'Watermelon', hindi: 'तरबूज', kannada: 'ಕಲ್ಲಂಗಡಿ', image: '🍉' },
            { word: 'Wheel', hindi: 'पहिया', kannada: 'ಚಕ್ರ', image: '🎡' }
        ]
    },
    {
        id: 'X',
        letter: 'Xx',
        uppercase: 'X',
        lowercase: 'x',
        pronunciation: 'एक्स',
        hindi: 'एक्स',
        kannada: 'ಎಕ್ಸ್',
        examples: [
            { word: 'X-ray', hindi: 'एक्स-रे', kannada: 'ಎಕ್ಸ್-ರೇ', image: '🦴' },
            { word: 'Xylophone', hindi: 'ज़ाइलोफ़ोन', kannada: 'ಕ್ಸೈಲೋಫೋನ್', image: '🎹' },
            { word: 'X-mas Tree', hindi: 'क्रिसमस ट्री', kannada: 'ಕ್ರಿಸ್ಮಸ್ ಮರ', image: '🎄' }
        ]
    },
    {
        id: 'Y',
        letter: 'Yy',
        uppercase: 'Y',
        lowercase: 'y',
        pronunciation: 'वाई',
        hindi: 'वाई',
        kannada: 'ವೈ',
        examples: [
            { word: 'Yak', hindi: 'याक', kannada: 'ಯಾಕ್', image: '🐂' },
            { word: 'Yo-yo', hindi: 'यो-यो', kannada: 'ಯೋ-ಯೋ', image: '🪀' },
            { word: 'Yellow', hindi: 'पीला', kannada: 'ಹಳದಿ', image: '🟡' }
        ]
    },
    {
        id: 'Z',
        letter: 'Zz',
        uppercase: 'Z',
        lowercase: 'z',
        pronunciation: 'जेड',
        hindi: 'जेड',
        kannada: 'ಝಡ್',
        examples: [
            { word: 'Zebra', hindi: 'जेबरा', kannada: 'ಜೀಬ್ರಾ', image: '🦓' },
            { word: 'Zip', hindi: 'ज़िप', kannada: 'ಜಿಪ್', image: '🤐' },
            { word: 'Zoo', hindi: 'चिड़ियाघर', kannada: 'ಮೃಗಾಲಯ', image: '🦁' }
        ]
    }
];

// Helper to get letter by ID
export const getEnglishLetterById = (id: string) => englishLetters.find(l => l.id === id);

// Create lessons
const createAlphabetLesson = (id: string, title: string, titleHindi: string, letters: string[]): EnglishLesson => {
    return {
        id,
        title,
        titleHindi,
        titleKannada: title, // Placeholder
        description: `Learn letters ${letters.join(', ')}`,
        letters,
        exercises: [
            {
                id: `${id}-intro`,
                type: 'introduction',
                title: 'Meet the Letters',
                instructions: 'Listen and repeat each letter',
                instructionsHindi: 'प्रत्येक अक्षर को सुनें और दोहराएं',
                instructionsKannada: 'ಪ್ರತಿ ಅಕ್ಷರವನ್ನು ಆಲಿಸಿ ಮತ್ತು ಪುನರಾವರ್ತಿಸಿ',
                data: { letters }
            },
            {
                id: `${id}-listen`,
                type: 'listen-repeat',
                title: 'Listen & Practice',
                instructions: 'Tap to listen and practice saying the letters',
                instructionsHindi: 'सुनने और बोलने का अभ्यास करने के लिए टैप करें',
                instructionsKannada: 'ಕೇಳಲು ಮತ್ತು ಅಭ್ಯಾಸ ಮಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ',
                data: { letters }
            },
            {
                id: `${id}-match`,
                type: 'match',
                title: 'Match Letters',
                instructions: 'Match the letter to the correct picture',
                instructionsHindi: 'अक्षर को सही चित्र से मिलाएं',
                instructionsKannada: 'ಅಕ್ಷರವನ್ನು ಸರಿಯಾದ ಚಿತ್ರದೊಂದಿಗೆ ಹೊಂದಿಸಿ',
                data: {
                    pairs: letters.map(l => {
                        const letter = getEnglishLetterById(l);
                        return {
                            letter: l,
                            image: letter?.examples[0].image,
                            word: letter?.examples[0].word
                        };
                    })
                }
            },
            {
                id: `${id}-quiz`,
                type: 'quiz',
                title: 'Quick Quiz',
                instructions: 'Identify the correct letter',
                instructionsHindi: 'सही अक्षर पहचानें',
                instructionsKannada: 'ಸರಿಯಾದ ಅಕ್ಷರವನ್ನು ಗುರುತಿಸಿ',
                data: { letters }
            }
        ]
    };
};

export const englishLessonsNew: EnglishLesson[] = [
    createAlphabetLesson('eng-1', 'Letters A-E', 'अक्षर A-E', ['A', 'B', 'C', 'D', 'E']),
    createAlphabetLesson('eng-2', 'Letters F-J', 'अक्षर F-J', ['F', 'G', 'H', 'I', 'J']),
    createAlphabetLesson('eng-3', 'Letters K-O', 'अक्षर K-O', ['K', 'L', 'M', 'N', 'O']),
    createAlphabetLesson('eng-4', 'Letters P-T', 'अक्षर P-T', ['P', 'Q', 'R', 'S', 'T']),
    createAlphabetLesson('eng-5', 'Letters U-Z', 'अक्षर U-Z', ['U', 'V', 'W', 'X', 'Y', 'Z']),
];

export const getEnglishLessonById = (id: string) => englishLessonsNew.find(l => l.id === id);
