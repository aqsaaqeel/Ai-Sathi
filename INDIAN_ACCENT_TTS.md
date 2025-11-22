# Indian Accent Text-to-Speech Implementation

## Overview

The Language Learning module now uses **Indian accent voices** for all Text-to-Speech (TTS) functionality. This ensures that pronunciation matches the Indian English accent that students are familiar with.

## Implementation Details

### 1. **Voice Selection Logic**

The `useAudioPlayer` hook now includes intelligent voice selection:

```typescript
function getIndianVoice(lang: string): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  
  // For Hindi: Use hi-IN voices
  if (lang === "hi-IN" || lang.startsWith("hi")) {
    return voices.find(voice => 
      voice.lang === "hi-IN" || voice.lang.startsWith("hi")
    );
  }
  
  // For Kannada: Use kn-IN voices
  if (lang === "kn-IN" || lang.startsWith("kn")) {
    return voices.find(voice => 
      voice.lang === "kn-IN" || voice.lang.startsWith("kn")
    );
  }
  
  // For English: Priority order
  // 1. en-IN (Indian English) - PREFERRED
  // 2. en-GB (British English) - Fallback (closer to Indian accent)
  // 3. en-US (American English) - Last resort
  if (lang.startsWith("en")) {
    const indianEnglish = voices.find(voice => voice.lang === "en-IN");
    if (indianEnglish) return indianEnglish;
    
    const britishEnglish = voices.find(voice => voice.lang === "en-GB");
    if (britishEnglish) return britishEnglish;
    
    return voices.find(voice => voice.lang.startsWith("en"));
  }
  
  return null;
}
```

### 2. **Language Code Updates**

All language codes have been updated to use Indian variants:

**Before:**
```typescript
english: 'en-US'  // American English
```

**After:**
```typescript
english: 'en-IN'  // Indian English
```

### 3. **Files Modified**

1. **`src/hooks/useAudioPlayer.ts`**
   - Added `getIndianVoice()` function
   - Added voice loading on component mount
   - Automatic conversion: `en-US` → `en-IN`
   - Voice selection with fallback logic
   - Console logging for debugging

2. **`src/pages/LanguageLearning/StoryMode.tsx`**
   - Line 33: `'en-US'` → `'en-IN'`
   - Line 38: `'en-US'` → `'en-IN'`

3. **`src/pages/LanguageLearning/PictureDictionary.tsx`**
   - Line 35: `'en-US'` → `'en-IN'`

4. **Helper function updated:**
   ```typescript
   export function getTTSLanguageCode(language: "hindi" | "english" | "kannada"): string {
     if (language === "hindi") return "hi-IN";
     if (language === "kannada") return "kn-IN";
     return "en-IN"; // Indian English accent
   }
   ```

## Browser Support

### Available Voices by Browser

**Chrome/Edge (Best Support):**
- ✅ `en-IN` - Google हिन्दी (Indian English)
- ✅ `hi-IN` - Google हिन्दी
- ✅ `kn-IN` - Google ಕನ್ನಡ
- ✅ `en-GB` - Google UK English (fallback)

**Firefox:**
- ✅ `hi-IN` - Hindi voices
- ⚠️ Limited `en-IN` support (may use `en-GB` or `en-US`)

**Safari:**
- ✅ `hi-IN` - Lekha (Hindi)
- ✅ `en-IN` - Veena (Indian English)
- ✅ `kn-IN` - Kannada voices

## Testing

### How to Verify Indian Accent

1. **Open Browser Console** (F12)
2. **Navigate to Language Learning module**
3. **Check console logs:**
   ```
   Available voices: [
     "Google हिन्दी (hi-IN)",
     "Google UK English Female (en-GB)",
     "Google US English (en-US)",
     ...
   ]
   ```
4. **Play any audio** - Console will show:
   ```
   Using voice: Google हिन्दी (hi-IN)
   ```
   or
   ```
   Using voice: Google UK English Female (en-GB)
   ```

### Test Locations

1. **Picture Dictionary**
   - Click any category → Click any item
   - Click speaker button for English
   - Should use `en-IN` voice

2. **Story Mode**
   - Open any story
   - Click "Read Aloud" button
   - Toggle between English/Hindi
   - Both should use Indian voices

3. **Hindi Course**
   - Open any lesson
   - Click "Listen" on vocabulary cards
   - Should use `hi-IN` voice

## Fallback Behavior

If Indian voices are not available:

1. **For English:**
   - Try `en-IN` (Indian English)
   - Fallback to `en-GB` (British - closer to Indian accent)
   - Last resort: `en-US` (American)

2. **For Hindi:**
   - Try `hi-IN`
   - Fallback to any `hi-*` voice
   - Last resort: Browser default

3. **For Kannada:**
   - Try `kn-IN`
   - Fallback to any `kn-*` voice
   - Last resort: Browser default

## Voice Loading

Voices are loaded asynchronously in Chrome:

```typescript
useEffect(() => {
  const loadVoices = () => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      setVoicesLoaded(true);
      console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`));
    }
  };

  // Chrome loads voices asynchronously
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
  
  // Try loading immediately (for Firefox/Safari)
  loadVoices();
}, []);
```

## Debugging

### Check Available Voices

Run this in browser console:
```javascript
speechSynthesis.getVoices().forEach(voice => {
  console.log(`${voice.name} - ${voice.lang} (${voice.localService ? 'Local' : 'Remote'})`);
});
```

### Force Specific Voice

For testing, you can manually set a voice:
```javascript
const utterance = new SpeechSynthesisUtterance("Hello");
const voices = speechSynthesis.getVoices();
utterance.voice = voices.find(v => v.lang === "en-IN");
speechSynthesis.speak(utterance);
```

## Benefits

✅ **Authentic Pronunciation** - Matches Indian English accent
✅ **Better Comprehension** - Students understand familiar accent
✅ **Multilingual Support** - Hindi, English, Kannada all use Indian voices
✅ **Automatic Fallback** - Gracefully degrades if Indian voices unavailable
✅ **Browser Compatible** - Works across Chrome, Firefox, Safari
✅ **Offline Capable** - Uses browser's built-in TTS (no internet needed)

## Future Enhancements

1. **Pre-recorded Audio** - Replace TTS with native speaker recordings
2. **Voice Selection UI** - Let users choose their preferred voice
3. **Accent Settings** - Allow switching between Indian/British/American
4. **Speed Control** - User-adjustable speech rate
5. **Pitch Control** - User-adjustable voice pitch

---

**Last Updated:** 2025-11-22
**Status:** ✅ Fully Implemented
