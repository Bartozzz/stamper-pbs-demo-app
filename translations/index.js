import { Localization } from "expo-localization";
import i18n from "i18n-js";
import pl from "./pl";
import en from "./en";

// @see https://docs.expo.io/versions/latest/sdk/localization/
i18n.fallbacks = true;
i18n.translations = { pl, en };
i18n.locale = Localization.locale;
i18n.defaultLocale = "pl";

i18n.pluralization["pl"] = function(count) {
  if (count === 0) {
    return ["zero"];
  } else if (count === 1) {
    return ["one"];
  } else if (count > 1 && count < 5) {
    return ["few"];
  } else {
    return ["other"];
  }
};

export default i18n;
