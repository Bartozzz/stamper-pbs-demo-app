import { Localization } from "expo-localization";
import i18n from "i18n-js";
import pl from "./pl";
import en from "./en";

// @see https://docs.expo.io/versions/latest/sdk/localization/
i18n.fallbacks = true;
i18n.translations = { pl, en };
i18n.locale = Localization.locale;
i18n.defaultLocale = "pl";

export default i18n;
