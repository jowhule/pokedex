import { keyframes } from "@emotion/react";

const spinAnimate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const spin = {
  animation: `${spinAnimate} 2s linear infinite`,
};
