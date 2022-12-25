/**
 * Shuffle array in random order. Uses Fisher-Yates shuffle algorithm
 *
 * @param   { Array } arr       Array to be shuffled
 * @return  { Array }           Shuffled order of array
 */

function shuffle(arr) {
  const shuffledArr = [...arr];

  for (let i = shuffledArr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = shuffledArr[i];
    shuffledArr[i] = shuffledArr[j];
    shuffledArr[j] = x;
  }

  return shuffledArr;
}

module.exports = shuffle;
