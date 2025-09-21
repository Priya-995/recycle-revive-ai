import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI waste segregation assistant! Ask me anything about proper waste disposal. For example: 'Where does plastic go?' or 'How to dispose batteries?'",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const simulateAIResponse = async (question: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('plastic')) {
      return "Plastic items go in the DRY WASTE bin! 🗑️ Clean them first and remove labels. You earn 5 green points!";
    } else if (lowerQuestion.includes('paper')) {
      return "Paper goes in DRY WASTE bin! 📄 But wet/dirty paper goes to wet waste. You earn 3 green points!";
    } else if (lowerQuestion.includes('organic') || lowerQuestion.includes('food')) {
      return "Organic/food waste goes in WET WASTE bin! 🥬 Perfect for composting. You earn 4 green points!";
    } else if (lowerQuestion.includes('battery') || lowerQuestion.includes('electronic')) {
      return "E-waste needs special handling! 🔋 Take to nearest e-waste collection center. You earn 10 green points!";
    } else if (lowerQuestion.includes('glass')) {
      return "Glass goes in DRY WASTE bin! 🫙 But be careful with broken glass - wrap it safely first. You earn 4 green points!";
    } else if (lowerQuestion.includes('metal')) {
      return "Metal cans and containers go in DRY WASTE bin! 🥫 Clean them first for better recycling. You earn 6 green points!";
    } else {
      return "Great question! Generally: Plastic/Paper/Glass/Metal = Dry waste, Food/Organic = Wet waste, Electronics/Batteries = E-waste collection. You earn 2 green points for asking!";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await simulateAIResponse(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "❌ AI is taking a break. Try asking: 'Where does plastic go?'",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const TypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-3 p-4"
    >
      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
        <Bot className="w-4 h-4 text-primary" />
      </div>
      <div className="typing-indicator">
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card-hover p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Bot className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">🤖 AI Waste Assistant</h2>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Ask me anything about waste segregation!
      </p>

      <div className="h-80 overflow-y-auto mb-4 space-y-4 rounded-xl bg-muted/20 p-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 ${
                message.type === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-primary/20'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4 text-primary" />
                )}
              </div>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'glass-card'
                }`}
              >
                <div className="text-sm leading-relaxed">{message.content}</div>
                <div className="text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </motion.div>
            </motion.div>
          ))}
          
          {isTyping && <TypingIndicator />}
        </AnimatePresence>
      </div>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask: 'Where should I throw this plastic bottle?'"
          className="flex-1 bg-muted/50 border-primary/20 focus:border-primary"
          disabled={isTyping}
        />
        
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className="btn-primary"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default AIAssistant;