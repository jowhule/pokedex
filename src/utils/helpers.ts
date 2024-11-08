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
  if (!str) return "";
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

/**
 * for sorting an array in descending order (used for MOVES TABLE)
 */
const descendingComparator = <T extends any>(
  a: T,
  b: T,
  orderBy: keyof T
): number => {
  if (b[orderBy] === null || b[orderBy] === undefined) return -1;
  if (a[orderBy] === null || a[orderBy] === undefined) return 1;
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = <T extends any, K extends any>(
  order: K,
  orderBy: keyof T
): ((a: T, b: T) => number) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = <T extends any>(
  array: T[],
  comparator: (a: T, b: T) => number
) => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export const insertDecimal = (num: number) => {
  return (num / 10).toFixed(1);
};
