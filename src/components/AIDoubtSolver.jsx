import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Lightbulb, 
  Calculator, 
  Languages, 
  HelpCircle, 
  Zap, 
  Copy, 
  Check, 
  RotateCcw,
  BookOpen
} from 'lucide-react';

export default function AIDoubtSolver({ initialContext, onClearInitialContext }) {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Namaste! I am **PrepBot AI**, your 24/7 exam preparation tutor. Ask me any doubt in Reasoning, Quant, General Studies, or English. I can break down step-by-step math steps, provide shortcut memory tricks, or generate similar practice questions!',
      timestamp: 'Just now'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const chatBottomRef = useRef(null);

  // If initialContext comes from Mock Test or Notes, auto insert message
  useEffect(() => {
    if (initialContext) {
      const userPrompt = `Can you explain this question step-by-step and provide a memory trick?\n\nContext:\n${initialContext}`;
      handleSendMessage(userPrompt);
      if (onClearInitialContext) onClearInitialContext();
    }
  }, [initialContext]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    { label: '💡 Explain Step-by-Step', prompt: 'Explain the concept of Syllogisms and Either-Or cases step-by-step.' },
    { label: '⚡ Speed Shortcut Trick', prompt: 'Give me the fastest shortcut formula for Dishonest Shopkeeper profit % math.' },
    { label: '🏛️ Articles 12-35 Writs', prompt: 'Explain all 5 Constitutional Writs in simple points for UPSC Prelims.' },
    { label: '🎯 Practice Question', prompt: 'Generate 2 high-yield practice questions on Coding-Decoding with solutions.' }
  ];

  const handleSendMessage = (textToSend = inputText) => {
    if (!textToSend || !textToSend.trim()) return;

    const userMsg = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Dynamic AI response generator logic
    setTimeout(() => {
      let aiResponseText = '';
      const lower = textToSend.toLowerCase();

      if (lower.includes('syllogism') || lower.includes('either')) {
        aiResponseText = `### Syllogism & Either-Or Case Mastery Rules

**Rule 1: Standard Venn Overlap**
- 'All A are B' means circle A is entirely inside circle B.
- 'Some A are B' means circles A & B intersect.

**Rule 2: The 'Either-Or' Complementary Pair Conditions**
To select 'Either Conclusion 1 or 2 follows', ALL THREE conditions must hold:
1. Both individual conclusions are **False / Uncertain** when checked independently.
2. The Subject and Predicate of both conclusions are **Identical** (e.g. A & B in both).
3. One conclusion is **Positive** (Some/All) and one is **Negative** (No/Some Not).

⚡ **Memory Shortcut:** Look for *Some + No* pairing with identical variables!`;
      } else if (lower.includes('dishonest') || lower.includes('profit') || lower.includes('shortcut')) {
        aiResponseText = `### Dishonest Shopkeeper Speed Formula ⚡

When a trader uses a false weight of **w_given** grams instead of **w_true** grams:

$$\\text{Gain \\%} = \\left( \\frac{\\text{Error}}{\\text{True Weight} - \\text{Error}} \\right) \\times 100$$

**Example Solved:**
A shopkeeper sells sugar at cost price but uses 800g weight for 1 kg (1000g).
- Error = $1000 - 800 = 200\\text{g}$.
- True Weight Given = $800\\text{g}$.
- Gain % = $\\frac{200}{800} \\times 100 = 25\\%$.

💡 **5-Second Mental Trick:** Ratio of (Weight Paid / Weight Given) = $(1000 / 800) = 5/4 = 1.25 \\implies +25\\%$ Profit!`;
      } else if (lower.includes('writ') || lower.includes('constitution') || lower.includes('article 32')) {
        aiResponseText = `### 5 Constitutional Writs (Articles 32 & 226) 📜

1. **Habeas Corpus ("To have the body"):** Protects against illegal detention. Can be issued against BOTH public & private entities.
2. **Mandamus ("We Command"):** Commands a public official to perform their statutory duty. Cannot be issued against private bodies or the President.
3. **Prohibition:** Issued by a higher court to lower courts to prevent exceeding jurisdiction (Quashes pending proceedings).
4. **Certiorari ("To be certified"):** Issued by higher court to lower court to transfer a case or quash an already passed order.
5. **Quo-Warranto ("By what authority"):** Challenges illegal occupation of a public office. Does NOT require personal locus standi!

📌 **UPSC Prelims Hack:** Remember *CPM HQ* (Certiorari, Prohibition, Mandamus, Habeas, Quo-Warranto).`;
      } else {
        aiResponseText = `### Step-by-Step AI Resolution 🎯

Here is the structured solution breakdown for your query:

1. **Concept Identification:** We analyze the primary subject rules and variable dependencies.
2. **Formula Application:** Use standard competitive exam shortcuts to save calculation time on scratchpads.
3. **Verification:** Always double-check boundary conditions and negative marking risks before locking your answer option!

💡 *Tip: Click 'Practice 5-Min AI Quiz' in the top menu to test this exact topic live!*`;
      }

      const aiMsg = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-8 animate-fadeIn">
      
      {/* Header */}
      <div className="p-6 rounded-3xl glass-panel border border-indigo-500/30 bg-gradient-to-r from-gray-900 via-indigo-950/40 to-purple-950/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 flex items-center justify-center glow-indigo shrink-0">
            <div className="w-full h-full bg-gray-950 rounded-[14px] flex items-center justify-center">
              <Bot className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              AI Doubt Solver & Instant Tutor
            </h2>
            <p className="text-xs text-gray-400">
              Get step-by-step solutions, shortcut tricks, and formula explanations 24/7.
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-xs font-semibold text-gray-400 rounded-xl flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      {/* Quick Prompt Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qp.prompt)}
            className="p-3 rounded-xl glass-panel border border-gray-800 hover:border-indigo-500/40 text-left transition-all hover:bg-gray-800/60 group"
          >
            <div className="text-xs font-semibold text-indigo-300 group-hover:text-indigo-200 transition-colors">
              {qp.label}
            </div>
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-gray-800 min-h-[420px] max-h-[580px] overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
              msg.sender === 'user'
                ? 'bg-indigo-600 text-white'
                : 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Message Bubble */}
            <div className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 relative group ${
              msg.sender === 'user'
                ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg'
                : 'bg-gray-900 border border-gray-800 text-gray-200 rounded-tl-none'
            }`}>
              <div className="whitespace-pre-line font-normal">
                {msg.text}
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] text-gray-400">
                <span>{msg.timestamp}</span>
                {msg.sender === 'ai' && (
                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="hover:text-white flex items-center gap-1 transition-colors"
                  >
                    {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-900 border border-gray-800 text-xs text-gray-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
              <span>PrepBot AI is formulating step-by-step solution...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Box */}
      <div className="glass-panel p-2.5 rounded-2xl border border-gray-800 flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask any question, paste a math problem, or request a shortcut trick..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="w-full bg-transparent border-none px-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim()}
          className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 text-white rounded-xl shadow transition-all shrink-0 active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
