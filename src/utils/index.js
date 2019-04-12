export function genDeck(items = vowels) {
  // better than looping
  let duplicated = items.concat([...items]);
  // there might be better ways of doing this
  let shuffled = duplicated.sort(() => Math.random() - 0.5);
  return shuffled;
}

export function alphabet(amount = 26) {
  return [...Array(amount)]
    .map((n,i) => String.fromCharCode(97+i));
}

export const vowels = ['a','e','i','o','u'];