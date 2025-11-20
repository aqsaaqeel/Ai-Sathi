/**
 * SEARCH SERVICE
 * 
 * Provides question-answering functionality for students
 * Uses Gemini AI to answer questions (Google Search can be added later)
 */

import { getTutoringResponse } from "./geminiService";

/**
 * Answer a student's question using AI
 * For now, uses Gemini. Can be extended with Google Search later.
 */
export async function answerQuestionSimple(
  question: string,
  language: string = "en",
  subject?: string
): Promise<string> {
  try {
    // Map language codes to what getTutoringResponse expects
    const langMap: { [key: string]: "hindi" | "english" } = {
      hi: "hindi",
      kn: "english", // Kannada not supported by TutoringContext yet, use English
      en: "english",
    };

    const mappedLang = langMap[language] || "english";

    return await getTutoringResponse({
      subject: subject || "General",
      chapter: "Student Question",
      userQuestion: question,
      language: mappedLang,
      chatHistory: [],
    });
  } catch (error) {
    const errorMessages: { [key: string]: string } = {
      en: "Sorry, I couldn't answer right now. Please try again!",
      hi: "क्षमा करें, मैं अभी उत्तर नहीं दे सका। कृपया पुनः प्रयास करें!",
      kn: "ಕ್ಷಮಿಸಿ, ನಾನು ಈಗ ಉತ್ತರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ!",
    };
    return errorMessages[language] || errorMessages.en;
  }
}
