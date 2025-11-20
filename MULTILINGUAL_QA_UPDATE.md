# Multilingual & Q&A Features Update

## 🎯 Overview

This update adds three major enhancements to AI-Sathi:
1. **Expanded Science Content** - Now matching Maths with 7+ complete lessons
2. **Kannada Language Support** - Third language option for Karnataka students
3. **Ask Question Feature** - Students can ask questions during card learning

## ✨ What's New

### 1. Comprehensive Science Content

**Previous State:** 1 basic lesson (3 cards)  
**Current State:** 7 complete lessons across 4 chapters (30+ cards)

#### New Science Chapters & Lessons:

**Chapter: The Human Body** (2 lessons)
- ✅ **Our Body Parts** (5 cards) - Eyes, hands, nose, counting fingers
- ✅ **How We Digest Food** (4 cards) - Mouth → Stomach → Intestines, chewing tips

**Chapter: Plants Around Us** (2 lessons)
- ✅ **Parts of a Plant** (5 cards) - Roots, stem, leaves, flowers, photosynthesis
- ✅ **How Plants Grow** (4 cards) - Seed → Sprout → Plant, needs (water, sun, soil)

**Chapter: Animal Life** (1 lesson)
- ✅ **Types of Animals** (5 cards) - Domestic vs Wild, habitats, examples

**Chapter: Weather and Climate** (1 lesson)
- ✅ **The Four Seasons** (5 cards) - Summer, Winter, Monsoon, Spring with Indian context

**Total:** 7 lessons, 28 cards with practice questions, all using rural India context (farming, local animals, village life)

### 2. Kannada Language Support

Added Kannada as the third language option alongside Hindi and English.

#### Updated Files:
- ✅ `src/pages/LanguageOnboarding.tsx` - Added Kannada button with ಕನ್ನಡ script
- ✅ `src/contexts/LanguageContext.tsx` - Already supported 'kn' type
- ✅ `src/hooks/useAudioPlayer.ts` - Added kn-IN for TTS (Text-to-Speech)

#### Language Onboarding Screen:
```
┌─────────────────────────────┐
│  Select Your Language       │
│  अपनी भाषा चुनें | ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ │
├─────────────────────────────┤
│  🇮🇳 हिंदी         [🔊]     │
│  🇮🇳 ಕನ್ನಡ         [🔊]     │
│  🇬🇧 English       [🔊]     │
└─────────────────────────────┘
```

#### Kannada Translations Added:

**UI Elements:**
- Back: "ಹಿಂದೆ"
- Continue: "ಮುಂದುವರಿಸಿ"
- Previous: "ಹಿಂದಿನ"
- Next: "ಮುಂದಿನ"
- Check Answer: "ಉತ್ತರ ಪರೀಕ್ಷಿಸಿ"
- Finish Lesson: "ಪಾಠ ಮುಗಿಸಿ"
- Ask a Question: "ಪ್ರಶ್ನೆ ಕೇಳಿ 💭"
- Get Answer: "ಉತ್ತರ ಪಡೆಯಿರಿ"
- Your Question: "ನಿಮ್ಮ ಪ್ರಶ್ನೆ:"
- Answer: "ಉತ್ತರ:"
- Close: "ಮುಚ್ಚಿ"

**Error Messages:**
- "Please enter a question": "ದಯವಿಟ್ಟು ಒಂದು ಪ್ರಶ್ನೆ ಬರೆಯಿರಿ"
- "Error getting answer": "ಉತ್ತರ ಪಡೆಯುವಲ್ಲಿ ದೋಷ"
- "Finding answer...": "ಉತ್ತರ ಹುಡುಕುತ್ತಿದ್ದೇವೆ..."

**Note:** Lesson card content still needs Kannada translations (titleKannada, contentKannada fields). This is a todo item for future work.

### 3. Ask Question Feature

Students can now ask questions during lessons and get AI-powered answers!

#### How It Works:

1. **Floating Help Button** - Always visible at bottom-right of Learn page
2. **Question Dialog** - Opens when clicked
3. **AI Answer** - Uses Gemini to answer in selected language
4. **Context-Aware** - Knows the current subject (Maths/Science)

#### User Flow:
```
Learn Card Page
     ↓
Click [?] Button
     ↓
Dialog Opens with Textarea
     ↓
Student Types Question
     ↓
Click "Get Answer"
     ↓
AI Processes (shows loading spinner)
     ↓
Answer Displayed in Dialog
     ↓
Student Can Close & Continue Learning
```

#### Technical Implementation:

**New Service:** `src/services/searchService.ts`
- `answerQuestionSimple(question, language, subject)` - Main function
- Uses `getTutoringResponse()` from geminiService
- Maps language codes (en/hi/kn → english/hindi/english)
- Error handling with multilingual messages

**Learn Page Updates:** `src/pages/Learn.tsx`
- Added Dialog component from shadcn/ui
- New state: `questionDialogOpen`, `studentQuestion`, `questionAnswer`, `isAnswering`
- `handleAskQuestion()` - Calls searchService and displays answer
- Floating button positioned fixed at bottom-right
- Full multilingual support for all UI text

#### Example Questions Students Can Ask:
- "What is 5 + 3?" (Math)
- "Why do leaves need sunlight?" (Science)
- "How many seasons are there?" (Science)
- "What is multiplication?" (Math)

### 4. Science Chapters Page Update

Updated `src/pages/ScienceChapters.tsx` to match the MathsChapters structure:

**Before:** Generic SubjectCard list with chat navigation  
**After:** Chapter sections with expandable lesson cards

#### New Features:
- Chapter headers with lesson count
- Individual lesson cards showing:
  - Lesson number badge (1, 2, 3...)
  - Title (bilingual: English/Hindi)
  - Description
  - Difficulty badge (easy/medium/hard)
  - Duration (6-8 min)
  - Card count
  - Play button
- Navigates to /learn with full state (subject, chapterId, lessonId)
- Matches Maths page styling for consistency

## 🗂️ Files Modified

### Content Files:
1. ✅ `src/data/lessonContent.ts` - Added 6 new Science lessons (28 cards total)

### Page Files:
2. ✅ `src/pages/LanguageOnboarding.tsx` - Added Kannada language option
3. ✅ `src/pages/Learn.tsx` - Added Ask Question dialog feature
4. ✅ `src/pages/ScienceChapters.tsx` - Updated to lesson card structure

### Service Files:
5. ✅ `src/services/searchService.ts` - NEW - Question answering service

## 🧪 Testing Checklist

### Language Selection:
- [ ] Open app, see 3 language options
- [ ] Click Hindi - hear "हिंदी" audio
- [ ] Click Kannada - hear "ಕನ್ನಡ" audio
- [ ] Click English - hear "English" audio
- [ ] Verify selection persists in localStorage

### Science Content:
- [ ] Navigate to Science from Subjects page
- [ ] See 4 chapters with lesson counts
- [ ] Open "The Human Body" chapter
- [ ] See 2 lessons: Body Parts & Digestive System
- [ ] Click "Our Body Parts" lesson
- [ ] Go through all 5 cards
- [ ] Answer practice questions
- [ ] Complete lesson and see celebration screen
- [ ] Verify score calculation

### Ask Question Feature:
- [ ] Open any lesson (Maths or Science)
- [ ] See floating [?] button at bottom-right
- [ ] Click button - dialog opens
- [ ] Try to submit empty question - see error toast
- [ ] Type question: "Why do plants need water?"
- [ ] Click "Get Answer" - see loading spinner
- [ ] See answer from AI in current language
- [ ] Close dialog - back to lesson
- [ ] Question state resets for next ask

### Multilingual UI:
- [ ] Select Hindi - verify all UI text in Hindi
- [ ] Select Kannada - verify all UI text in Kannada
- [ ] Select English - verify all UI text in English
- [ ] Check: Back, Next, Previous, Check Answer, etc.
- [ ] Verify error messages in all languages

### Science Chapters Page:
- [ ] Open Science page
- [ ] See lesson card structure (not old cards)
- [ ] Verify lesson metadata: difficulty, duration, card count
- [ ] Click play button on any lesson
- [ ] Verify navigation to Learn page
- [ ] Verify correct lesson loads

## 📊 Content Statistics

### Maths:
- 2 chapters
- 6 lessons
- 25+ cards

### Science:
- 4 chapters
- 7 lessons
- 28 cards

### Total:
- 6 chapters
- 13 lessons
- 53+ educational cards
- 3 languages supported
- Interactive Q&A available

## 🔮 Future Enhancements

### 1. Complete Kannada Translations (Priority: HIGH)
- Add titleKannada to all lesson cards
- Add contentKannada to all lesson cards
- Add questionKannada to practice cards
- Update Learn.tsx to use Kannada content when language === 'kn'

