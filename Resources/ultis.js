export function randomChoice(choices) { return choices[Math.round(random(0, choices.length - 1))]; };
export function random(min, max) { return (min + (Math.random() * (max - min))); };