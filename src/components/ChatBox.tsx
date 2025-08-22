import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { getFakeResponse } from '../utils/fakeResponses';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBoxProps {
  addNotification: (message: string, type?: string) => void;
}

function ChatBox({ addNotification }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Galactic Bureaucracy Assistant. How can I make your day more miserable today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getFakeResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      // Sometimes trigger notifications based on responses
      if (Math.random() < 0.3) {
        addNotification("New bureaucratic requirement detected!", "warning");
      }
    }, 1500 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-cyan-500 shadow-lg">
      {/* Header */}
      <div className="bg-gray-900 p-4 rounded-t-lg border-b border-cyan-500">
        <div className="flex items-center space-x-2">
          <Bot className="text-cyan-400" size={20} />
          <h3 className="font-orbitron font-bold text-cyan-400">Bureaucracy Assistant</h3>
          <div className="flex space-x-1 ml-auto">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-xs lg:max-w-sm ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.isUser ? 'bg-cyan-600' : 'bg-purple-600'}`}>
                {message.isUser ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`rounded-lg p-3 ${message.isUser ? 'bg-cyan-900 text-cyan-100' : 'bg-gray-700 text-gray-100'}`}>
                <p className="text-sm font-space-mono">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about permits, complain about bureaucracy..."
            className="flex-1 bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-cyan-500 focus:outline-none font-space-mono"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={isTyping || !inputText.trim()}
            className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded transition-colors flex items-center"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;