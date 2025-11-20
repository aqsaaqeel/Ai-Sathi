import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { aiPipeline } = useLanguage();
  
  // Get models from context (primary source) or navigation state (fallback)
  const pipelines = aiPipeline || location.state?.pipeline;
  const mathModel = pipelines?.mathModel;
  const textModel = pipelines?.textModel;
  
  // Debug logging
  useEffect(() => {
    console.log("🔍 Chat Component - Debug Info:");
    console.log("aiPipeline from context:", aiPipeline);
    console.log("pipeline from location.state:", location.state?.pipeline);
    console.log("Final pipelines object:", pipelines);
    console.log("Math Model loaded:", mathModel ? "✅" : "❌");
    console.log("Text Model loaded:", textModel ? "✅" : "❌");
  }, [aiPipeline, location.state, pipelines, mathModel, textModel]);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "नमस्ते! Hello! I'm your AI Sathi. I can help you learn Grade 5 Maths. Ask me anything about addition, subtraction, multiplication, division, or fractions! 😊",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentModel, setCurrentModel] = useState<"math" | "text" | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Determine if question is math-related
  const isMathQuestion = (message: string): boolean => {
    const lowerMessage = message.toLowerCase();
    
    // Check for math operations or numbers
    if (/\d+\s*[\+\-\*×÷\/]\s*\d+/.test(message)) return true;
    
    // Check for math keywords
    const mathKeywords = [
      'add', 'addition', 'plus', 'sum', 'जोड़', 'total',
      'subtract', 'subtraction', 'minus', 'difference', 'घटा', 'take away',
      'multiply', 'multiplication', 'times', 'product', 'गुणा',
      'divide', 'division', 'भाग', 'quotient',
      'fraction', 'भिन्न', 'half', 'quarter', 'third',
      'calculate', 'solve', 'answer', 'equal', '=',
      'number', 'digit', 'place value', 'tens', 'hundreds', 'ones',
      'greater', 'less', 'compare', 'bigger', 'smaller'
    ];
    
    return mathKeywords.some(keyword => lowerMessage.includes(keyword));
  };

  const getAIResponse = async (userMessage: string): Promise<string> => {
    const isMath = isMathQuestion(userMessage);
    
    // If AI models are available, use them for intelligent responses
    if (mathModel && textModel) {
      try {
        if (isMath) {
          // Use Math Model (Flan-T5) for calculations and math problems
          setCurrentModel("math");
          console.log("🔢 Using MATH model for:", userMessage);
          
          const prompt = `Solve this math problem for a Grade 5 student. Explain step-by-step in simple language.

Question: ${userMessage}

Answer:`;

          const result = await mathModel(prompt, {
            max_new_tokens: 150,
            temperature: 0.3,
            do_sample: false,
          });
          
          return (result as any)[0].generated_text || "I'm having trouble with that calculation. Can you rephrase?";
          
        } else {
          // Use Text Model (TinyLlama) for explanations and conversations
          setCurrentModel("text");
          console.log("💬 Using TEXT model for:", userMessage);
          
          // Build conversation context from recent messages (last 3 exchanges)
          const recentMessages = messages.slice(-6); // Last 3 user + 3 assistant messages
          let conversationContext = "";
          
          recentMessages.forEach(msg => {
            if (msg.role === "user") {
              conversationContext += `Student: ${msg.content}\n`;
            } else {
              conversationContext += `Teacher: ${msg.content}\n`;
            }
          });
          
          // Format for Qwen chat with conversation context
          const prompt = `<|im_start|>system
You are AI Sathi, a friendly and patient tutor for Grade 5 NCERT Maths in India. 
- Answer in simple language that a 10-year-old can understand
- Use both English and Hindi terms when helpful
- Keep responses short (3-5 sentences), encouraging, and grade-appropriate
- When student asks "yes" or "explain", provide the explanation they're asking for
- Use examples from daily life (rotis, rupees, cricket, etc)
- Always be encouraging and supportive<|im_end|>
<|im_start|>user
Previous conversation:
${conversationContext}

Current question: ${userMessage}<|im_end|>
<|im_start|>assistant
`;

          const result = await textModel(prompt, {
            max_new_tokens: 250,
            temperature: 0.7,
            do_sample: true,
            top_p: 0.9,
          });
          
          // Extract just the assistant's response
          let response = (result as any)[0].generated_text || "";
          response = response.replace(prompt, "").trim();
          response = response.replace(/<\|im_end\|>/g, "").trim();
          response = response.replace(/<\|im_start\|>/g, "").trim();
          
          // If response is too short or empty, provide a better fallback
          if (!response || response.length < 20) {
            return "I'm here to help! Could you please be more specific about what you'd like to learn? For example, you can ask me about addition, subtraction, multiplication, division, or fractions! 😊";
          }
          
          return response;
        }
      } catch (error) {
        console.error("AI generation error:", error);
        setCurrentModel(null);
        // Fall through to rule-based responses
      }
    }
    
    // Fallback: Rule-based responses (when models aren't loaded)
    const lowerMessage = userMessage.toLowerCase();
    
    // Check if asking for explanation after a calculation
    if ((lowerMessage === "yes" || lowerMessage.includes("explain") || lowerMessage.includes("how")) && messages.length >= 2) {
      const lastAssistant = messages[messages.length - 1];
      if (lastAssistant.role === "assistant" && lastAssistant.content.includes("answer is:")) {
        // Extract the calculation from previous messages
        const lastUser = messages[messages.length - 2];
        const calcMatch = lastUser.content.match(/(\d+)\s*([\+\-\*\/×÷])\s*(\d+)/);
        if (calcMatch) {
          const [, a, op, b] = calcMatch;
          const operations = {
            '+': { name: 'Addition', hindi: 'जोड़', explain: `we put ${a} and ${b} together` },
            '-': { name: 'Subtraction', hindi: 'घटाना', explain: `we take away ${b} from ${a}` },
            '*': { name: 'Multiplication', hindi: 'गुणा', explain: `we add ${a}, ${b} times` },
            '×': { name: 'Multiplication', hindi: 'गुणा', explain: `we add ${a}, ${b} times` },
            '/': { name: 'Division', hindi: 'भाग', explain: `we split ${a} into ${b} equal parts` },
            '÷': { name: 'Division', hindi: 'भाग', explain: `we split ${a} into ${b} equal parts` },
          };
          const opInfo = operations[op as keyof typeof operations];
          if (opInfo) {
            return `Great! Let me explain how we solve ${a} ${op} ${b}:\n\n${opInfo.name} (${opInfo.hindi}) means ${opInfo.explain}.\n\n${lastUser.content} = ${eval(`${a}${op.replace('×','*').replace('÷','/')}${b}`)}\n\nDo you understand now? Feel free to ask more questions! 😊`;
          }
        }
      }
    }
    
    if (lowerMessage.includes("add") || lowerMessage.includes("plus") || lowerMessage.includes("जोड़")) {
      return "Great! Let's learn addition (जोड़ना).\n\nWhen we add numbers, we put them together. For example:\n5 + 3 = 8\n\nTry this: What is 12 + 7?";
    }
    
    if (lowerMessage.includes("multiply") || lowerMessage.includes("times") || lowerMessage.includes("गुणा")) {
      return "Wonderful! Multiplication (गुणा) is repeated addition.\n\nFor example: 4 × 3 means adding 4 three times:\n4 + 4 + 4 = 12\n\nSo 4 × 3 = 12\n\nTry: What is 5 × 6?";
    }
    
    if (lowerMessage.includes("fraction") || lowerMessage.includes("half") || lowerMessage.includes("भिन्न")) {
      return "Fractions (भिन्न) show parts of a whole!\n\n1/2 means one part out of two equal parts (half)\n1/4 means one part out of four equal parts (quarter)\n\nIf you have 1 roti and cut it into 4 equal pieces, each piece is 1/4 of the roti! 🍞\n\nWhat fraction questions do you have?";
    }
    
    if (/\d+\s*[\+\-\*\/×÷]\s*\d+/.test(userMessage)) {
      try {
        const cleanExpr = userMessage.replace(/[^\d\+\-\*\/\(\)×÷]/g, '').replace(/×/g, '*').replace(/÷/g, '/');
        const result = eval(cleanExpr);
        return `Great question! Let me help you solve this step by step.\n\nThe answer is: ${result}\n\nWould you like me to explain how we got this answer?`;
      } catch {
        return "I can help you with that! Can you write it in this format: number + number (like 5 + 3)?";
      }
    }
    
    if (lowerMessage.includes("help") || lowerMessage.includes("मदद")) {
      return "I'm here to help you learn! 🌟\n\nI can teach you:\n• Addition (जोड़ना)\n• Subtraction (घटाना)\n• Multiplication (गुणा)\n• Division (भाग)\n• Fractions (भिन्न)\n\nJust ask me about any topic or give me a math problem to solve!";
    }
    
    // Check for general questions like "yes", "no", "ok", etc.
    if (/^(yes|yeah|ok|okay|sure|no|nah)$/i.test(lowerMessage.trim())) {
      return "I'm here to help! What would you like to learn about? You can ask me:\n• Math problems (like 5 + 3)\n• Concepts (like 'what is multiplication?')\n• Explanations (like 'explain fractions')\n\nGo ahead, I'm listening! 😊";
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

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-background to-primary/5">
      {/* Header */}
      <div className="bg-card shadow-[var(--shadow-soft)] border-b border-border px-4 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-semibold text-foreground">AI Sathi</h1>
          <p className="text-xs text-success flex items-center gap-1">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
            {mathModel && textModel ? (
              currentModel === "math" ? "🔢 Math Mode (Offline)" : 
              currentModel === "text" ? "💬 Explain Mode (Offline)" : 
              "AI Ready (Offline)"
            ) : "Basic Mode"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Debug Info - Remove in production */}
        {!mathModel || !textModel ? (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl">
            <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ AI Models Status:</p>
            <p className="text-xs text-yellow-700 dark:text-yellow-300">
              Math Model: {mathModel ? "✅ Loaded" : "❌ Not Loaded"}<br/>
              Text Model: {textModel ? "✅ Loaded" : "❌ Not Loaded"}<br/>
              <span className="mt-1 block italic">Using rule-based responses for now.</span>
            </p>
          </div>
        ) : (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
            <p className="text-xs text-green-700 dark:text-green-300">
              ✅ Both AI models loaded successfully! Fully offline mode active.
            </p>
          </div>
        )}
        
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
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about maths..."
            className="min-h-[60px] max-h-[120px] resize-none rounded-2xl"
            disabled={isLoading}
          />
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
