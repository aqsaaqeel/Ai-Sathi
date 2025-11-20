/**
 * GEMINI AI SERVICE - TEMPORARY PROTOTYPE ENGINE
 * 
 * ⚠️ REPLACE WITH SLM LATER ⚠️
 * 
 * All Gemini API calls are isolated here for easy replacement.
 * When your SLM is ready, replace functions in this file with your local model calls.
 * 
 * Search for: "// 🔄 REPLACE WITH SLM" to find all integration points.
 */

const GEMINI_API_KEY = "AIzaSyDR4pS7oHQYlRjwAdxEGLsbl2zpsLVfVQI"; // Temporary key
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

interface GeminiRequest {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
}

interface GeminiResponse {
  candidates?: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

/**
 * 🔄 REPLACE WITH SLM
 * Generic Gemini API caller
 */
async function callGemini(prompt: string): Promise<string> {
  const requestBody: GeminiRequest = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return text.trim();
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw error;
  }
}

// ============================================================
// LITERACY ASSESSMENT FUNCTIONS
// ============================================================

export interface AssessmentResult {
  hindiScore: number; // 0-100
  englishScore: number; // 0-100
  placement: "hindi-literacy" | "english-literacy" | "both-literacy" | "skip-to-subjects";
  recommendations: string;
}

/**
 * 🔄 REPLACE WITH SLM
 * Score literacy assessment answers
 */
export async function scoreLiteracyAssessment(
  hindiAnswers: Record<string, string>,
  englishAnswers: Record<string, string>
): Promise<AssessmentResult> {
  const prompt = `You are an educational assessment engine for rural India literacy placement.

Hindi Assessment Answers:
${JSON.stringify(hindiAnswers, null, 2)}

English Assessment Answers:
${JSON.stringify(englishAnswers, null, 2)}

Scoring rubric:
- Letter identification: 10 points each
- Sound matching: 15 points each
- Word-picture matching: 10 points each

Return ONLY valid JSON:
{
  "hindiScore": <0-100>,
  "englishScore": <0-100>,
  "placement": "<hindi-literacy|english-literacy|both-literacy|skip-to-subjects>",
  "recommendations": "<brief guidance in English and Hindi>"
}

Placement logic:
- Both scores < 40: both-literacy
- Hindi < 40, English >= 40: hindi-literacy
- English < 40, Hindi >= 40: english-literacy
- Both >= 70: skip-to-subjects`;

  try {
    const response = await callGemini(prompt);
    // Try to extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Invalid JSON response from Gemini");
  } catch (error) {
    console.error("Assessment scoring failed:", error);
    // Fallback: simple rule-based scoring
    return fallbackAssessmentScoring(hindiAnswers, englishAnswers);
  }
}

/**
 * Fallback assessment scoring (no AI needed)
 */
function fallbackAssessmentScoring(
  hindiAnswers: Record<string, string>,
  englishAnswers: Record<string, string>
): AssessmentResult {
  // Simple correct answer counting
  const hindiCorrect = Object.values(hindiAnswers).filter(Boolean).length;
  const englishCorrect = Object.values(englishAnswers).filter(Boolean).length;
  
  const hindiScore = Math.min(100, hindiCorrect * 20);
  const englishScore = Math.min(100, englishCorrect * 20);

  let placement: AssessmentResult["placement"] = "both-literacy";
  if (hindiScore >= 70 && englishScore >= 70) {
    placement = "skip-to-subjects";
  } else if (hindiScore < 40 && englishScore >= 40) {
    placement = "hindi-literacy";
  } else if (englishScore < 40 && hindiScore >= 40) {
    placement = "english-literacy";
  }

  return {
    hindiScore,
    englishScore,
    placement,
    recommendations: "Complete the recommended literacy courses before continuing.",
  };
}

// ============================================================
// QUIZ GENERATION (Duolingo-style)
// ============================================================

export interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "match-pairs" | "fill-blank" | "audio-prompt";
  question: string;
  questionAudio?: string; // TTS text or audio URL
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  difficulty: "easy" | "medium" | "hard";
}

/**
 * 🔄 REPLACE WITH SLM
 * Generate adaptive quiz questions
 */
export async function generateQuizQuestions(
  language: "hindi" | "english",
  level: "beginner" | "intermediate" | "advanced",
  topic: string,
  count: number = 5
): Promise<QuizQuestion[]> {
  const prompt = `Generate ${count} ${level} literacy quiz questions in ${language} for topic: ${topic}.

Requirements:
- Mix question types: multiple-choice, fill-blank, match-pairs
- Audio-first approach (provide text that can be read aloud)
- Rural India context (familiar objects, scenarios)
- Progressive difficulty

Return ONLY valid JSON array:
[
  {
    "id": "q1",
    "type": "multiple-choice",
    "question": "Which letter makes the 'ka' sound?",
    "questionAudio": "Which letter makes the ka sound",
    "options": ["क", "ख", "ग", "घ"],
    "correctAnswer": "क",
    "explanation": "क makes the 'ka' sound",
    "difficulty": "easy"
  }
]`;

  try {
    const response = await callGemini(prompt);
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Invalid JSON response from Gemini");
  } catch (error) {
    console.error("Quiz generation failed:", error);
    // Fallback: return sample questions
    return getFallbackQuizQuestions(language, level);
  }
}

