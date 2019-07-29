/* 
  i18n.js

  Source:
  https://github.com/react-boilerplate/react-boilerplate/blob/master/docs/general/introduction.md
*/
const addLocaleData = require("react-intl").addLocaleData;
const enLocaleData = require("react-intl/locale-data/en");
const deLocaleData = require("react-intl/locale-data/de");
const roLocaleData = require("react-intl/locale-data/ro");

const enTranslationMessages = require("./translations/en.json");
const deTranslationMessages = require("./translations/de.json");
const roTranslationMessages = require("./translations/ro.json");

addLocaleData(enLocaleData);
addLocaleData(deLocaleData);
addLocaleData(roLocaleData);

const DEFAULT_LOCALE = "en";

const appLocales = ["en", "de", "ro"];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  en: formatTranslationMessages("en", enTranslationMessages),
  de: formatTranslationMessages("de", deTranslationMessages),
  ro: formatTranslationMessages("ro", roTranslationMessages)
};

console.log(translationMessages);

exports.appLocales = appLocales;
exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
