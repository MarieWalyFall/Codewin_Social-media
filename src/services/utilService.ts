export const utilService = {
  makeId,
  debounce,
  getRandomInt,
  getRandomColor,
  getLoremIpsum,
  loadFromStorage,
  saveToStorage,
  loadFromSessionStorage,
  saveToSessionStorage,
  delay,
};

function makeId(length: number = 5): string {
  let txt = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function delay(ms: number = 1500): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function getRandomColor(): string {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }
  return color;
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getLoremIpsum(length: number = 5): string {
  const words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ];
  
  let sentence = '';
  while (length > 0) {
    sentence += words[getRandomInt(0, words.length - 1)] + ' ';
    length--;
  }
  sentence += '.';
  return sentence.trim();
}

function loadFromStorage(key: string): any {
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : null;
}

function saveToStorage(key: string, val: any): void {
  localStorage.setItem(key, JSON.stringify(val));
}

function loadFromSessionStorage(key: string): any {
  const val = sessionStorage.getItem(key);
  return val ? JSON.parse(val) : null;
}

function saveToSessionStorage(key: string, val: any): void {
  sessionStorage.setItem(key, JSON.stringify(val));
}
