# Voice Input and Audio Output Implementation

## Overview
This document describes the voice input (ASR) and audio output (TTS) implementation for AI Sathi, supporting English, Hindi, and Kannada.

## Features Implemented

### 1. Voice Input (ASR - Automatic Speech Recognition)
- **Technology**: Web Speech API (SpeechRecognition)
- **Languages Supported**: English, Hindi, Kannada
- **Implementation**: `useVoiceInput` hook

#### How it Works:
1. User clicks the microphone button
2. Browser requests microphone access via MediaDevices API
3. Audio is recorded in WebM format
4. When user stops recording, audio is transcribed using browser's speech recognition engine
5. Transcribed text automatically populates the input field
6. User can edit or send the transcribed text

#### Key Features:
- **Browser Native**: Uses built-in browser capabilities (no large model download)
- **Language Detection**: Automatically uses the selected language for transcription
- **Visual Feedback**: Recording indicator with pulse animation
- **Error Handling**: Graceful fallback with user-friendly error messages

### 2. Text-to-Speech (TTS - Audio Output)
- **Technology**: Web Speech API (speechSynthesis)
- **Languages Supported**: English (en-US), Hindi (hi-IN), Kannada (kn-IN)
- **Implementation**: `useTextToSpeech` hook

#### How it Works:
1. AI tutor generates a response
2. If auto-speak is enabled, the response is automatically spoken
3. Speech synthesis uses the appropriate voice for the selected language
4. User can toggle auto-speak on/off using the speaker button

#### Key Features:
- **Auto-Speak Toggle**: Users can enable/disable automatic speech
- **Language Switching**: Voice automatically changes based on selected language
- **Voice Selection**: Attempts to find the best matching voice for the language
- **Speech Control**: Adjustable rate, pitch, and volume

### 3. Language Integration
- **Language Context**: Centralized language management
- **Dynamic Switching**: Both ASR and TTS update when language changes
- **Language Codes**:
  - English: `en-US`
  - Hindi: `hi-IN`
  - Kannada: `kn-IN`

## User Interface

### Chat Input Area
The chat input area includes four main controls:

1. **Microphone Button** (Left)
   - Click to start/stop recording
   - Red pulsing animation when recording
   - Disabled during processing

2. **Text Input** (Center)
   - Manual text input
   - Disabled during voice recording
   - Supports keyboard shortcuts (Enter to send)

3. **Speaker Button** (Right of input)
   - Toggle auto-speak on/off
   - Blue highlight when enabled
   - Tooltip shows current state

4. **Send Button** (Right)
   - Sends the message
   - Disabled when input is empty

### Voice Input Status
When recording or processing:
- Status banner appears above input
- Shows current state: "Recording..." or "Transcribing speech..."
- Visual indicator (pulsing dot)

## Technical Implementation

### File Structure
```
src/
├── hooks/
│   ├── useVoiceInput.ts      # Voice input hook (Whisper ASR)
│   ├── useTextToSpeech.ts    # TTS hook (Web Speech API)
│   └── useTranslation.ts     # Text translation hook
├── contexts/
│   └── LanguageContext.tsx   # Language state management
└── pages/
    └── Chat.tsx              # Chat interface with voice features
```

### Dependencies
- `@huggingface/transformers`: For Whisper model
- Web Speech API: Built into modern browsers
- MediaDevices API: For microphone access

### Models Used
1. **Flan-T5 Small**: ~77MB, text generation and translation (for AI responses)

## Usage Flow

### Voice Input Flow:
1. User selects language (English/Hindi/Kannada)
2. User clicks microphone button
3. Browser requests microphone permission (first time only)
4. User speaks in selected language
5. User clicks microphone again to stop
6. Browser transcribes audio to text
7. Text appears in input field
8. User can edit or send immediately

### TTS Flow:
1. User enables auto-speak (speaker button)
2. User sends a message
3. AI tutor generates response
4. Response is displayed in chat
5. TTS automatically reads the response aloud
6. Speech uses the selected language voice

## Browser Compatibility

### Voice Input (Web Speech API):
- ✅ Chrome/Edge (Full support)
- ✅ Safari (Full support)
- ⚠️ Firefox (Not supported by default, requires configuration)

### TTS (Web Speech API):
- ✅ Chrome/Edge (Full support)
- ✅ Safari (Full support)
- ⚠️ Firefox (Limited voice selection)

## Performance Considerations

### First Load:
- No large model download for voice features
- Subsequent loads are instant

### Runtime:
- Voice transcription: Real-time (streaming)
- TTS: Instant playback
- No network required after initial model download

## Error Handling

### Microphone Access:
- Permission denied: Shows error toast
- No microphone: Shows error toast
- Browser not supported: Feature disabled

### Transcription:
- Model load failure: Falls back to text input only
- Transcription error: Shows error, allows retry
- Empty audio: Prompts user to speak

### TTS:
- No voice available: Silent fallback
- Speech synthesis error: Logged, continues without audio

## Future Enhancements

Potential improvements:
1. Voice activity detection (auto-stop when user stops speaking)
2. Real-time transcription display
3. Custom wake word ("Hey Sathi")
4. Voice cloning for consistent tutor voice
5. Emotion detection in speech
6. Background noise cancellation

## Testing

To test voice features:
1. Navigate to chat page
2. Click microphone button
3. Grant microphone permission
4. Speak a math question
5. Verify transcription appears
6. Send message
7. Verify AI response is spoken aloud (if auto-speak enabled)
8. Switch language and repeat

## Accessibility

- Keyboard shortcuts supported
- Screen reader compatible
- Visual feedback for all states
- Clear error messages
- Tooltip hints on buttons
