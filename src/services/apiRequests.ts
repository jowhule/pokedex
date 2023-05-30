import axios from "axios";

// using pokemon api, only get request
export const sendGenericAPIRequest = async <T>(
  url: string,
  errorHandler?: () => void
): Promise<T | void> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const response = await axios.get(url, { headers });
    if (response) return response.data;
  } catch (err) {
    if (errorHandler) errorHandler();
  }
};
