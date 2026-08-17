export type Quote = { text: string; source: string };

export const QUOTES: Quote[] = [
  {
    text: "on this path no effort is ever wasted, and no gain is ever reversed; even a little of this practice protects one from great fear.",
    source: "Bhagavad Gita",
  },
  {
    text: "you have power over your mind, not outside events. realize this, and you will find strength.",
    source: "Marcus Aurelius",
  },
  {
    text: "the reasonable man adapts himself to the world; the unreasonable one persists in trying to adapt the world to himself. therefore all progress depends on the unreasonable man.",
    source: "George Bernard Shaw",
  },
  {
    text: "we are what we repeatedly do. excellence, then, is not an act but a habit.",
    source: "Will Durant",
  },
  {
    text: "the man who moves a mountain begins by carrying away small stones.",
    source: "Confucius",
  },
  {
    text: "he who has a why to live can bear almost any how.",
    source: "Friedrich Nietzsche",
  },
  {
    text: "the quieter you become, the more you are able to hear.",
    source: "Rumi",
  },
  {
    text: "perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.",
    source: "Antoine de Saint-Exupéry",
  },
  {
    text: "action expresses priorities.",
    source: "Mahatma Gandhi",
  },
  {
    text: "the best time to plant a tree was twenty years ago. the second best time is now.",
    source: "Chinese proverb",
  },
  {
    text: "a person who never made a mistake never tried anything new.",
    source: "Albert Einstein",
  },
  {
    text: "do not seek to have events happen as you wish, but wish them to happen as they do happen, and all will be well with you.",
    source: "Epictetus",
  },
  {
    text: "what we do in life echoes in eternity.",
    source: "Marcus Aurelius",
  },
  {
    text: "fall seven times, stand up eight.",
    source: "Japanese proverb",
  },
  {
    text: "knowing is not enough; we must apply. willing is not enough; we must do.",
    source: "Johann Wolfgang von Goethe",
  },
  {
    text: "it is not that we have a short time to live, but that we waste a lot of it.",
    source: "Seneca",
  },
  {
    text: "the wound is the place where the light enters you.",
    source: "Rumi",
  },
  {
    text: "everything you want is on the other side of fear.",
    source: "Jack Canfield",
  },
  {
    text: "in the middle of difficulty lies opportunity.",
    source: "Albert Einstein",
  },
  {
    text: "you must be the change you wish to see in the world.",
    source: "Mahatma Gandhi",
  },
  {
    text: "no one can make you feel inferior without your consent.",
    source: "Eleanor Roosevelt",
  },
  {
    text: "the journey of a thousand miles begins with a single step.",
    source: "Lao Tzu",
  },
  {
    text: "hard choices, easy life. easy choices, hard life.",
    source: "Jerzy Gregorek",
  },
  {
    text: "when you are content to be simply yourself and don't compare or compete, everyone will respect you.",
    source: "Lao Tzu",
  },
  {
    text: "the two most important days in your life are the day you are born and the day you find out why.",
    source: "Mark Twain",
  },
  {
    text: "we suffer more often in imagination than in reality.",
    source: "Seneca",
  },
  {
    text: "whatever you are, be a good one.",
    source: "Abraham Lincoln",
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
    text: "you don't rise to the level of your goals, you fall to the level of your systems.",
    source: "James Clear",
  },
];

export function dayIndex(now: Date = new Date()): number {
  return Math.floor(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86_400_000,
  );
}

export function quoteForDay(now: Date = new Date()): Quote {
  return QUOTES[dayIndex(now) % QUOTES.length]!;
}
