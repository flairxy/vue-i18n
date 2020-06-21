<template>
  <div>
    <hr />
    <p>{{ $t("message", { name: name }) }}</p>
    <!-- in es6 if the key and value are the same just use it once -->
    <!-- <p>{{ $t("goodbye", { name }) }}</p> -->

    <hr />
    <!-- for pluralisation -->
    <h5 class="text-muted">pluralisation</h5>
    <p>{{ $tc("fruits.apple", 0) }}</p>
    <p>{{ $tc("fruits.apple", 1) }}</p>
    <!-- <p>{{ $tc("fruits.apple", 4) }}</p> -->
    <!-- <p>{{ $tc("car", 1) }}</p> -->
    <!-- <p>{{ $tc("car", 4) }}</p> -->
    <!-- end pluralisation -->
    <hr />

    <!-- date and time -->
    <h5 class="text-muted">date and time</h5>
    <p>{{ $d(new Date(), "short") }}</p>
    <!-- <p>{{ $d(new Date(), "long") }}</p> -->
    <!-- with iso-code -->
    <!-- <p>{{ $d(new Date(), "short", "en-GB") }}</p> -->
    <p>{{ $d(new Date(), "long", "en-GB") }}</p>
    <!-- end date and time -->
    <hr />
    <!-- number localization -->
    <h5 class="text-muted">number localization</h5>
    <!-- <p>{{ $n(100, "currency") }}</p> -->
    <p>{{ product.name }}: {{ $n(product.price, "currency") }}</p>
    <p>{{ product.stock }} left in stock</p>
    <!-- end number loalization -->
    <hr />
    <!-- currency formating -->
    <h5 class="text-muted">currency formating</h5>
    <i18n-n :value="4998.89" format="currency">
      <template v-slot:currency="slotProps">
        <span style="color: red; font-weight: bold; font-size: 25px">
          {{ slotProps.currency }}
        </span>
      </template>
      <template v-slot:integer="slotProps">
        <span style="color: red; font-size: 25px">{{ slotProps.integer }}</span>
      </template>
      <template v-slot:decimal="slotProps">
        <span style="color: blue">{{ slotProps.decimal }}</span>
      </template>
      <template v-slot:fraction="slotProps">
        <span style="color: purple"> {{ slotProps.fraction }}</span>
      </template>
      <template v-slot:group="slotProps">
        <span style="color: red, font-size: 25px"> {{ slotProps.group }}</span>
      </template>
    </i18n-n>
    <!-- end currency formating -->
    <br />
    <button @click="setLocale('en-GB')" class="button">UK</button>
    <button @click="setLocale('en-US')" class="button">USA</button>
    <button @click="setLocale('es-ES')" class="button">Spain</button>
    <br />
    <hr />
    <!-- component interpolation (working with links) -->
    <h5 class="text-muted">component interpolation (working with links)</h5>
    <!-- <p>
      {{ $t("term1") }} <a href="/terms">{{ $t("term2") }}</a> {{ $t("term3") }}
    </p> -->
    <i18n path="terms" tag="p">
      <template v-slot:termsURL>
        <a href="/terms"> {{ $t("termsLink") }}</a>
      </template>
    </i18n>
    <button @click="setLocale('en')" class="button">UK</button>
    <button @click="setLocale('')" class="button">German</button>
    <button @click="setLocale('es')" class="button">Spain</button>
    <!-- end component interpolation -->
  </div>
</template>

<script>
// const messages = {
//   en: {
//     term1: "I accept the",
//     term2: "terms and conditions",
//     term3: "of the service contract",
//   },
// };
const products = {
  "en-GB": {
    name: "red jeans",
    stock: 4,
    price: 102
  },
  "en-US": {
    name: "red jeans",
    stock: 2,
    price: 120
  },
  "es-ES": {
    name: "vaqueros rojos",
    stock: 3,
    price: 89
  }
};

export default {
  name: "HelloI18n",
  data: () => ({
    name: "Flair Buchi Okonkwo"
  }),
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem("locale", locale);
    }
  },
  created() {
    let locale = localStorage.getItem("locale");
    if (locale) {
      this.$i18n.locale = locale;
    } else if (navigator.language) {
      this.$i18n.locale = navigator.language.substring(0, 2);
    }
  },
  computed: {
    product() {
      return products[this.$i18n.locale];
    }
  }
};
</script>
