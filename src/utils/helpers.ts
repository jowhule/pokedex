import { sendGenericAPIRequest } from "../services/apiRequests";

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
  if (!str) return "";
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

/**
 * pushes api requests to get data into the array
 * @param dataPromises async api requests to get a data array
 * @param dataHolder where data goes when api request is finished
 * @param url url of data request
 * @param key the key to the datapromises object
 */
export const getDataPromises = <T>(
  dataPromises: Promise<void | T>[],
  dataHolder: Record<string | number, T> = {},
  url: string,
  key: number | string
) => {
  dataPromises.push(
    sendGenericAPIRequest<T>(url).then((data) => {
      if (data) {
        dataHolder[key] = data;
      } else {
        getDataPromises(dataPromises, dataHolder, url, key);
      }
    })
  );
};
