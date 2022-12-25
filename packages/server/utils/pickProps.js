/**
 * Selects prop at random from each array in an object
 *
 * @param   { Object } props     Props to select from
 * @return  { Object }           Props selected from each array
 */

function pickProps(props) {
  return Object.keys(props).reduce((obj, key) => {
    const prop = props[key];
    const randIdx = Math.floor(Math.random() * prop.length);
    const pickedProp = prop[randIdx];
    return {
      ...obj,
      [key]: pickedProp,
    };
  }, {});
}

module.exports = pickProps;
