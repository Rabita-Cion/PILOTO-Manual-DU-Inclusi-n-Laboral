
import React, { useState, useRef, useEffect } from 'react';
import { ChatbotProps, ChatMessage } from '../types';
import ChatIcon from './icons/ChatIcon';
import CloseIcon from './icons/CloseIcon';
import UserIcon from './icons/UserIcon';
import BotIcon from './icons/BotIcon';

const Chatbot: React.FC<ChatbotProps> = ({ chatInstance }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (isOpen) {
      setMessages([{
        sender: 'bot',
        text: '¡Hola! Soy Acti, tu asistente virtual. ¿Cómo puedo ayudarte a navegar el mundo de la inclusión laboral hoy?'
      }]);
    }
  }, [isOpen]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !chatInstance) return;

    const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      const responseStream = await chatInstance.sendMessageStream({ message: userInput });
      
      let botResponse = '';
      setMessages(prev => [...prev, { sender: 'bot', text: '' }]);
      
      for await (const chunk of responseStream) {
        botResponse += chunk.text;
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage && lastMessage.sender === 'bot') {
            const updatedMessages = [...prev.slice(0, -1), { ...lastMessage, text: botResponse }];
            return updatedMessages;
          }
          return prev;
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Lo siento, he encontrado un error. Por favor, inténtalo de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-brand-primary text-white p-4 rounded-full shadow-lg hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-transform transform hover:scale-110"
          aria-label="Abrir chat de ayuda"
        >
          <ChatIcon />
        </button>
      </div>
      
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-md h-[70vh] max-h-[600px] bg-white rounded-xl shadow-2xl flex flex-col z-50 transform transition-all duration-300 ease-out origin-bottom-right scale-100">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-brand-primary text-white rounded-t-xl">
            <h3 className="font-bold text-lg">Asistente Virtual 'Acti'</h3>
            <button onClick={() => setIsOpen(false)} aria-label="Cerrar chat">
              <CloseIcon />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 my-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && <BotIcon />}
                <div className={`max-w-xs md:max-w-sm rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-brand-accent text-brand-dark rounded-br-none' : 'bg-gray-200 text-brand-dark rounded-bl-none'}`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
                {msg.sender === 'user' && <UserIcon />}
              </div>
            ))}
             {isLoading && (
              <div className="flex items-start gap-3 my-4 justify-start">
                  <BotIcon />
                  <div className="max-w-xs md:max-w-sm rounded-lg px-4 py-2 bg-gray-200 text-brand-dark rounded-bl-none">
                     <div className="flex items-center justify-center space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                     </div>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary"
                disabled={isLoading}
              />
              <button type="submit" className="bg-brand-primary text-white p-2 rounded-full hover:bg-brand-primary/90 disabled:bg-gray-400" disabled={isLoading || !userInput.trim()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
