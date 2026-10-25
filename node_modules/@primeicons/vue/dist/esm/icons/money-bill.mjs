import { defineComponent as r, openBlock as n, createBlock as t, unref as a, normalizeProps as l, guardReactiveProps as m } from "vue";
import { moneyBill as c } from "@primeicons/core/money-bill";
import { createIcon as i } from "@primeicons/vue/core";
const B = /* @__PURE__ */ r({
  name: "MoneyBill",
  inheritAttrs: !1,
  __name: "money-bill",
  setup(p) {
    const { Icon: e } = i(c);
    return (o, s) => (n(), t(a(e), l(m(o.$attrs)), null, 16));
  }
});
export {
  B as default
};
