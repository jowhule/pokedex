import { GENDER_COLOURS } from "../../../utils/colours";

export const genderInfoContainer = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
};

const genderBarStyle = {
  height: "15px",
  borderRadius: "15px",
  m: "0 auto",
};

export const genderBarOutterStyle = (ratio: number) => {
  return {
    ...genderBarStyle,
    position: "relative",
    background: `linear-gradient(to right, ${GENDER_COLOURS["female_dark"]} 0%, ${GENDER_COLOURS["female_dark"]} ${ratio}%, ${GENDER_COLOURS["male_dark"]} ${ratio}%, ${GENDER_COLOURS["male_dark"]} 100%)`,
    width: "80%",
    p: "3px",
  };
};

export const genderBarInnerStyle = (ratio: number) => {
  return {
    ...genderBarStyle,
    position: "absolute",
    background: `linear-gradient(to right, ${GENDER_COLOURS["female"]} 0%, ${GENDER_COLOURS["female"]} ${ratio}%, ${GENDER_COLOURS["male"]} ${ratio}%, ${GENDER_COLOURS["male"]} 100%)`,
    width: "calc(100% - 6px)",
  };
};

export const genderStatContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  boxSizing: "border-box",
  p: "0 25px",
};
