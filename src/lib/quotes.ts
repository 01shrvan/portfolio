export type Quote = { text: string; source: string };

export const QUOTES: Quote[] = [
  {
    text: "action expresses priorities.",
    source: "Mahatma Gandhi",
  },
  {
    text: "the only way out is through.",
    source: "Robert Frost",
  },
  {
    text: "comparison is the thief of joy.",
    source: "Theodore Roosevelt",
  },
  {
    text: "whatever you are, be a good one.",
    source: "Abraham Lincoln",
  },
  {
    text: "fall seven times, stand up eight.",
    source: "Japanese proverb",
  },
  {
    text: "done is better than perfect.",
    source: "Sheryl Sandberg",
  },
  {
    text: "slow is smooth, smooth is fast.",
    source: "military adage",
  },
  {
    text: "what we do in life echoes in eternity.",
    source: "Marcus Aurelius",
  },
  {
    text: "simplicity is the ultimate sophistication.",
    source: "Leonardo da Vinci",
  },
  {
    text: "in the middle of difficulty lies opportunity.",
    source: "Albert Einstein",
  },
  {
    text: "make it work, make it right, make it fast.",
    source: "Kent Beck",
  },
  {
    text: "first solve the problem, then write the code.",
    source: "John Johnson",
  },
  {
    text: "hard choices, easy life. easy choices, hard life.",
    source: "Jerzy Gregorek",
  },
  {
    text: "he who has a why to live can bear almost any how.",
    source: "Friedrich Nietzsche",
  },
  {
    text: "the wound is the place where the light enters you.",
    source: "Rumi",
  },
  {
    text: "we suffer more often in imagination than in reality.",
    source: "Seneca",
  },
  {
    text: "you must be the change you wish to see in the world.",
    source: "Mahatma Gandhi",
  },
  {
    text: "premature optimization is the root of all evil.",
    source: "Donald Knuth",
  },
  {
    text: "the quieter you become, the more you are able to hear.",
    source: "Rumi",
  },
  {
    text: "no one can make you feel inferior without your consent.",
    source: "Eleanor Roosevelt",
  },
  {
    text: "what is not started today is never finished tomorrow.",
    source: "Goethe",
  },
  {
    text: "the journey of a thousand miles begins with a single step.",
    source: "Lao Tzu",
  },
  {
    text: "a person who never made a mistake never tried anything new.",
    source: "Albert Einstein",
  },
  {
    text: "weeks of coding can save you hours of planning.",
    source: "programming proverb",
  },
  {
    text: "the man who moves a mountain begins by carrying away small stones.",
    source: "Confucius",
  },
  {
    text: "simplicity is prerequisite for reliability.",
    source: "Edsger Dijkstra",
  },
  {
    text: "if you can't explain it simply, you don't understand it.",
    source: "attributed to Einstein",
  },
  {
    text: "the best way out is always through.",
    source: "Robert Frost",
  },
  {
    text: "play long-term games with long-term people.",
    source: "Naval Ravikant",
  },
  {
    text: "everything popular is wrong.",
    source: "Oscar Wilde",
  },
  {
    text: "it is not enough to be busy. the question is what are we busy about.",
    source: "Henry David Thoreau",
  },
  {
    text: "perfection is the enemy of shipped.",
    source: "engineering proverb",
  },
  {
    text: "you can't read the label from inside the jar.",
    source: "unknown",
  },
  {
    text: "talk is cheap. show me the code.",
    source: "Linus Torvalds",
  },
  {
    text: "a goal without a system is just a wish.",
    source: "productivity proverb",
  },
];

function dayIndex(now: Date = new Date()): number {
  return Math.floor(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86_400_000,
  );
}

export function quoteForDay(now: Date = new Date()): Quote {
  return QUOTES[dayIndex(now) % QUOTES.length]!;
}
