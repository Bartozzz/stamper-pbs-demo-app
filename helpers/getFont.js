export const defaultFont = {
  name: "Poppins",
  weight: "regular",
};

export const weightMap = {
  thin: "100Thin",
  extraLight: "200ExtraLight",
  light: "300Light",
  regular: "400Regular",
  medium: "500Medium",
  semiBold: "600SemiBold",
  bold: "700Bold",
  extraBold: "800ExtraBold",
  black: "900Black",
};

export default function getFont(
  fontName = defaultFont.name,
  weight = defaultFont.weight,
  italic = false
) {
  const suffix = italic ? "_Italic" : "";

  return `${fontName}_${weightMap[weight]}${suffix}`;
}
