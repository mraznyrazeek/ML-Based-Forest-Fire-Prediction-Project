import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { creditCard as m } from "@primeicons/core/credit-card";
import { createIcon as p } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ t({
  name: "CreditCard",
  inheritAttrs: !1,
  __name: "credit-card",
  setup(s) {
    const { Icon: r } = p(m);
    return (e, d) => (o(), n(a(r), c(i(e.$attrs)), null, 16));
  }
});
export {
  _ as default
};
