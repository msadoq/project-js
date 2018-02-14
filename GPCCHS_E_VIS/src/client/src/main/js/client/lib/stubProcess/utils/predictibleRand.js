const _internalSeed = 1234;
let _seed = _internalSeed;

/**
 * Generate a pseudo random float
 * @return {float} 0 <= float < 1
 */
function _pseudoRand(range = null) {
  _seed += 1;
  let x = Math.sin(_seed) * 10000;
  x -= Math.floor(x);

  if (range) {
    const min = range[0];
    const max = range[1];
    x = min + (x * (max - min));
  }

  return x;
}

const _words = [
  'Lorem', 'ipsum', 'dolor', 'sit', 'amet,', 'consectetur', 'adipiscing', 'elit,', 'sed', 'do', 'eiusmod', 'tempor',
  'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua.', 'Ut', 'enim', 'ad', 'minim', 'veniam,', 'quis',
  'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat.', 'Duis',
  'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu',
  'fugiat', 'nulla', 'pariatur.', 'Excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident,', 'sunt', 'in',
  'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum.',
];

function PredictibleRand() {
  /**
   * Generate sinusoidal value within [offset, offset+2] range,
   * offset is a unique float value computed from epName.
   *
   * @param  {int} timestamp
   * @return {float}
   */
  this.getSinValue = (timestamp, epName) => {
    let offset = 0;
    Buffer.from(epName).forEach((val) => {
      offset += val;
    });

    return (1 + Math.sin(timestamp / 6000)) + (offset / 10);
  };

  /**
   * Set the seed used to generate every random numbers
   *
   * @param  {int} seed
   */
  this.setSeed = (seed) => {
    _seed = seed + _internalSeed;
  };

  /**
   * Build a pseudo random phrase using lorem ipsum words
   *
   * @param  {String} clue    Optional. First characters to generated. To give indications on what string is
   * @param  {int} maxsize    Optional. Limit number of characters in output
   * @param  {int} wordCount  Optional. Number of words in the phrase
   * @return {String}
   */
  this.getString = (clue = '', maxsize = -1, wordCount = 1) => {
    const stringWords = [];

    for (let i = 0; i < wordCount; i += 1) {
      const id = this.getInt([0, _words.length]);
      stringWords.push(_words[id]);
    }

    const randString = clue + stringWords.join(' ');

    if (maxsize >= 0) {
      return randString.slice(0, maxsize);
    }

    return randString;
  };

  /**
   * Generate a predictible pseudo-random 0 <= float < 1.
   * If range is precised, it will generate range[0] <= float < range[1]
   *
   * @param  {Array} range  Optional. Precise range
   * @return {float}  pseudo-random float
   */
  this.getFloat = (range = null) => (
    _pseudoRand(range)
  );

  /**
   * Get randomly one of the list
   * @param  {array}  list
   * @return {any}  item from the list
   */
  this.getFrom = list => (
    list[this.getInt([0, list.length])]
  );

  /**
   * Generate a predictible pseudo-random integer
   * If range is precised, it will generate range[0] <= number < range[1]
   *
   * @param  {Array} range  Optional. Precise range
   * @return {integer}  range[0] <= integer < range[1]
   */
  this.getInt = range => (
    Math.floor(_pseudoRand(range))
  );

  /**
   * Generate a predictible pseudo-random boolean.
   * @param  {float} trueChance probability of true (0 <= prob <= 1)
   * @return {bool}
   */
  this.getBool = (trueChance = 0.5) => (
    _pseudoRand() < trueChance
  );
}

module.exports = new PredictibleRand();
