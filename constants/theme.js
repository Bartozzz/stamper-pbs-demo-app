import getFont from "../helpers/getFont";

export default {
  colors: {
    background: "#ffffff",
    background100: "#fdfdfd",
    background200: "#e9e9e9",

    white: "#ffffff",
    white100: "#fdfdfd",
    white200: "#e9e9e9",

    black: "#000000",
    label: "#727272",
    label100: "#727272",

    primary: "#000000",

    border: "#e9e9e9",
    border100: "#c4c4c4",

    disabled: "#95989A",
    highlight: "#020d1e",

    badge: "#0404fc",

    shadow: "rgba(0, 0, 0, 0.16)",

    error: "#FF5D30",
    error100: "#F16C41",
    info: "#709BE7",

    inputBorder: "#000000",
  },

  borderRadiusSm: "3px",
  borderRadiusMd: "15px",
  borderRadiusBg: "30px",

  fontHead: getFont(),
  fontText: getFont("Nunito", "regular", false),
  fontMono: getFont("SpaceMono", "regular", false),
};
