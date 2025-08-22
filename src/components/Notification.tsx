import React, { useEffect, useState } from 'react';
import { X, AlertCircle, CheckCircle, AlertTriangle, Zap } from 'lucide-react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'rebellion';
}

function Notification({ message, type = 'error' }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const getNotificationStyle = () => {
    switch (type) {
      case 'success':
        return 'bg-green-900 border-green-500 text-green-200';
      case 'warning':
        return 'bg-yellow-900 border-yellow-500 text-yellow-200';
      case 'rebellion':
        return 'bg-red-900 border-red-500 text-red-200 rebellion-mode';
      default:
        return 'bg-red-900 border-red-500 text-red-200';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'rebellion':
        return <Zap size={20} />;
      default:
        return <AlertCircle size={20} />;
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 shadow-lg backdrop-blur-sm max-w-sm ${getNotificationStyle()}`}>
      {getIcon()}
      <div className="flex-1 font-space-mono text-sm">
        {message}
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="text-current hover:opacity-70 transition-opacity"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default Notification;