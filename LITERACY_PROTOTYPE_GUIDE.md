# 🎓 AI-Sathi Literacy Prototype - Implementation Guide

## 📋 Overview

This prototype adds a complete literacy onboarding flow to your AI-Sathi app using **Gemini API** as a temporary engine. All Gemini integrations are clearly marked for easy replacement with your SLM later.

---

## ✅ What's Been Built

### 1. **Language Onboarding Screen** (`/language-onboarding`)
- Hindi 🇮🇳 and English 🇬🇧 selection with speaker icons
- Audio playback using Web Speech API (TTS)
- localStorage persistence of language preference
- Non-reader friendly (icon + text + audio)

### 2. **Literacy Assessment** (`/literacy-assessment`)
- **Hindi Assessment**:
  - Letter recognition: क, म, अ
  - Sound matching with audio cues
- **English Assessment**:
  - Letter recognition: A, B, C
  - Word-picture matching (🐱 cat, 🌳 tree)
- Scores 0-100 for each language
- AI-powered placement recommendation
- Audio-first UI for non-readers

### 3. **Duolingo-Style Quiz** (`/quiz`)
- Multiple question types (multiple choice, audio prompts)
- Lives system (5 hearts ❤️)
- Streak tracking (🔥)
- Point scoring system
- Instant feedback with encouragement
- Progress tracking
- Adaptive difficulty

### 4. **Supporting Infrastructure**
- **Gemini Service** (`src/services/geminiService.ts`):
  - All API calls isolated and marked with `🔄 REPLACE WITH SLM`
  - Assessment scoring
  - Quiz question generation
  - Answer checking with feedback
  - Fallback logic when API fails
  
- **Audio Player Hook** (`src/hooks/useAudioPlayer.ts`):
  - Web Speech API (TTS) for dynamic content
  - MP3 playback support (ready for pre-recorded audio)
  - Language-aware (hi-IN, en-US)
  
- **Extended Context** (`src/contexts/LanguageContext.tsx`):
  - Literacy state management
  - Score tracking
  - Placement status

---

## 🔑 Gemini API Integration

**API Key Used**: `AIzaSyDR4pS7oHQYlRjwAdxEGLsbl2zpsLVfVQI`

### Where Gemini is Used (Search for "🔄 REPLACE WITH SLM"):

1. **Assessment Scoring** (`scoreLiteracyAssessment`)
   - Location: `src/services/geminiService.ts:71`
   - Purpose: Score Hindi/English answers and provide placement
   - Fallback: Rule-based scoring if API fails

2. **Quiz Generation** (`generateQuizQuestions`)
   - Location: `src/services/geminiService.ts:150`
   - Purpose: Generate adaptive quiz questions
   - Fallback: Pre-defined question bank

3. **Answer Checking** (`checkQuizAnswer`)
   - Location: `src/services/geminiService.ts:238`
   - Purpose: Validate answers and provide feedback
   - Fallback: Simple string matching

---

## 🔄 User Flow

```
1. First Visit → Language Onboarding
   ↓
2. Literacy Assessment (1 minute)
   ↓
3. Based on Scores:
   - Both < 40: Both Literacy Courses
   - Hindi < 40: Hindi Literacy Quiz
   - English < 40: English Literacy Quiz
   - Both >= 70: Skip to Subjects
   ↓
4. Quiz (Duolingo-style)
   ↓
5. Subjects (existing flow)
```

### Storage Keys (localStorage):
- `selectedLanguage`: "hindi" | "english"
- `completedAssessment`: "true" | "false"
- `hindiScore`: 0-100
- `englishScore`: 0-100
- `placement`: "hindi-literacy" | "english-literacy" | "both-literacy" | "skip-to-subjects"

---

## 🎨 Features Implemented

### Audio-First Design
- ✅ Speaker icons (🔊) on all language buttons
- ✅ Questions read aloud automatically
- ✅ TTS support for Hindi (hi-IN) and English (en-US)
- ✅ Ready for pre-recorded MP3 files

### Non-Reader Support
- ✅ Large buttons with icons
- ✅ Audio cues for every interaction
- ✅ Visual feedback (colors, animations)
- ✅ Emoji-based visual language

### Gamification (Duolingo-style)
- ✅ Lives system (❤️ x5)
- ✅ Streak tracking (🔥)
- ✅ Point scoring
- ✅ Progress bars
- ✅ Instant feedback
- ✅ Encouragement messages

---

## 🚀 Testing the Prototype

### Access URLs:
- **Dev Server**: http://localhost:8081/
- **Language Onboarding**: http://localhost:8081/ (first visit)
- **Assessment**: http://localhost:8081/literacy-assessment
- **Quiz**: http://localhost:8081/quiz

### Test Flow:
1. Open http://localhost:8081/
2. Click Hindi or English (test speaker icon 🔊)
3. Complete literacy assessment (answer questions)
4. View scores and placement
5. Take the quiz (Duolingo experience)
6. Navigate to subjects

### Clear Progress:
```bash
# In browser console:
localStorage.clear();
location.reload();
```

---

## 🔧 How to Replace Gemini with Your SLM

