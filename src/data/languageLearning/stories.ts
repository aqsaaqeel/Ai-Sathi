/**
 * STORY MODE DATA
 * Short offline stories with audio narration
 */

export interface Story {
    id: string;
    title: string;
    titleHindi: string;
    level: number;
    language: 'hindi' | 'english' | 'bilingual';
    text: string;
    textHindi?: string;
    words: StoryWord[];
    illustration: string;
    audio: string;
    audioHindi?: string;
    vocabulary: string[]; // IDs of vocab words featured in this story
}

export interface StoryWord {
    word: string;
    start: number; // character position in text
    end: number;
    meaning?: string;
    meaningHindi?: string;
    audio?: string;
}

export const stories: Story[] = [
    {
        id: 'story-1',
        title: 'The Little Cat',
        titleHindi: 'छोटी बिल्ली',
        level: 1,
        language: 'english',
        text: 'A little cat sat on a mat. The cat was black. The cat saw a ball. The cat played with the ball. The cat was happy.',
        textHindi: 'एक छोटी बिल्ली चटाई पर बैठी थी। बिल्ली काली थी। बिल्ली ने एक गेंद देखी। बिल्ली गेंद के साथ खेली। बिल्ली खुश थी।',
        words: [
            { word: 'cat', start: 9, end: 12, meaning: 'a small furry animal', meaningHindi: 'बिल्ली', audio: '/audio/english/cat.mp3' },
            { word: 'mat', start: 22, end: 25, meaning: 'a small rug', meaningHindi: 'चटाई', audio: '/audio/english/mat.mp3' },
            { word: 'ball', start: 56, end: 60, meaning: 'a round toy', meaningHindi: 'गेंद', audio: '/audio/english/ball.mp3' },
        ],
        illustration: '/images/stories/little-cat.png',
        audio: '/audio/stories/little-cat-en.mp3',
        audioHindi: '/audio/stories/little-cat-hi.mp3',
        vocabulary: ['e1', 'e4']
    },
    {
        id: 'story-2',
        title: 'My Family',
        titleHindi: 'मेरा परिवार',
        level: 1,
        language: 'hindi',
        text: 'मेरा नाम राज है। मेरे परिवार में पाँच लोग हैं। मेरे माँ, पिता, भाई, बहन और मैं। हम सब साथ रहते हैं। हम खुश हैं।',
        textHindi: 'मेरा नाम राज है। मेरे परिवार में पाँच लोग हैं। मेरे माँ, पिता, भाई, बहन और मैं। हम सब साथ रहते हैं। हम खुश हैं।',
        words: [
            { word: 'परिवार', start: 16, end: 22, meaning: 'family', meaningHindi: 'परिवार', audio: '/audio/hindi/parivaar.mp3' },
            { word: 'माँ', start: 41, end: 44, meaning: 'mother', meaningHindi: 'माँ', audio: '/audio/hindi/maa.mp3' },
            { word: 'पिता', start: 46, end: 50, meaning: 'father', meaningHindi: 'पिता', audio: '/audio/hindi/pita.mp3' },
        ],
        illustration: '/images/stories/my-family.png',
        audio: '/audio/stories/my-family-hi.mp3',
        vocabulary: ['h15', 'h16', 'h17', 'h18']
    },
    {
        id: 'story-3',
        title: 'The Sun and the Tree',
        titleHindi: 'सूरज और पेड़',
        level: 2,
        language: 'bilingual',
        text: 'The sun is bright. सूरज चमकीला है। A big tree stands tall. एक बड़ा पेड़ ऊंचा खड़ा है। Birds sit on the tree. पक्षी पेड़ पर बैठे हैं।',
        textHindi: 'सूरज चमकीला है। एक बड़ा पेड़ ऊंचा खड़ा है। पक्षी पेड़ पर बैठे हैं।',
        words: [
            { word: 'sun', start: 4, end: 7, meaning: 'the star at the center of our solar system', meaningHindi: 'सूरज', audio: '/audio/english/sun.mp3' },
            { word: 'tree', start: 42, end: 46, meaning: 'a tall plant with a trunk', meaningHindi: 'पेड़', audio: '/audio/english/tree.mp3' },
        ],
        illustration: '/images/stories/sun-tree.png',
        audio: '/audio/stories/sun-tree-en.mp3',
        audioHindi: '/audio/stories/sun-tree-hi.mp3',
        vocabulary: ['e3', 'e6']
    },
    {
        id: 'story-4',
        title: 'Going to School',
        titleHindi: 'स्कूल जाना',
        level: 2,
        language: 'english',
        text: 'I wake up early. I brush my teeth. I eat breakfast. I wear my uniform. I take my bag. I go to school. I meet my friends. I am happy.',
        textHindi: 'मैं जल्दी उठता हूं। मैं अपने दांत साफ करता हूं। मैं नाश्ता करता हूं। मैं अपनी वर्दी पहनता हूं। मैं अपना बैग लेता हूं। मैं स्कूल जाता हूं। मैं अपने दोस्तों से मिलता हूं। मैं खुश हूं।',
        words: [
            { word: 'school', start: 78, end: 84, meaning: 'a place where children learn', meaningHindi: 'स्कूल', audio: '/audio/english/school.mp3' },
            { word: 'bag', start: 62, end: 65, meaning: 'something to carry books', meaningHindi: 'बैग', audio: '/audio/english/bag.mp3' },
        ],
        illustration: '/images/stories/going-to-school.png',
        audio: '/audio/stories/going-to-school-en.mp3',
        audioHindi: '/audio/stories/going-to-school-hi.mp3',
        vocabulary: ['e10', 'e5']
    },
    {
        id: 'story-5',
        title: 'Counting Fun',
        titleHindi: 'गिनती का मज़ा',
        level: 1,
        language: 'hindi',
        text: 'एक सेब, दो केले, तीन आम। मुझे फल पसंद हैं। चार किताबें, पाँच पेंसिलें। मैं पढ़ना पसंद करता हूं।',
        textHindi: 'एक सेब, दो केले, तीन आम। मुझे फल पसंद हैं। चार किताबें, पाँच पेंसिलें। मैं पढ़ना पसंद करता हूं।',
        words: [
            { word: 'एक', start: 0, end: 2, meaning: 'one', meaningHindi: 'एक', audio: '/audio/hindi/ek.mp3' },
            { word: 'दो', start: 9, end: 11, meaning: 'two', meaningHindi: 'दो', audio: '/audio/hindi/do.mp3' },
            { word: 'तीन', start: 18, end: 22, meaning: 'three', meaningHindi: 'तीन', audio: '/audio/hindi/teen.mp3' },
        ],
        illustration: '/images/stories/counting-fun.png',
        audio: '/audio/stories/counting-fun-hi.mp3',
        vocabulary: ['h5', 'h6', 'h7', 'h8', 'h9']
    },
    {
        id: 'story-6',
        title: 'The Helpful Dog',
        titleHindi: 'मददगार कुत्ता',
        level: 2,
        language: 'english',
        text: 'Max is a dog. Max is brown. Max helps his family. Max brings the newspaper. Max guards the house. Max is a good dog. Everyone loves Max.',
        textHindi: 'मैक्स एक कुत्ता है। मैक्स भूरा है। मैक्स अपने परिवार की मदद करता है। मैक्स अखबार लाता है। मैक्स घर की रखवाली करता है। मैक्स एक अच्छा कुत्ता है। सभी मैक्स से प्यार करते हैं।',
        words: [
            { word: 'dog', start: 9, end: 12, meaning: 'a four-legged pet animal', meaningHindi: 'कुत्ता', audio: '/audio/english/dog.mp3' },
            { word: 'house', start: 80, end: 85, meaning: 'a building where people live', meaningHindi: 'घर', audio: '/audio/english/house.mp3' },
        ],
        illustration: '/images/stories/helpful-dog.png',
        audio: '/audio/stories/helpful-dog-en.mp3',
        audioHindi: '/audio/stories/helpful-dog-hi.mp3',
        vocabulary: ['e2', 'e9']
    }
];
