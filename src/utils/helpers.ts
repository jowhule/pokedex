/**
 * capitalise first letter in string or each word if given extra parameter
 * @param str
 * @returns {str}
 */
export const capitalise = (str: string, all?: boolean): string => {
  const split = str.split(" ");
  if (all) {
    const capitaliseAll = split.map(
      (word) => word[0].toUpperCase() + word.slice(1)
    );
    return capitaliseAll.join(" ");
  }

  return str[0].toUpperCase() + str.slice(1);
};

/**
 * remove - from string and replace with a space
 * @param str
 * @returns {str}
 */
export const removeDash = (str: string): string => {
  return str.replaceAll("-", " ").replaceAll("_", " ");
};
