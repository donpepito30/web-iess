import React, { useRef, useEffect } from "react";
import { Send, RefreshCw, Info } from "lucide-react";
import ReactMarkdown from "react-markdown";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  chatMessages: ChatMessage[];
  chatInput: string;
  setChatInput: (val: string) => void;
  isTyping: boolean;
  apiOnline: boolean | null;
  onSendMessage: (text: string) => void;
  onClearChat: () => void;
  chatSectionRef?: React.RefObject<HTMLElement | null>;
}

export default function Chatbot({
  chatMessages,
  chatInput,
  setChatInput,
  isTyping,
  apiOnline,
  onSendMessage,
  onClearChat,
  chatSectionRef
}: ChatbotProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isTyping]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      onSendMessage(chatInput);
    }
  };

  return (
    <section 
      ref={chatSectionRef as any}
      id="chatbot-section" 
      className="w-full max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-lg flex flex-col h-[550px] overflow-hidden scroll-mt-24 select-none lg:select-text shrink-0 font-sans"
    >
      {/* Top Panel Brand */}
      <div className="bg-[#0a1f42] p-4 text-white border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#9c7d31] flex items-center justify-center font-bold text-white shadow">
            IA
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight">IESS Asistente</h3>
            <div className="flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                {apiOnline === true ? "Gemini Inteligencia Activa" : "Soporte de Ley 2026"}
              </span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onClearChat}
          title="Borrar Chat"
          type="button"
          className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Quick FAQ info helper banner */}
      <div className="bg-slate-50 border-b border-slate-100 p-2.5 px-3 flex items-start gap-1.5">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <span className="text-[10px] text-slate-500 font-medium leading-relaxed">
          Este asistente está provisto con la normativa oficial en Ecuador (Ley Seguridad Social, resoluciones C.D. 625, 677, 515).
        </span>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {chatMessages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs inline-block shadow-sm ${
                msg.role === "user" 
                  ? "bg-[#0a1f42] text-white rounded-tr-none" 
                  : "bg-white text-slate-800 border border-slate-100 rounded-tl-none leading-relaxed"
              }`}
            >
              {msg.role === "user" ? (
                <p className="whitespace-pre-line">
                  {msg.content}
                </p>
              ) : (
                <div className="prose prose-slate max-w-none text-xs leading-relaxed select-text">
                  <ReactMarkdown
                    components={{
                      p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed whitespace-pre-line" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-extrabold text-[#0a1f42]" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                      li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                      a: ({node, ...props}) => <a className="text-[#c9a84c] hover:underline font-bold" target="_blank" rel="noreferrer" {...props} />,
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              )}
              <span className={`text-[9px] block text-right mt-1.5 font-mono ${
                msg.role === "user" ? "text-slate-300" : "text-slate-400"
              }`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-slate-800 border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm inline-block">
              <div className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                <span className="text-[10px] text-slate-400 pl-1 font-mono uppercase font-semibold">Buscando requisitos...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={chatEndRef} />
      </div>

      {/* Quick Shortcuts Suggestions Carousel */}
      <div className="bg-white border-t border-slate-100 p-2 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-thin">
        <button 
          onClick={() => onSendMessage("Requisitos para Jubilación por Vejez")}
          type="button"
          className="text-[10px] font-bold bg-slate-100 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors shrink-0 cursor-pointer"
        >
          👴 Jubilación Vejez
        </button>
        <button 
          onClick={() => onSendMessage("¿Cómo pedir un préstamo quirografario en el BIESS?")}
          type="button"
          className="text-[10px] font-bold bg-slate-100 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors shrink-0 cursor-pointer"
        >
          💳 Préstamo Quirografario
        </button>
        <button 
          onClick={() => onSendMessage("¿Cuánto se paga de aportación obligatoria para afiliación voluntaria?")}
          type="button"
          className="text-[10px] font-bold bg-slate-100 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors shrink-0 cursor-pointer"
        >
          🏥 Afiliación Voluntaria
        </button>
        <button 
          onClick={() => onSendMessage("¿Cómo hacer reclamo de medicamento faltante o cita cancelada?")}
          type="button"
          className="text-[10px] font-bold bg-slate-100 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors shrink-0 cursor-pointer"
        >
          🚨 Quejas y Denuncias
        </button>
      </div>

      {/* Bottom Chat Input form */}
      <form onSubmit={handleFormSubmit} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input 
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Pregunta sobre jubilación, préstamos..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#0a1f42] font-sans"
        />
        <button 
          type="submit"
          disabled={!chatInput.trim()}
          className="bg-[#0a1f42] hover:bg-[#113160] disabled:bg-slate-100 text-white p-2 rounded-lg transition-colors shadow-sm disabled:cursor-not-allowed text-xs font-bold shrink-0 cursor-pointer"
        >
          <Send className="w-4 h-4 shrink-0" />
        </button>
      </form>
    </section>
  );
}
