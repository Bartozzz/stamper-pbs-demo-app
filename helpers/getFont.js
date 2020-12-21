export const defaultFont = {
  name: "poppins",
  weight: "regular",
};

export const weightMap = {
  thin: "thin",
  light: "light",
  extraLight: "extra-light",
  italic: "italic",
  regular: "regular",
  medium: "medium",
  black: "black",
  semiBold: "semi-bold",
  bold: "bold",
  extraBold: "extra-bold",
};

export default function getFont(
  fontName = defaultFont.name,
  weight = defaultFont.weight,
  italic = false
) {
  const suffix = italic ? "-italic" : "";

  return `${fontName}-${weightMap[weight]}${suffix}`;
}
