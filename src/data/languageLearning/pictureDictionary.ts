/**
 * PICTURE DICTIONARY DATA
 * Visual glossary for non-readers
 */

export interface DictionaryCategory {
    id: string;
    name: string;
    nameHindi: string;
    icon: string;
    items: DictionaryItem[];
}

export interface DictionaryItem {
    id: string;
    picture: string;
    english: string;
    hindi: string;
    kannada?: string;
    audioEnglish: string;
    audioHindi: string;
    audioKannada?: string;
}

export const pictureDictionary: DictionaryCategory[] = [
    {
        id: 'animals',
        name: 'Animals',
        nameHindi: 'जानवर',
        icon: '🐾',
        items: [
            {
                id: 'animal-1',
                picture: '/images/vocabulary/cat.png',
                english: 'Cat',
                hindi: 'बिल्ली',
                kannada: 'ಬೆಕ್ಕು',
                audioEnglish: '/audio/english/cat.mp3',
                audioHindi: '/audio/hindi/billi.mp3',
                audioKannada: '/audio/kannada/bekku.mp3'
            },
            {
                id: 'animal-2',
                picture: '/images/vocabulary/dog.png',
                english: 'Dog',
                hindi: 'कुत्ता',
                kannada: 'ನಾಯಿ',
                audioEnglish: '/audio/english/dog.mp3',
                audioHindi: '/audio/hindi/kutta.mp3',
                audioKannada: '/audio/kannada/nayi.mp3'
            },
            {
                id: 'animal-3',
                picture: '/images/vocabulary/cow.png',
                english: 'Cow',
                hindi: 'गाय',
                kannada: 'ಹಸು',
                audioEnglish: '/audio/english/cow.mp3',
                audioHindi: '/audio/hindi/gaay.mp3',
                audioKannada: '/audio/kannada/hasu.mp3'
            },
            {
                id: 'animal-4',
                picture: '/images/vocabulary/bird.png',
                english: 'Bird',
                hindi: 'पक्षी',
                kannada: 'ಹಕ್ಕಿ',
                audioEnglish: '/audio/english/bird.mp3',
                audioHindi: '/audio/hindi/pakshi.mp3',
                audioKannada: '/audio/kannada/hakki.mp3'
            },
            {
                id: 'animal-5',
                picture: '/images/vocabulary/elephant.png',
                english: 'Elephant',
                hindi: 'हाथी',
                kannada: 'ಆನೆ',
                audioEnglish: '/audio/english/elephant.mp3',
                audioHindi: '/audio/hindi/haathi.mp3',
                audioKannada: '/audio/kannada/aane.mp3'
            }
        ]
    },
    {
        id: 'food',
        name: 'Food',
        nameHindi: 'खाना',
        icon: '🍎',
        items: [
            {
                id: 'food-1',
                picture: '/images/vocabulary/apple.png',
                english: 'Apple',
                hindi: 'सेब',
                kannada: 'ಸೇಬು',
                audioEnglish: '/audio/english/apple.mp3',
                audioHindi: '/audio/hindi/seb.mp3',
                audioKannada: '/audio/kannada/sebu.mp3'
            },
            {
                id: 'food-2',
                picture: '/images/vocabulary/banana.png',
                english: 'Banana',
                hindi: 'केला',
                kannada: 'ಬಾಳೆ',
                audioEnglish: '/audio/english/banana.mp3',
                audioHindi: '/audio/hindi/kela.mp3',
                audioKannada: '/audio/kannada/baale.mp3'
            },
            {
                id: 'food-3',
                picture: '/images/vocabulary/rice.png',
                english: 'Rice',
                hindi: 'चावल',
                kannada: 'ಅಕ್ಕಿ',
                audioEnglish: '/audio/english/rice.mp3',
                audioHindi: '/audio/hindi/chaaval.mp3',
                audioKannada: '/audio/kannada/akki.mp3'
            },
            {
                id: 'food-4',
                picture: '/images/vocabulary/water.png',
                english: 'Water',
                hindi: 'पानी',
                kannada: 'ನೀರು',
                audioEnglish: '/audio/english/water.mp3',
                audioHindi: '/audio/hindi/paani.mp3',
                audioKannada: '/audio/kannada/neeru.mp3'
            },
            {
                id: 'food-5',
                picture: '/images/vocabulary/bread.png',
                english: 'Bread',
                hindi: 'रोटी',
                kannada: 'ರೊಟ್ಟಿ',
                audioEnglish: '/audio/english/bread.mp3',
                audioHindi: '/audio/hindi/roti.mp3',
                audioKannada: '/audio/kannada/rotti.mp3'
            }
        ]
    },
    {
        id: 'school',
        name: 'School',
        nameHindi: 'स्कूल',
        icon: '📚',
        items: [
            {
                id: 'school-1',
                picture: '/images/vocabulary/book.png',
                english: 'Book',
                hindi: 'किताब',
                kannada: 'ಪುಸ್ತಕ',
                audioEnglish: '/audio/english/book.mp3',
                audioHindi: '/audio/hindi/kitaab.mp3',
                audioKannada: '/audio/kannada/pustaka.mp3'
            },
            {
                id: 'school-2',
                picture: '/images/vocabulary/pencil.png',
                english: 'Pencil',
                hindi: 'पेंसिल',
                kannada: 'ಪೆನ್ಸಿಲ್',
                audioEnglish: '/audio/english/pencil.mp3',
                audioHindi: '/audio/hindi/pencil.mp3',
                audioKannada: '/audio/kannada/pencil.mp3'
            },
            {
                id: 'school-3',
                picture: '/images/vocabulary/bag.png',
                english: 'Bag',
                hindi: 'बैग',
                kannada: 'ಚೀಲ',
                audioEnglish: '/audio/english/bag.mp3',
                audioHindi: '/audio/hindi/bag.mp3',
                audioKannada: '/audio/kannada/cheela.mp3'
            },
            {
                id: 'school-4',
                picture: '/images/vocabulary/teacher.png',
                english: 'Teacher',
                hindi: 'शिक्षक',
                kannada: 'ಶಿಕ್ಷಕ',
                audioEnglish: '/audio/english/teacher.mp3',
                audioHindi: '/audio/hindi/shikshak.mp3',
                audioKannada: '/audio/kannada/shikshaka.mp3'
            }
        ]
    },
    {
        id: 'home',
        name: 'Home Items',
        nameHindi: 'घर की वस्तुएं',
        icon: '🏠',
        items: [
            {
                id: 'home-1',
                picture: '/images/vocabulary/chair.png',
                english: 'Chair',
                hindi: 'कुर्सी',
                kannada: 'ಕುರ್ಚಿ',
                audioEnglish: '/audio/english/chair.mp3',
                audioHindi: '/audio/hindi/kursi.mp3',
                audioKannada: '/audio/kannada/kurchi.mp3'
            },
            {
                id: 'home-2',
                picture: '/images/vocabulary/table.png',
                english: 'Table',
                hindi: 'मेज़',
                kannada: 'ಮೇಜು',
                audioEnglish: '/audio/english/table.mp3',
                audioHindi: '/audio/hindi/mez.mp3',
                audioKannada: '/audio/kannada/meju.mp3'
            },
            {
                id: 'home-3',
                picture: '/images/vocabulary/bed.png',
                english: 'Bed',
                hindi: 'बिस्तर',
                kannada: 'ಹಾಸಿಗೆ',
                audioEnglish: '/audio/english/bed.mp3',
                audioHindi: '/audio/hindi/bistar.mp3',
                audioKannada: '/audio/kannada/haasige.mp3'
            },
            {
                id: 'home-4',
                picture: '/images/vocabulary/door.png',
                english: 'Door',
                hindi: 'दरवाज़ा',
                kannada: 'ಬಾಗಿಲು',
                audioEnglish: '/audio/english/door.mp3',
                audioHindi: '/audio/hindi/darwaaza.mp3',
                audioKannada: '/audio/kannada/baagilu.mp3'
            }
        ]
    }
];
