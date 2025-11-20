# RAG Debugging and Testing Guide

## Overview
This document provides step-by-step instructions for testing and verifying the RAG (Retrieval Augmented Generation) implementation in the AI Sathi project.

## What Was Changed

### 1. Enhanced Debug Logging
The RAG retrieval now logs detailed information to the browser console:
- Subject and Chapter being queried
- Length of retrieved content
- Preview of retrieved content (first 200 characters)
- Full retrieved content

**Location:** `src/pages/Chat.tsx` lines 98-105

### 2. Hardened System Prompts
The SLM prompts now include:
- **Strict grounding rules**: Explicit instructions to ONLY use provided context
- **Fallback behavior**: Clear instruction to admit when information is not available
- **Pedagogical guidelines**: Instructions for child-friendly, encouraging language
- **Multilingual support**: Enhanced prompts in English, Hindi, and Kannada

**Location:** `src/pages/Chat.tsx` lines 107-163

### 3. Visual Context Indicator
Added a badge in the chat header showing the current subject and chapter when RAG context is active.

**Location:** `src/pages/Chat.tsx` lines 289-293

## Testing Instructions

### Step 1: Open Browser Console
1. Navigate to the running application (usually http://localhost:5173)
2. Open browser DevTools (F12 or Right-click → Inspect)
3. Go to the "Console" tab

### Step 2: Select a Chapter
1. From the home page, select "Class 5"
2. Choose a subject (e.g., "Maths" or "Science")
3. Select a specific chapter (e.g., "Numbers and Operations" or "The Human Body")

### Step 3: Verify RAG Context Loading
In the browser console, you should see:
```
=== RAG DEBUG INFO ===
Subject: Maths
Chapter: numbers
Retrieved Chunk Length: 456
Retrieved Chunk Preview: Chapter: Numbers and Operations...
Full Retrieved Chunk: [Full NCERT content]
======================
```

**✅ PASS Criteria:**
- Subject and Chapter match your selection
- Retrieved Chunk Length > 0
- Retrieved Chunk contains relevant NCERT content

**❌ FAIL Indicators:**
- Retrieved Chunk Length: 0
- Retrieved Chunk Preview: "EMPTY"
- Subject or Chapter is undefined

### Step 4: Test Grounded Responses
Ask questions that ARE in the curriculum:

**For Maths - Numbers chapter:**
- "What is place value?"
- "How do I add large numbers?"
- "What is the difference between Indian and International number systems?"

**For Science - Human Body chapter:**
- "What are the types of joints?"
- "How do muscles work?"
- "What are reflex actions?"

**Expected Behavior:**
- AI should answer using information from the retrieved context
- Responses should be simple and child-friendly
- Should use examples from the NCERT curriculum

### Step 5: Test Out-of-Context Questions
Ask questions that are NOT in the selected chapter:

**Examples:**
- "What is photosynthesis?" (when in Maths chapter)
- "Who is the Prime Minister of India?" (general knowledge)
- "How do airplanes fly?" (not in Class V curriculum)

**Expected Behavior:**
- AI should respond with: "I don't have information about that in this chapter. Can you ask me something else about this topic?"
- AI should NOT provide answers from general knowledge
- AI should NOT make up information

### Step 6: Verify Multilingual Grounding
1. Switch language using the language selector (English/Hindi/Kannada)
2. Ask the same questions in different languages
3. Verify that:
   - Debug logs still show correct context retrieval
   - Responses are in the selected language
   - Grounding behavior is consistent across languages

## Common Issues and Solutions

### Issue 1: Retrieved Chunk is Empty
**Symptoms:**
- Console shows "Retrieved Chunk Length: 0"
- Console shows "EMPTY" for chunk preview

**Possible Causes:**
1. Chapter ID mismatch between UI and data file
2. Subject name mismatch
3. Context not being passed correctly in navigation

**Solution:**
1. Check `src/data/chapterContent.ts` for correct chapter IDs
2. Verify navigation in `MathsChapters.tsx` or `ScienceChapters.tsx`
3. Ensure `location.state.context` is being set correctly

### Issue 2: AI Still Gives Generic Responses
**Symptoms:**
- Retrieved chunk is correct (shown in console)
- But AI still answers with general knowledge

**Possible Causes:**
1. Model not respecting system prompt
2. Temperature too high (causing creativity)
3. Model too small to follow complex instructions

**Solutions:**
1. Lower temperature in `Chat.tsx` (currently 0.7, try 0.3-0.5)
2. Simplify the system prompt further
3. Consider using a larger model if available

### Issue 3: Context Not Showing in Header
**Symptoms:**
- No chapter badge visible in chat header

**Possible Cause:**
- Context not being passed through navigation

**Solution:**
1. Check that you're navigating from a chapter page (not directly to /chat)
2. Verify `location.state.context` in Chat component

## Advanced Debugging

### Check Navigation State
Add this to `Chat.tsx` (temporarily):
```typescript
useEffect(() => {
  console.log("Navigation State:", location.state);
  console.log("Context:", context);
}, [location.state, context]);
```

### Monitor AI Pipeline
Check if the AI model is loaded:
```typescript
useEffect(() => {
  console.log("AI Pipeline Status:", aiPipeline ? "Loaded" : "Not Loaded");
}, [aiPipeline]);
```

### Inspect Full Prompt
Log the complete prompt being sent to the model:
```typescript
const messages = [
  { role: "system", content: systemPrompts[language] || systemPrompts['en'] },
  { role: "user", content: userMessage }
];
console.log("Full Prompt:", JSON.stringify(messages, null, 2));
```

## Expected Console Output Example

When everything is working correctly, you should see:

```
=== RAG DEBUG INFO ===
Subject: Science
Chapter: human-body
Retrieved Chunk Length: 523
Retrieved Chunk Preview: 
      Chapter: The Human Body
      Key Concepts:
      1. Skeletal System: Bones, joints (hinge, ball and socket, pivot, gliding). Functions of the skeleton (support, protection, movement).
      2. Muscular System...
Full Retrieved Chunk: [Complete chapter content]
======================
```

## Next Steps if Issues Persist

If the RAG retrieval is working but responses are still generic:

1. **Replace Keyword Search with Vector Search:**
   - Current implementation uses simple key-based lookup
   - Consider implementing semantic search using embeddings
   - Use libraries like `transformers.js` for client-side embeddings

2. **Enhance Context Chunking:**
   - Break large chapters into smaller, focused chunks
   - Implement relevance scoring for chunks
   - Return only the most relevant chunk(s)

3. **Improve Prompt Engineering:**
   - Add few-shot examples in the system prompt
   - Use chain-of-thought prompting
   - Add explicit "think step-by-step" instructions

4. **Model Considerations:**
   - Qwen 2.5 0.5B may be too small for complex instruction following
   - Consider upgrading to 1.5B or 3B variant if device allows
   - Test with different temperature and top_p settings

## Success Metrics

Your RAG implementation is working correctly if:

✅ Console shows correct chapter content retrieval  
✅ AI answers questions using NCERT curriculum content  
✅ AI refuses to answer out-of-scope questions  
✅ Responses are child-friendly and encouraging  
✅ Multilingual responses maintain grounding  
✅ Visual indicator shows active chapter context  

## Contact & Support

If you continue to experience issues after following this guide, consider:
- Reviewing the conversation history for previous implementations
- Checking the model's capabilities and limitations
- Testing with different chapters and subjects
- Verifying the model is fully loaded before testing