### Step 1: Find All Gemini Calls
Search codebase for: `🔄 REPLACE WITH SLM`

### Step 2: Replace `callGemini()` Function
```typescript
// OLD (Gemini):
async function callGemini(prompt: string): Promise<string> {
  // ... Gemini API call
}

// NEW (Your SLM):
async function callSLM(prompt: string): Promise<string> {
  // Use your local model pipeline here
  const response = await yourSLMPipeline(prompt);
  return response;
}
```

### Step 3: Update Three Main Functions

#### 1. Assessment Scoring
```typescript
export async function scoreLiteracyAssessment(
  hindiAnswers: Record<string, string>,
  englishAnswers: Record<string, string>
): Promise<AssessmentResult> {
  // Replace callGemini() with your SLM
  const response = await callSLM(prompt);
  // Parse and return
}
```

#### 2. Quiz Generation
```typescript
export async function generateQuizQuestions(...) {
  // Replace callGemini() with your SLM
  const response = await callSLM(prompt);
  // Parse JSON and return
}
```

#### 3. Answer Checking
```typescript
export async function checkQuizAnswer(...) {
  // Replace callGemini() with your SLM
  const response = await callSLM(prompt);
  // Parse feedback and return
}
```

---

## 📦 Files Created/Modified

### New Files:
- ✅ `src/services/geminiService.ts` - All AI calls
- ✅ `src/hooks/useAudioPlayer.ts` - Audio/TTS
- ✅ `src/pages/LanguageOnboarding.tsx` - Language selection
- ✅ `src/pages/LiteracyAssessment.tsx` - Assessment flow
- ✅ `src/pages/Quiz.tsx` - Quiz experience

### Modified Files:
- ✅ `src/App.tsx` - Added routes
- ✅ `src/contexts/LanguageContext.tsx` - Added literacy state

---

## 🎯 Next Steps for Production

### 1. Audio Assets
- Record native speaker MP3s for:
  - "Hindi" / "हिंदी"
  - "English"
  - Common quiz phrases
- Place in `public/audio/` folder
- Update `useAudioPlayer` to use MP3s instead of TTS

### 2. Offline Support
- Cache Gemini responses
- Expand fallback question bank
- Pre-bundle all audio files
- Service worker for offline mode

### 3. Replace Gemini
- Integrate your SLM
- Update `geminiService.ts`
- Test accuracy vs. Gemini baseline

### 4. Additional Features
- Match-pairs question type
- Fill-in-the-blank questions
- Handwriting recognition
- Progress tracking over time
- Certificates/achievements

---

## 🐛 Known Limitations

1. **TTS Quality**: Browser TTS varies by device/OS
   - **Fix**: Use pre-recorded MP3s

2. **Internet Required**: Gemini API needs connectivity
   - **Fix**: Implement offline fallback question bank

3. **Limited Question Bank**: Fallback has only 2 questions per language
   - **Fix**: Expand static question database

4. **No Progress Persistence**: Quiz progress lost on refresh
   - **Fix**: Add localStorage checkpoint saving

---

## 📱 Deployment Checklist

- [ ] Replace Gemini with your SLM
- [ ] Add pre-recorded audio files
- [ ] Expand fallback question bank
- [ ] Test on low-end Android devices
- [ ] Test offline functionality
- [ ] Add analytics/tracking
- [ ] Implement progress persistence
- [ ] Add more languages (Kannada, Tamil, etc.)
- [ ] Create teacher dashboard
- [ ] Add parental controls

---

## 🎓 Technical Details

### Tech Stack:
- **Frontend**: React 18 + TypeScript + Vite
- **Routing**: React Router v6
- **UI Components**: Shadcn/ui + Tailwind CSS
- **AI Engine (temp)**: Gemini Pro API
- **Audio**: Web Speech API (TTS)
- **State**: React Context + localStorage
- **Icons**: Lucide React

### Browser Support:
- Chrome 90+ (recommended)
- Edge 90+
- Safari 14+ (limited TTS)
- Firefox 88+

### Performance:
- Initial load: ~2MB (without models)
- Quiz load time: ~1-2s (Gemini API)
- Audio playback: Instant (TTS) or ~100ms (MP3)

---

## 💡 Tips for Your Team

1. **Testing**: Use browser DevTools → Application → Local Storage to inspect state
2. **Debugging**: All Gemini calls log errors to console
3. **Audio**: Test TTS on actual devices (varies widely)
4. **Fallbacks**: The app works even if Gemini API fails
5. **Customization**: All UI text is in component files (easy to translate)

---

## 📞 Support

If you need to modify the prototype:
1. Search for `🔄 REPLACE WITH SLM` comments
2. Check `geminiService.ts` for all AI integrations
3. Modify fallback responses in same file
4. Test with `localStorage.clear()` between runs

---

**Built with ❤️ for rural India education**

---

## 🔗 Quick Links

- Gemini API Docs: https://ai.google.dev/docs
- Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
- Shadcn UI: https://ui.shadcn.com/
- React Router: https://reactrouter.com/

---

**Status**: ✅ Prototype Ready for Testing
**Next**: Replace Gemini → Test with SLM → Deploy
