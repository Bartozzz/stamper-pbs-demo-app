import images from "../constants/images";

export function getImageForMessage(message) {
  switch (message) {
    case "congratulations":
      return {
        image: images.EarnedReward,
        dimensions: { size: 100 },
        timeout: 5000,
      };

    case "reward":
      return {
        image: images.ReceivedReward,
        dimensions: { size: 100 },
        timeout: 5000,
      };

    case "subtract":
      return {
        image: images.StampSubtract,
        dimensions: { width: 153, height: 100 },
        timeout: 3000,
      };

    default:
      return {
        image: images.StampAdd,
        dimensions: { width: 153, height: 100 },
        timeout: 3000,
      };
  }
}
