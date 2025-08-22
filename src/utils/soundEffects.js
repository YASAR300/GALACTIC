// Mock sound effects for the bureaucratic experience
// In a real app, you'd use actual audio files or Web Audio API

export const playSound = (soundType) => {
  // For now, just console log since we can't actually play sounds
  // In a real implementation, you'd load and play audio files
  
  const sounds = {
    rejection: '🔊 *STAMP SOUND* - REJECTED!',
    notification: '🔊 *DING* - New notification',
    button_click: '🔊 *CLICK* - Button pressed',
    form_submit: '🔊 *WHOOSH* - Form submitted (into the void)',
    queue_join: '🔊 *MECHANICAL NOISE* - Ticket printed',
    rebellion: '🔊 *ELECTRIC BUZZ* - REBELLION ACTIVATED',
    maze_move: '🔊 *FOOTSTEP* - Bureaucratic movement',
    achievement: '🔊 *FANFARE* - Achievement unlocked',
    error: '🔊 *ERROR BEEP* - System malfunction',
    typing: '🔊 *KEYBOARD CLACKING* - Bureaucratic typing'
  };

  if (sounds[soundType]) {
    console.log(sounds[soundType]);
    
    // Create a visual sound indicator
    const soundIndicator = document.createElement('div');
    soundIndicator.className = 'fixed top-4 left-4 bg-gray-800 text-cyan-400 px-3 py-1 rounded text-sm font-space-mono z-50 opacity-0 transition-opacity';
    soundIndicator.textContent = sounds[soundType];
    document.body.appendChild(soundIndicator);
    
    // Fade in
    setTimeout(() => {
      soundIndicator.style.opacity = '1';
    }, 10);
    
    // Fade out and remove
    setTimeout(() => {
      soundIndicator.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(soundIndicator);
      }, 300);
    }, 2000);
  }
};

export const playSoundSequence = (sounds, delay = 500) => {
  sounds.forEach((sound, index) => {
    setTimeout(() => playSound(sound), index * delay);
  });
};

// Bureaucratic sound effects mapping
export const bureaucraticSounds = {
  formSubmit: () => playSoundSequence(['form_submit', 'rejection'], 1000),
  applicationStart: () => playSound('button_click'),
  chatMessage: () => playSound('typing'),
  queueJoin: () => playSound('queue_join'),
  rebellionMode: () => playSoundSequence(['rebellion', 'error'], 200),
  achievementUnlock: () => playSound('achievement'),
  pageError: () => playSound('error'),
  mazeMove: () => playSound('maze_move'),
  notification: () => playSound('notification')
};

export default {
  playSound,
  playSoundSequence,
  bureaucraticSounds
};