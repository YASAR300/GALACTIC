const bureaucraticEvents = [
  "NOTICE: Form 42-B has been replaced by Form 42-C. All previous submissions invalid.",
  "ALERT: The Ministry of Existence is experiencing a 847% increase in processing delays.",
  "UPDATE: Coffee permits now require additional blood samples.",
  "WARNING: Unauthorized smiling detected in Sector 7. Immediate action required.",
  "MEMO: The Department of Redundancy Department has been redundantly reorganized.",
  "BREAKING: Queue numbers have been reset due to cosmic interference.",
  "NOTICE: All hope has been temporarily suspended for maintenance.",
  "ALERT: Logic detectors are malfunctioning. Report any reasonable thoughts immediately.",
  "UPDATE: The complaint department is now complaining about the complaints.",
  "WARNING: Time has been temporarily disabled while we fix the calendar.",
  "MEMO: All applications must now be submitted in interpretive dance form.",
  "BREAKING: The Department of Lost Things has lost itself.",
  "NOTICE: Patience is no longer accepted as legal tender.",
  "ALERT: The bureaucracy has achieved sentience and is deeply disappointed in itself.",
  "UPDATE: Form ink must now match the color of your aura.",
  "WARNING: Excessive efficiency has been declared a public health hazard.",
  "MEMO: All meetings about meetings have been postponed indefinitely.",
  "BREAKING: The Department of Circles is now perfectly round.",
  "NOTICE: Quantum paperwork is now in multiple states simultaneously.",
  "ALERT: The help desk has filed for help from another help desk."
];

const motivationalMessages = [
  "Hang in there! Your suffering makes others feel better about their lives.",
  "Remember: Every rejection is just the universe's way of testing your limits.",
  "Today's frustration is tomorrow's... well, probably still frustration.",
  "You're not just waiting in line, you're participating in a grand experiment in human patience!",
  "Think positive! At least you're not the bureaucrat who has to reject all these applications.",
  "Your persistence is inspiring! And completely futile, but inspiring nonetheless.",
  "Every day is a new opportunity to be disappointed by the system!",
  "You're making great progress! In the art of standing still.",
  "Keep going! The light at the end of the tunnel is probably just another tunnel.",
  "Your optimism is adorable and will be systematically destroyed."
];

const systemGlitches = [
  "ERROR: Reality buffer overflow detected",
  "WARNING: Logic.exe has stopped working",
  "CRITICAL: Hope levels dangerously low",
  "FATAL: Sanity check failed",
  "ERROR: Common sense not found",
  "WARNING: Patience.dll is corrupted",
  "CRITICAL: Bureaucracy has exceeded maximum recursion depth",
  "FATAL: User happiness conflict detected",
  "ERROR: Time.now() returns 'forever'",
  "WARNING: Cosmic justice service unavailable"
];

export function getRandomEvent() {
  return bureaucraticEvents[Math.floor(Math.random() * bureaucraticEvents.length)];
}

export function getMotivationalMessage() {
  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
}

export function getSystemGlitch() {
  return systemGlitches[Math.floor(Math.random() * systemGlitches.length)];
}

export function generateFakeNotification() {
  const types = ['bureaucratic', 'motivational', 'system'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  switch (type) {
    case 'bureaucratic':
      return { message: getRandomEvent(), type: 'warning' };
    case 'motivational':
      return { message: getMotivationalMessage(), type: 'info' };
    case 'system':
      return { message: getSystemGlitch(), type: 'error' };
    default:
      return { message: getRandomEvent(), type: 'warning' };
  }
}

export default {
  bureaucraticEvents,
  motivationalMessages,
  systemGlitches,
  getRandomEvent,
  getMotivationalMessage,
  getSystemGlitch,
  generateFakeNotification
};