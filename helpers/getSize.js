export function getSize(width, height, size) {
  if (width && height) {
    return [width, height];
  } else {
    return [size, size];
  }
}
