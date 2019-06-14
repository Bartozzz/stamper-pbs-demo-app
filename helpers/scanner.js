import AddStampImage from "../assets/success/stamp_add.gif";
import EarnedRewardImage from "../assets/success/earned_reward.gif";
import ReceivedRewardImage from "../assets/success/received_reward.gif";
import SubtractStampImage from "../assets/success/stamp_subtract.gif";

export function getImageForMessage(message) {
  switch (message) {
    case "congratulations":
      return {
        image: EarnedRewardImage,
        dimensions: { size: 100 },
        timeout: 5000
      };

    case "reward":
      return {
        image: ReceivedRewardImage,
        dimensions: { size: 100 },
        timeout: 5000
      };

    case "subtract":
      return {
        image: SubtractStampImage,
        dimensions: { width: 153, height: 100 },
        timeout: 3000
      };

    default:
      return {
        image: AddStampImage,
        dimensions: { width: 153, height: 100 },
        timeout: 3000
      };
  }
}
