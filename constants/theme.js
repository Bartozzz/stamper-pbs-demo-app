import getFont from "../helpers/getFont";

export default {
  colors: {
    background: "#001232",
    background100: "#001333",

    white: "#ffffff",
    link: "#709BE7",

    primary: "#0046F4",

    border: "#233055",
    border100: "#203451",

    disabled: "#95989A",
    highlight: "#020d1e",
    label: "#3e619e",
    badge: "#00d1ff",

    shadow: "rgba(0, 0, 0, 0.16)",

    error: "#FF5D30",
    info: "#709BE7",

    inputBorder: "#555f6f",
  },

  borderRadiusSm: "7px",
  borderRadiusMd: "10px",
  borderRadiusBg: "20px",

  fontHead: getFont(),
  fontText: getFont("nunito", "regular", false),
  fontMono: "space-mono",
};
