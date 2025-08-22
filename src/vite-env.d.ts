/// <reference types="vite/client" />

declare module './utils/randomEvents' {
  export function getRandomEvent(): string;
  export function getMotivationalMessage(): string;
  export function getSystemGlitch(): string;
  export function generateFakeNotification(): { message: string; type: string };
  const _default: any;
  export default _default;
}

declare module './utils/soundEffects' {
  export const playSound: (soundType: string) => void;
  export const playSoundSequence: (sounds: string[], delay?: number) => void;
  export const bureaucraticSounds: {
    formSubmit: () => void;
    applicationStart: () => void;
    chatMessage: () => void;
    queueJoin: () => void;
    rebellionMode: () => void;
    achievementUnlock: () => void;
    pageError: () => void;
    mazeMove: () => void;
    notification: () => void;
  };
  const _default: any;
  export default _default;
}

declare module './utils/permits' {
  interface Permit {
    id: number;
    name: string;
    description: string;
    difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Nightmare' | 'Impossible';
    rejectionRate?: string;
    processingTime?: string;
    cost?: string;
  }
  const permits: Permit[];
  export default permits;
}