### 2. Google Search Integration (Priority: MEDIUM)
Currently using Gemini AI for answers. Can add Google Custom Search API:
- Set up Google Cloud Console project
- Enable Custom Search API
- Create Custom Search Engine
- Add API key to .env: `VITE_GOOGLE_SEARCH_API_KEY`
- Add Search Engine ID: `VITE_GOOGLE_SEARCH_ENGINE_ID`
- Uncomment `searchGoogle()` function in searchService.ts

### 3. Voice Input for Questions (Priority: MEDIUM)
- Add microphone button in question dialog
- Use Web Speech API for voice recognition
- Support hi-IN, kn-IN, en-US recognition
- Convert speech to text → submit as question

### 4. Question History (Priority: LOW)
- Store asked questions in localStorage
- Show "Previously Asked" section
- Quick re-ask functionality
- Export questions for teacher review

### 5. More Science Content (Priority: MEDIUM)
Add more lessons to existing chapters:
- Human Body: Breathing System, Sense Organs
- Plants: Types of Plants, Plant Uses
- Animals: Animal Homes, Baby Animals, Food Chains
- Weather: Rain Cycle, Clouds, Wind

### 6. Kannada Voice Support (Priority: HIGH)
- Verify kn-IN TTS works on target devices
- May need fallback to pre-recorded audio
- Test on Android/iOS browsers
- Consider Microsoft Azure TTS for better Kannada support

## 🐛 Known Issues

1. **Kannada TTS Availability:**
   - kn-IN may not be available on all devices/browsers
   - Fallback currently silent - should show message or use English

2. **Question Answer Formatting:**
   - Some Gemini responses have markdown (**)
   - May need text formatting/parsing for display

3. **Long Answers:**
   - Very long AI answers might overflow dialog
   - Need max-height with scroll for answer section

4. **Network Dependency:**
   - Question feature requires internet (Gemini API)
   - Should show offline message gracefully

## 🚀 Deployment Notes

### Environment Variables:
```bash
# Optional: For future Google Search integration
VITE_GOOGLE_SEARCH_API_KEY=your_key_here
VITE_GOOGLE_SEARCH_ENGINE_ID=your_cx_here
```

### Build & Run:
```bash
# Install dependencies (if new)
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

### Testing on Mobile:
```bash
# Get local IP
ip addr show

# Run dev server with host
npm run dev -- --host

# Access from phone browser:
http://192.168.x.x:8082
```

## 📝 Code Examples

### Using Search Service:
```typescript
import { answerQuestionSimple } from "@/services/searchService";

const answer = await answerQuestionSimple(
  "Why do plants need sunlight?",
  "en", // or "hi", "kn"
  "science"
);
console.log(answer);
```

### Accessing New Science Content:
```typescript
import { scienceChapters } from "@/data/lessonContent";

// Get all science chapters
console.log(scienceChapters);

// Get specific lesson
const plantLesson = scienceChapters
  .find(ch => ch.id === "plants")
  ?.lessons.find(l => l.id === "plant-parts");
```

### Adding More Kannada Translations:
```typescript
// In Learn.tsx or any component
const text = {
  en: "Learn with cards",
  hi: "कार्ड से सीखें",
  kn: "ಕಾರ್ಡುಗಳೊಂದಿಗೆ ಕಲಿಯಿರಿ"
};

const displayText = text[language] || text.en;
```

## 🎓 Educational Design Principles

All new Science content follows these principles:

1. **Rural India Context:**
   - Uses familiar examples (crops, farming, village life)
   - Relates to daily experiences (cooking, seasons)
   - Local animal examples (cows, chickens)

2. **Visual Learning:**
   - Emoji visual aids (🌱🐄☀️)
   - Simple diagrams in text
   - Color-coded card types

3. **Progressive Difficulty:**
   - Start with concrete concepts (body parts)
   - Build to abstract ideas (photosynthesis)
   - Practice questions reinforce learning

4. **Bilingual by Default:**
   - Every lesson has English + Hindi titles
   - Key terms shown in both scripts
   - Prepares for Kannada addition

5. **Encouragement First:**
   - Positive feedback on correct answers
   - "Keep trying!" on incorrect answers
   - Celebration screens for completion

## 📚 Related Documentation

- [CARD_LEARNING_GUIDE.md](./CARD_LEARNING_GUIDE.md) - Complete card learning system
- [GEMINI_INTEGRATION.md](./GEMINI_INTEGRATION.md) - AI service architecture
- [LITERACY_PROTOTYPE_GUIDE.md](./LITERACY_PROTOTYPE_GUIDE.md) - Onboarding features

---

**Version:** 1.0  
**Date:** 2024  
**Status:** ✅ Complete (except Kannada content translations)
