import i18n from "../translations";
import images from "./images";
import * as Routes from "../navigation";

export default [
  {
    icon: images.MenuImageMap,
    text: i18n.t("dashboard.map"),
    redirect: Routes.MAP,
  },
  {
    icon: images.MenuImageWallet,
    text: i18n.t("dashboard.wallet"),
    redirect: Routes.WALLET,
  },
  {
    icon: images.MenuImagePrizes,
    text: i18n.t("dashboard.prizes"),
    redirect: Routes.PRIZES,
  },
  {
    icon: images.MenuImageProfile,
    text: i18n.t("dashboard.profile"),
    redirect: Routes.PROFILE,
  },
  {
    icon: images.MenuImageMarket,
    text: i18n.t("dashboard.market"),
    redirect: null,
  },
  {
    icon: images.MenuImageScanner,
    text: i18n.t("dashboard.scanner"),
    redirect: Routes.SCANNER,
  },
];
