import getFont from "../helpers/getFont";

export default {
  colors: {
    background: "#001232",
    background100: "#001333",
    background200: "#001432",

    white: "#ffffff",
    white100: "#dad9e3",
    white200: "#F8F8F8",

    black: "#000000",
    label: "#709BE7",
    label100: "#74798b",

    primary: "#0046F4",

    border: "#233055",
    border100: "#203451",

    disabled: "#95989A",
    highlight: "#020d1e",

    badge: "#00d1ff",

    shadow: "rgba(0, 0, 0, 0.16)",

    error: "#FF5D30",
    error100: "#F16C41",
    info: "#709BE7",

    inputBorder: "#555f6f",
  },

  borderRadiusSm: "7px",
  borderRadiusMd: "10px",
  borderRadiusBg: "20px",

  fontHead: getFont(),
  fontText: getFont("Nunito", "regular", false),
  fontMono: getFont("SpaceMono", "regular", false),
};
