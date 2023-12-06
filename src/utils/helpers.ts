export const STAT_ABBRV: Record<string, string> = {
  hp: "hp",
  attack: "atk",
  defense: "def",
  "special-attack": "spA",
  "special-defense": "spD",
  speed: "spd",
};

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
 * capitalise first letter per dash
 * @param str
 * @returns {str}
 */
export const capitaliseDash = (str: string): string => {
  const split = str.split("-");
  const capitaliseAll = split.map(
    (word) => word[0].toUpperCase() + word.slice(1)
  );
  return capitaliseAll.join("-");
};

/**
 * remove - from string and replace with a space
 * @param str
 * @returns {str}
 */
export const removeDash = (str: string): string => {
  return str.replaceAll("-", " ").replaceAll("_", " ");
};

export const getIdFromLink = (str: string): string => {
  return str.split("/").at(-2) ?? "";
};
