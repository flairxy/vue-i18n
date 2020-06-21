import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const numberFormats = {
  "en-GB": {
    currency: {
      style: "currency",
      currency: "GBP"
    }
  },
  "en-US": {
    currency: {
      style: "currency",
      currency: "USD"
      // currencyDisplay: "code", options are symbol, code and name. symbol is the default
    }
  },
  "es-ES": {
    currency: {
      style: "currency",
      currency: "EUR"
      // currencyDisplay: "name",
    }
  }
};

const setDateTimeFormats = {
  short: {
    year: "numeric", //this can also be 2-digit
    month: "short",
    day: "numeric" //this can also be 2-digit
  },
  long: {
    year: "numeric", //this can also be 2-digit
    month: "long",
    day: "numeric", //this can also be 2-digit
    weekday: "long",
    hour: "numeric",
    minute: "numeric"
  }
};

// for date and time we first define our datetimeformat
const dateTimeFormats = {
  en: setDateTimeFormats,
  es: setDateTimeFormats,
  de: setDateTimeFormats,
  "en-GB": setDateTimeFormats
};

function loadLocaleMessages() {
  const locales = require.context(
    "./locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: loadLocaleMessages(),
  dateTimeFormats, //remember this is the same as dateTimeFormats: dateTimeFormats
  numberFormats
});