/**
 * Fallback quiz questions (no AI needed)
 */
function getFallbackQuizQuestions(
  language: "hindi" | "english",
  level: string
): QuizQuestion[] {
  if (language === "hindi") {
    return [
      {
        id: "h1",
        type: "multiple-choice",
        question: "कौन सा अक्षर 'क' है?",
        questionAudio: "कौन सा अक्षर 'क' है?",
        options: ["क", "ख", "ग", "घ"],
        correctAnswer: "क",
        explanation: "यह 'क' अक्षर है",
        difficulty: "easy",
      },
      {
        id: "h2",
        type: "multiple-choice",
        question: "इनमें से कौन सा शब्द है?",
        questionAudio: "इनमें से कौन सा शब्द है?",
        options: ["माँ", "123", "xyz", "@#$"],
        correctAnswer: "माँ",
        explanation: "'माँ' एक हिंदी शब्द है",
        difficulty: "easy",
      },
    ];
  } else {
    return [
      {
        id: "e1",
        type: "multiple-choice",
        question: "Which letter is 'A'?",
        questionAudio: "Which letter is A?",
        options: ["A", "B", "C", "D"],
        correctAnswer: "A",
        explanation: "This is the letter A",
        difficulty: "easy",
      },
      {
        id: "e2",
        type: "multiple-choice",
        question: "What is this? 🐱",
        questionAudio: "What is this?",
        options: ["Cat", "Dog", "Bird", "Fish"],
        correctAnswer: "Cat",
        explanation: "This is a cat",
        difficulty: "easy",
      },
    ];
  }
}

/**
 * 🔄 REPLACE WITH SLM
 * Check quiz answer and provide feedback
 */
export async function checkQuizAnswer(
  question: QuizQuestion,
  userAnswer: string
): Promise<{
  correct: boolean;
  feedback: string;
  encouragement: string;
}> {
  const isCorrect = Array.isArray(question.correctAnswer)
    ? question.correctAnswer.includes(userAnswer)
    : question.correctAnswer === userAnswer;

  // For prototype, use simple feedback
  // Later: use SLM for personalized, empathetic feedback
  return {
    correct: isCorrect,
    feedback: isCorrect
      ? question.explanation || "Correct!"
      : `The correct answer is: ${question.correctAnswer}`,
    encouragement: isCorrect
      ? "Great job! Keep going! 🎉"
      : "Don't worry, practice makes perfect! 💪",
  };
}

// ============================================================
// SUBJECT TUTORING (MATH, SCIENCE, ETC.)
// ============================================================

export interface TutoringContext {
  subject: string;
  chapter: string;
  language: "hindi" | "english";
  userQuestion: string;
  chatHistory?: Array<{ role: "user" | "assistant"; content: string }>;
}

/**
 * 🔄 REPLACE WITH SLM
 * Main tutoring function for subject questions (Math, Science, etc.)
 */
export async function getTutoringResponse(context: TutoringContext): Promise<string> {
  const languageInstruction =
    context.language === "hindi"
      ? "Respond in Hindi (Devanagari script) with simple explanations suitable for rural students."
      : "Respond in simple English suitable for rural students.";

  const historyContext = context.chatHistory
    ? context.chatHistory.slice(-4).map((msg) => `${msg.role}: ${msg.content}`).join("\n")
    : "";

  const prompt = `You are an AI tutor (AI Sathi) for Indian students learning ${context.subject}.

Current Topic: ${context.chapter}
${languageInstruction}

Context from previous messages:
${historyContext}

Student Question: ${context.userQuestion}

Instructions:
- Explain concepts step-by-step in simple language
- Use examples from rural Indian daily life (farming, markets, local festivals)
- For math: show working clearly, use examples with rupees, meters, kilograms
- For science: relate to everyday observations
- Be encouraging and patient
- Keep answers concise (2-3 paragraphs max)
- Use emojis sparingly for engagement

Answer:`;

  try {
    const response = await callGemini(prompt);
    return response;
  } catch (error) {
    console.error("Tutoring response failed:", error);
    // Fallback response
    return context.language === "hindi"
      ? "माफ़ करें, मैं अभी जवाब नहीं दे सकता। कृपया दोबारा कोशिश करें। 🙏"
      : "Sorry, I cannot answer right now. Please try again. 🙏";
  }
}

/**
 * Simple math expression evaluator (for quick calculations)
 * Use this for basic arithmetic before calling AI
 */
export function evaluateMathExpression(expression: string): number | null {
  try {
    // Sanitize input - allow only numbers, operators, parentheses, and spaces
    const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, "");
    
    // Check for balanced parentheses
    let balance = 0;
    for (const char of sanitized) {
      if (char === "(") balance++;
      if (char === ")") balance--;
      if (balance < 0) return null;
    }
    if (balance !== 0) return null;

    // Evaluate using Function constructor (safer than eval)
    const result = new Function(`return ${sanitized}`)();
    
    if (typeof result === "number" && !isNaN(result) && isFinite(result)) {
      return result;
    }
    return null;
  } catch {
    return null;
  }
}

export default {
  scoreLiteracyAssessment,
  generateQuizQuestions,
  checkQuizAnswer,
  getTutoringResponse,
  evaluateMathExpression,
};
