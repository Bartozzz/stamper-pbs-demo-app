import i18n from "../translations";
import images from "./images";

export default [
  {
    background: images.WelcomeCarousel1,
    image: images.StamperSygnet,
    width: 70,
    flex: 0.5,
    title: i18n.t("welcome.title1"),
    subtitle: i18n.t("welcome.subtitle1"),
  },
  {
    image: images.WelcomeCarousel2,
    title: i18n.t("welcome.title2"),
    subtitle: i18n.t("welcome.subtitle2"),
  },
  {
    image: images.WelcomeCarousel3,
    title: i18n.t("welcome.title3"),
    subtitle: i18n.t("welcome.subtitle3"),
  },
  {
    image: images.WelcomeCarousel4,
    title: i18n.t("welcome.title4"),
    subtitle: i18n.t("welcome.subtitle4"),
  },
];
