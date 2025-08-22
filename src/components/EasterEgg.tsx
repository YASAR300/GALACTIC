import React, { useState, useEffect } from 'react';

interface EasterEggProps {
  onActivate?: () => void;
}

function EasterEgg({ onActivate }: EasterEggProps) {
  const [sequence, setSequence] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);
  
  // Konami code: up, up, down, down, left, right, left, right, b, a
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  // Alternative sequences for different easter eggs
  const sequences = {
    konami: konamiCode,
    bureaucrat: ['KeyB', 'KeyU', 'KeyR', 'KeyE', 'KeyA', 'KeyU'],
    chaos: ['KeyC', 'KeyH', 'KeyA', 'KeyO', 'KeyS'],
    help: ['KeyH', 'KeyE', 'KeyL', 'KeyP']
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newSequence = [...sequence, event.code].slice(-10);
      setSequence(newSequence);

      // Check for konami code
      if (arraysEqual(newSequence.slice(-konamiCode.length), konamiCode)) {
        activateKonamiEasterEgg();
        return;
      }

      // Check for other sequences
      Object.entries(sequences).forEach(([name, seq]) => {
        if (arraysEqual(newSequence.slice(-seq.length), seq)) {
          activateEasterEgg(name);
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sequence]);

  const arraysEqual = (a: string[], b: string[]) => {
    return a.length === b.length && a.every((val, i) => val === b[i]);
  };

  const activateKonamiEasterEgg = () => {
    setIsActive(true);
    
    // Create floating emojis
    const emojis = ['🚀', '⭐', '🎉', '💫', '✨', '🎊'];
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        createFloatingEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
      }, i * 100);
    }

    // Show secret message
    showEasterEggMessage('🎮 KONAMI CODE ACTIVATED! You found the secret!', 'success');
    
    if (onActivate) onActivate();
    
    setTimeout(() => setIsActive(false), 5000);
  };

  const activateEasterEgg = (type: string) => {
    const messages = {
      bureaucrat: 'You spelled BUREAU! Here\'s a free rejection! 📋❌',
      chaos: 'CHAOS MODE! Everything is broken by design! 🔥💥',
      help: 'HELP? What a novel concept! Too bad we don\'t provide any! 🤷‍♂️'
    };

    if (messages[type]) {
      showEasterEggMessage(messages[type], 'warning');
    }
  };

  const createFloatingEmoji = (emoji: string) => {
    const element = document.createElement('div');
    element.textContent = emoji;
    element.className = 'fixed text-4xl z-50 pointer-events-none animate-bounce';
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    
    document.body.appendChild(element);
    
    setTimeout(() => {
      element.style.transition = 'all 2s ease-out';
      element.style.transform = 'translateY(-100px)';
      element.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(element);
      }, 2000);
    }, 100);
  };

  const showEasterEggMessage = (message: string, type: string) => {
    const messageElement = document.createElement('div');
    messageElement.className = `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-6 rounded-lg border-2 font-space-mono text-center max-w-md ${
      type === 'success' 
        ? 'bg-green-900 border-green-500 text-green-200' 
        : 'bg-yellow-900 border-yellow-500 text-yellow-200'
    }`;
    messageElement.innerHTML = `
      <div class="text-2xl mb-2">${message.split(' ')[0]}</div>
      <div>${message.split(' ').slice(1).join(' ')}</div>
    `;
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
      messageElement.style.transition = 'opacity 0.5s ease-out';
      messageElement.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(messageElement);
      }, 500);
    }, 3000);
  };

  // Secret developer panel
  const [showDevPanel, setShowDevPanel] = useState(false);

  useEffect(() => {
    const handleKeyCombo = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.code === 'KeyD') {
        event.preventDefault();
        setShowDevPanel(!showDevPanel);
      }
    };

    window.addEventListener('keydown', handleKeyCombo);
    return () => window.removeEventListener('keydown', handleKeyCombo);
  }, [showDevPanel]);

  return (
    <>
      {/* Hidden dev panel */}
      {showDevPanel && (
        <div className="fixed bottom-4 right-4 bg-gray-900 border border-cyan-500 rounded-lg p-4 z-50 font-space-mono text-sm">
          <div className="text-cyan-400 font-bold mb-2">🔧 Dev Panel</div>
          <div className="space-y-1 text-gray-300">
            <div>Sequence: {sequence.slice(-5).join(', ')}</div>
            <div>Easter Egg: {isActive ? 'Active' : 'Inactive'}</div>
            <div className="text-xs text-gray-500">
              Try: ↑↑↓↓←→←→BA or type BUREAU/CHAOS/HELP
            </div>
          </div>
        </div>
      )}

      {/* Visual indicator when easter egg is active */}
      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="w-full h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-10 animate-pulse"></div>
        </div>
      )}
    </>
  );
}

export default EasterEgg;