import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Loader2, MessageCircle } from "lucide-react";
import { useAI } from "@/hooks/useAI";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIOnboardingAssistantProps {
  currentStepTitle?: string;
  currentFieldLabel?: string;
  serviceType?: "ads" | "website" | "organic";
}

const WELCOME_MESSAGES: Record<string, string> = {
  ads: "Hi! I'm your AI marketing assistant. I can help you fill out your ad campaign onboarding — just ask me anything about your target audience, budget, goals, or what to enter in any field.",
  website: "Hi! I'm your AI assistant for your website project. Ask me anything — what to write for your tagline, how to describe your services, or what makes a great website brief.",
  organic: "Hi! I'm your AI social media assistant. I can help you define your brand voice, suggest content pillars, or explain what any field means. Just ask!",
};

export const AIOnboardingAssistant = ({
  currentStepTitle,
  currentFieldLabel,
  serviceType = "ads",
}: AIOnboardingAssistantProps) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGES[serviceType] },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { generate, loading, result, reset } = useAI();

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // When AI result comes back, append to messages
  useEffect(() => {
    if (result && !loading) {
      setMessages((prev) => {
        // Avoid duplicate appends
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.content === result) return prev;
        return [...prev, { role: "assistant", content: result }];
      });
      setIsTyping(false);
      reset();
    }
  }, [result, loading]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    reset();

    // Build context string from conversation history
    const history = messages
      .map((m) => `${m.role === "user" ? "Client" : "Assistant"}: ${m.content}`)
      .join("\n");

    generate("onboarding_assistant", {
      service_type: serviceType,
      current_step: currentStepTitle || "General",
      current_field: currentFieldLabel || "General",
      conversation_history: history,
      user_question: trimmed,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const accentColor =
    serviceType === "website" ? "text-secondary" :
    serviceType === "organic" ? "text-green-400" :
    "text-accent";

  const accentBg =
    serviceType === "website" ? "bg-secondary" :
    serviceType === "organic" ? "bg-green-400" :
    "bg-accent";

  const borderColor =
    serviceType === "website" ? "border-secondary/30" :
    serviceType === "organic" ? "border-green-400/30" :
    "border-accent/30";

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            type="button"
            onClick={() => setOpen(true)}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl ${accentBg} text-black font-semibold text-sm shadow-lg hover:opacity-90 transition-opacity`}
          >
            <Sparkles className="w-4 h-4" />
            Ask AI Assistant
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-6 right-6 z-50 w-[340px] sm:w-[380px] flex flex-col rounded-2xl border ${borderColor} bg-card shadow-2xl overflow-hidden`}
            style={{ maxHeight: "520px" }}
          >
            {/* Header */}
            <div className={`flex items-center justify-between px-4 py-3 border-b border-border`}>
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-lg ${accentBg} flex items-center justify-center`}>
                  <Sparkles className="w-4 h-4 text-black" />
                </div>
                <div>
                  <div className="font-display font-bold text-foreground text-sm">AI Assistant</div>
                  <div className="text-[10px] text-muted-foreground">Here to help with your onboarding</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Context pill */}
            {currentStepTitle && (
              <div className="px-4 py-2 bg-muted/50 border-b border-border">
                <span className="text-[10px] text-muted-foreground">
                  Current step: <span className={`font-semibold ${accentColor}`}>{currentStepTitle}</span>
                  {currentFieldLabel && <> — {currentFieldLabel}</>}
                </span>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? `${accentBg} text-black font-medium`
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl px-4 py-2.5 flex items-center gap-1.5">
                    <Loader2 className={`w-3 h-3 ${accentColor} animate-spin`} />
                    <span className="text-xs text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick prompts */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {[
                  "What should I enter here?",
                  "Give me an example",
                  "What's a good budget?",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => { setInput(prompt); setTimeout(() => inputRef.current?.focus(), 50); }}
                    className={`text-[11px] px-3 py-1.5 rounded-full border ${borderColor} ${accentColor} hover:bg-accent/10 transition-colors`}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className={`w-9 h-9 rounded-xl ${accentBg} flex items-center justify-center disabled:opacity-40 transition-opacity`}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 text-black animate-spin" />
                ) : (
                  <Send className="w-4 h-4 text-black" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIOnboardingAssistant;
