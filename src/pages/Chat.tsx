import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { useVoiceInput } from "@/hooks/useVoiceInput";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { chapterContent } from "@/data/chapterContent";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const location = useLocation();
  const locationPipeline = location.state?.pipeline;
  const context = location.state?.context; // Get the context (subject, chapter)
  const { aiPipeline: contextPipeline, language, translate } = useLanguage();
  const aiPipeline = locationPipeline || contextPipeline;
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI tutor. Ask me anything about your lesson or share your doubts!",
    },
  ]);
  const [input, setInput] = useState("");
  const [placeholder, setPlaceholder] = useState("Type your question...");
  const [isLoading, setIsLoading] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Voice input hook
  const voiceInput = useVoiceInput(language);

  // Text-to-speech hook
  const tts = useTextToSpeech(language);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update welcome message and placeholder when language changes OR context changes
  useEffect(() => {
    const updateTranslations = async () => {
      let welcomeText = "Hello! I'm your AI tutor. Ask me anything about your lesson or share your doubts!";

      // Customize welcome message if context exists
      if (context?.subject && context?.chapter) {
        const subjectContent = (chapterContent as any)[context.subject];
        if (subjectContent && subjectContent[context.chapter]) {
          welcomeText = `Hello! I'm your AI tutor for ${context.subject}. I'm ready to help you with the chapter on this topic. Ask me anything!`;
        }
      }

      const placeholderText = "Type your question...";

      const translatedWelcome = await translate(welcomeText);
      const translatedPlaceholder = await translate(placeholderText);

      setPlaceholder(translatedPlaceholder);

      // Update welcome message if it's the first message
      setMessages(prev => {
        if (prev.length > 0 && prev[0].role === 'assistant') {
          const newMessages = [...prev];
          newMessages[0] = { ...newMessages[0], content: translatedWelcome };
          return newMessages;
        }
        return prev;
      });
    };

    updateTranslations();
  }, [language, translate, context]);

  const getAIResponse = async (userMessage: string): Promise<string> => {
    // If AI pipeline is available, use it for intelligent responses
    if (aiPipeline) {
      try {
        let contextText = "";
        if (context?.subject && context?.chapter) {
          const subjectData = (chapterContent as any)[context.subject];
          if (subjectData) {
            contextText = subjectData[context.chapter] || "";
          }
        }

        // Debug: Print retrieved chunk with detailed information
        console.log("=== RAG DEBUG INFO ===");
        console.log("Subject:", context?.subject);
        console.log("Chapter:", context?.chapter);
        console.log("Retrieved Chunk Length:", contextText?.length || 0);
        console.log("Retrieved Chunk Preview:", contextText ? contextText.substring(0, 200) + "..." : "EMPTY");
        console.log("Full Retrieved Chunk:", contextText);
        console.log("======================");

        const systemPrompts = {
          en: `You are an AI tutor for NCERT Class V ${context?.subject || 'Maths and Science'}.

CRITICAL RULES - YOU MUST FOLLOW THESE STRICTLY:
1. Answer ONLY using information from the Context below
2. If the Context does not contain the answer, you MUST say: "I don't have information about that in this chapter. Can you ask me something else about this topic?"
3. NEVER use any knowledge outside the provided Context
4. NEVER make up information or use general knowledge

Context (NCERT Class V Curriculum):
${contextText || "No specific chapter context available."}

TEACHING STYLE:
- Use simple words that a 10-year-old can understand
- Be warm, friendly, and encouraging
- Break down complex ideas into small, easy steps
- Use examples from everyday life when explaining
- Praise the student for asking questions
- If explaining a concept, ask if they understood at the end`,

          hi: `आप NCERT कक्षा V ${context?.subject || 'गणित और विज्ञान'} के लिए एक AI शिक्षक हैं।

महत्वपूर्ण नियम - आपको इनका सख्ती से पालन करना होगा:
1. केवल नीचे दिए गए संदर्भ की जानकारी का उपयोग करके उत्तर दें
2. यदि संदर्भ में उत्तर नहीं है, तो आपको कहना होगा: "मेरे पास इस अध्याय में इसके बारे में जानकारी नहीं है। क्या आप मुझसे इस विषय के बारे में कुछ और पूछ सकते हैं?"
3. प्रदान किए गए संदर्भ के बाहर किसी भी ज्ञान का उपयोग न करें
4. कभी भी जानकारी न बनाएं या सामान्य ज्ञान का उपयोग न करें

संदर्भ (NCERT कक्षा V पाठ्यक्रम):
${contextText || "कोई विशिष्ट अध्याय संदर्भ उपलब्ध नहीं है।"}

शिक्षण शैली:
- सरल शब्दों का प्रयोग करें जो 10 साल का बच्चा समझ सके
- गर्मजोशी, मित्रवत और प्रोत्साहक बनें
- जटिल विचारों को छोटे, आसान चरणों में तोड़ें
- समझाते समय रोजमर्रा की जिंदगी के उदाहरण दें
- प्रश्न पूछने के लिए छात्र की प्रशंसा करें`,

          kn: `ನೀವು NCERT ತರಗತಿ V ${context?.subject || 'ಗಣಿತ ಮತ್ತು ವಿಜ್ಞಾನ'} ಗಾಗಿ AI ಶಿಕ್ಷಕರು.

ಮುಖ್ಯ ನಿಯಮಗಳು - ನೀವು ಇವುಗಳನ್ನು ಕಟ್ಟುನಿಟ್ಟಾಗಿ ಅನುಸರಿಸಬೇಕು:
1. ಕೆಳಗಿನ ಸಂದರ್ಭದ ಮಾಹಿತಿಯನ್ನು ಮಾತ್ರ ಬಳಸಿಕೊಂಡು ಉತ್ತರಿಸಿ
2. ಸಂದರ್ಭದಲ್ಲಿ ಉತ್ತರವಿಲ್ಲದಿದ್ದರೆ, ನೀವು ಹೇಳಬೇಕು: "ಈ ಅಧ್ಯಾಯದಲ್ಲಿ ಅದರ ಬಗ್ಗೆ ನನ್ನ ಬಳಿ ಮಾಹಿತಿ ಇಲ್ಲ. ಈ ವಿಷಯದ ಬಗ್ಗೆ ನೀವು ನನಗೆ ಬೇರೆ ಏನಾದರೂ ಕೇಳಬಹುದೇ?"
3. ಒದಗಿಸಿದ ಸಂದರ್ಭದ ಹೊರಗಿನ ಯಾವುದೇ ಜ್ಞಾನವನ್ನು ಬಳಸಬೇಡಿ
4. ಎಂದಿಗೂ ಮಾಹಿತಿಯನ್ನು ರಚಿಸಬೇಡಿ ಅಥವಾ ಸಾಮಾನ್ಯ ಜ್ಞಾನವನ್ನು ಬಳಸಬೇಡಿ

ಸಂದರ್ಭ (NCERT ತರಗತಿ V ಪಠ್ಯಕ್ರಮ):
${contextText || "ಯಾವುದೇ ನಿರ್ದಿಷ್ಟ ಅಧ್ಯಾಯ ಸಂದರ್ಭ ಲಭ್ಯವಿಲ್ಲ."}

ಬೋಧನಾ ಶೈಲಿ:
- 10 ವರ್ಷದ ಮಗು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಬಹುದಾದ ಸರಳ ಪದಗಳನ್ನು ಬಳಸಿ
- ಬೆಚ್ಚಗಿನ, ಸ್ನೇಹಪರ ಮತ್ತು ಪ್ರೋತ್ಸಾಹಕರಾಗಿರಿ
- ಸಂಕೀರ್ಣ ವಿಚಾರಗಳನ್ನು ಸಣ್ಣ, ಸುಲಭ ಹಂತಗಳಾಗಿ ವಿಭಜಿಸಿ
- ವಿವರಿಸುವಾಗ ದೈನಂದಿನ ಜೀವನದ ಉದಾಹರಣೆಗಳನ್ನು ಬಳಸಿ
- ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿದ್ದಕ್ಕಾಗಿ ವಿದ್ಯಾರ್ಥಿಯನ್ನು ಹೊಗಳಿ`
        };

        const messages = [
          { role: "system", content: systemPrompts[language] || systemPrompts['en'] },
          { role: "user", content: userMessage }
        ];

        const result = await aiPipeline.chat.completions.create({
          messages,
          temperature: 0.7,
          max_tokens: 150,
        });

        return result.choices[0].message.content || "I'm having trouble understanding. Can you rephrase that?";
      } catch (error) {
        console.error("AI generation error:", error);
        // Fall through to rule-based responses
      }
    }

    // Fallback: Rule-based responses
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("add") || lowerMessage.includes("plus") || lowerMessage.includes("जोड़")) {
      return "Great! Let's learn addition (जोड़ना).\n\nWhen we add numbers, we put them together. For example:\n5 + 3 = 8\n\nTry this: What is 12 + 7?";
    }

    if (lowerMessage.includes("multiply") || lowerMessage.includes("times") || lowerMessage.includes("गुणा")) {
      return "Wonderful! Multiplication (गुणा) is repeated addition.\n\nFor example: 4 × 3 means adding 4 three times:\n4 + 4 + 4 = 12\n\nSo 4 × 3 = 12\n\nTry: What is 5 × 6?";
    }

    if (lowerMessage.includes("fraction") || lowerMessage.includes("half") || lowerMessage.includes("भिन्न")) {
      return "Fractions (भिन्न) show parts of a whole!\n\n1/2 means one part out of two equal parts (half)\n1/4 means one part out of four equal parts (quarter)\n\nIf you have 1 roti and cut it into 4 equal pieces, each piece is 1/4 of the roti! 🍞\n\nWhat fraction questions do you have?";
    }

    if (/\d+\s*[\+\-\*\/]\s*\d+/.test(lowerMessage)) {
      try {
        const result = eval(lowerMessage.replace(/[^\d\+\-\*\/\(\)]/g, ''));
        return `Great question! Let me help you solve this step by step.\n\nThe answer is: ${result}\n\nWould you like me to explain how we got this answer?`;
      } catch {
        return "I can help you with that! Can you write it in this format: number + number (like 5 + 3)?";
      }
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("मदद")) {
      return "I'm here to help you learn! 🌟\n\nI can teach you:\n• Addition (जोड़ना)\n• Subtraction (घटाना)\n• Multiplication (गुणा)\n• Division (भाग)\n• Fractions (भिन्न)\n\nJust ask me about any topic or give me a math problem to solve!";
    }

    return "That's a great question! I can help you with Grade 5 Maths topics like addition, subtraction, multiplication, division, and fractions. What would you like to learn about? 📚";
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const aiResponse = await getAIResponse(userMessage.content);
      const assistantMessage: Message = { role: "assistant", content: aiResponse };
      setMessages((prev) => [...prev, assistantMessage]);

      // Speak the AI response if autoSpeak is enabled
      if (autoSpeak && tts.isSupported) {
        setTimeout(() => tts.speak(aiResponse), 300);
      }
    } catch (error) {
      console.error("Error getting response:", error);
      toast.error("Sorry, I had trouble understanding. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Effect to handle voice input transcript
  useEffect(() => {
    if (voiceInput.transcript && !voiceInput.isProcessing) {
      setInput(voiceInput.transcript);
      voiceInput.clearTranscript();
    }
  }, [voiceInput.transcript, voiceInput.isProcessing]);

  // Effect to show voice input errors
  useEffect(() => {
    if (voiceInput.error) {
      toast.error(voiceInput.error);
    }
  }, [voiceInput.error]);

  const handleVoiceInput = () => {
    if (voiceInput.isRecording) {
      voiceInput.stopRecording();
    } else {
      voiceInput.startRecording();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-background to-primary/5">
      {/* Header */}
      <div className="bg-card shadow-[var(--shadow-soft)] border-b border-border px-4 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/subjects")}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-semibold text-foreground">AI Sathi</h1>
          <p className="text-xs text-success flex items-center gap-1">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
            {aiPipeline ? "AI Ready (Offline)" : "Basic Mode"}
          </p>
          {context?.subject && context?.chapter && (
            <p className="text-xs text-primary font-medium mt-0.5">
              📚 {context.subject} - {context.chapter}
            </p>
          )}
        </div>
        <LanguageSelector />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} role={message.role} content={message.content} />
        ))}
        {isLoading && (
          <div className="flex gap-2 p-4 rounded-2xl bg-card shadow-[var(--shadow-soft)]">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-card border-t border-border p-4">
        {/* Voice input status */}
        {(voiceInput.isRecording || voiceInput.isProcessing) && (
          <div className="mb-3 p-3 bg-primary/10 rounded-xl border border-primary/20">
            <div className="flex items-center gap-2 text-sm text-primary">
              {voiceInput.isRecording && (
                <>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Recording... Tap mic to stop</span>
                </>
              )}
              {voiceInput.isProcessing && (
                <>
                  <div className="w-2 h-2 bg-primary rounded-full animate-spin"></div>
                  <span>Transcribing speech...</span>
                </>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {/* Voice Input Button */}
          <Button
            onClick={handleVoiceInput}
            disabled={isLoading || voiceInput.isProcessing}
            size="icon"
            variant={voiceInput.isRecording ? "default" : "outline"}
            className={`h-[60px] w-[60px] rounded-2xl transition-all ${voiceInput.isRecording
              ? 'bg-destructive hover:bg-destructive/90 animate-pulse'
              : 'hover:bg-primary/10'
              }`}
          >
            {voiceInput.isRecording ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </Button>

          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="min-h-[60px] max-h-[120px] resize-none rounded-2xl"
            disabled={isLoading || voiceInput.isRecording}
          />

          {/* TTS Toggle Button */}
          <Button
            onClick={() => setAutoSpeak(!autoSpeak)}
            size="icon"
            variant="outline"
            className={`h-[60px] w-[60px] rounded-2xl transition-all ${autoSpeak ? 'bg-primary/10 border-primary/20' : ''
              }`}
            title={autoSpeak ? "Auto-speak enabled" : "Auto-speak disabled"}
          >
            {autoSpeak ? (
              <Volume2 className="w-5 h-5 text-primary" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </Button>

          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="h-[60px] w-[60px] rounded-2xl bg-gradient-to-br from-primary to-secondary hover:shadow-lg transition-all"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
