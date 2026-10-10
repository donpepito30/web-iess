import React, { useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "./Chatbot";

interface FabChatProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  messages: ChatMessage[];
  input: string;
  setInput: (val: string) => void;
  isTyping: boolean;
  onSendMessage: (text: string) => void;
}

export default function FabChat({
  isOpen,
  setIsOpen,
  messages,
  input,
  setInput,
  isTyping,
  onSendMessage
}: FabChatProps) {
  const fabChatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fabChatEndRef.current) {
      fabChatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="bg-white border text-slate-800 border-slate-200 rounded-2xl shadow-2xl flex flex-col w-[calc(100vw-40px)] sm:w-[370px] h-[480px] mb-3 overflow-hidden"
          >
            {/* Header con Shield/Escudo 🛡️ */}
            <div className="bg-[#0a1f42] p-3 text-white border-b-2 border-[#c9a84c] flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛡️</span>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold tracking-tight">IESS Asistente - En línea</h3>
                  <span className="text-[8px] sm:text-[9px] text-[#c9a84c] font-black uppercase tracking-wider block leading-none mt-0.5">
                    ● Inteligencia Activa
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-slate-450 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mensajes de Chat */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs inline-block shadow-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#0a1f42] text-white rounded-tr-none"
                        : "bg-white text-slate-800 border border-slate-200 rounded-tl-none"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <p className="whitespace-pre-line">{msg.content}</p>
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
                    <span className={`text-[8px] block text-right mt-1 font-mono ${
                      msg.role === "user" ? "text-slate-300" : "text-slate-400"
                    }`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-800 border border-slate-150 rounded-2xl rounded-tl-none px-3 py-2 shadow-xs inline-block">
                    <div className="flex gap-1 items-center">
                      <span className="w-1 h-1 bg-[#c9a84c] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1 h-1 bg-[#c9a84c] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1 h-1 bg-[#c9a84c] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      <span className="text-[9px] text-slate-400 pl-1 font-mono uppercase font-bold">Consultando IESS...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={fabChatEndRef} />
            </div>

            {/* 5 Botones de Acceso Rápido */}
            <div className="bg-white px-2 py-1.5 border-t border-slate-100 flex flex-wrap gap-1 shrink-0 max-h-[105px] overflow-y-auto scrollbar-none">
              <button
                type="button"
                onClick={() => onSendMessage("¿Cómo puedo solicitar un préstamo quirografario o hipotecario en el BIESS? Indícame los montos y requisitos de aportaciones.")}
                className="text-[9px] font-extrabold bg-slate-50 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] text-slate-700 px-2 py-1 rounded border border-slate-200 transition-colors cursor-pointer"
              >
                💰 Préstamos BIESS
              </button>
              <button
                type="button"
                onClick={() => onSendMessage("¿Cuáles son los pasos y canales autorizados para agendar, consultar o cancelar citas médicas en el IESS o centros de salud?")}
                className="text-[9px] font-extrabold bg-slate-50 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] text-slate-700 px-2 py-1 rounded border border-slate-200 transition-colors cursor-pointer"
              >
                🏥 Citas médicas
              </button>
              <button
                type="button"
                onClick={() => onSendMessage("¿Cuáles son los requisitos de jubilación por vejez, cuántas aportaciones e imposiciones mínimas de ley necesito por edad?")}
                className="text-[9px] font-extrabold bg-slate-50 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] text-slate-700 px-2 py-1 rounded border border-slate-200 transition-colors cursor-pointer"
              >
                👴 Jubilación
              </button>
              <button
                type="button"
                onClick={() => onSendMessage("¿Cómo funciona la afiliación voluntaria, cuánto cuesta aportar el 17.60% sobre el SBU de USD 482 en 2026 y qué beneficios tengo?")}
                className="text-[9px] font-extrabold bg-slate-50 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] text-slate-700 px-2 py-1 rounded border border-slate-200 transition-colors cursor-pointer"
              >
                📝 Afiliación
              </button>
              <button
                type="button"
                onClick={() => onSendMessage("Deseo reportar una mala atención administrativa, falta de medicinas o problemas de citas canceladas de forma oficial. ¿A qué canales oficiales debo acudir?")}
                className="text-[9px] font-extrabold bg-red-55 hover:bg-red-100 text-red-800 px-2 py-1 rounded border border-red-200 transition-colors cursor-pointer"
              >
                😤 Quiero quejarme
              </button>
            </div>

            {/* Input de Mensaje de Texto */}
            <form onSubmit={handleSubmit} className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-1.5 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pregúntale al Asistente IESS..."
                className="flex-1 bg-slate-50 border border-slate-250 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#0a1f42]"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="bg-[#0a1f42] hover:bg-[#113160] disabled:bg-slate-100 text-white p-2 rounded-lg transition-colors shadow-sm disabled:cursor-not-allowed text-xs font-bold shrink-0 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante principal */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#0a1f42] hover:bg-[#113160] text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-[#c9a84c] transition-all transform active:scale-90 hover:scale-105 cursor-pointer"
        title="Abrir Chatbot del IESS"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-[#c9a84c]" />
        ) : (
          <span className="text-2xl animate-pulse">💬</span>
        )}
      </button>
    </div>
  );
}
