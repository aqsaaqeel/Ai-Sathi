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

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const location = useLocation();
  const locationPipeline = location.state?.pipeline;
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

  // Update welcome message and placeholder when language changes
  useEffect(() => {
    const updateTranslations = async () => {
      const welcomeText = "Hello! I'm your AI tutor. Ask me anything about your lesson or share your doubts!";
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
  }, [language, translate]);

  const getAIResponse = async (userMessage: string): Promise<string> => {
    // If AI pipeline is available, use it for intelligent responses
    if (aiPipeline) {
      try {
        const prompt = `You are AI Sathi, a helpful tutor for Grade 5 NCERT Maths in India. 
Answer in simple language, using both English and Hindi terms when helpful.
Focus on: addition (जोड़ना), subtraction (घटाना), multiplication (गुणा), division (भाग), and fractions (भिन्न).
Keep responses short, encouraging, and grade-appropriate.

Student question: ${userMessage}

Answer:`;

        const result = await aiPipeline(prompt, {
          max_new_tokens: 150,
          temperature: 0.7,
          do_sample: true,
        });

        return (result as any)[0].generated_text || "I'm having trouble understanding. Can you rephrase that?";
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
