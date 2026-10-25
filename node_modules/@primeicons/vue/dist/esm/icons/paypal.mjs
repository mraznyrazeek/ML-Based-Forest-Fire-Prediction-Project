import { defineComponent as o, openBlock as a, createBlock as t, unref as n, normalizeProps as p, guardReactiveProps as c } from "vue";
import { paypal as m } from "@primeicons/core/paypal";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Paypal",
  inheritAttrs: !1,
  __name: "paypal",
  setup(l) {
    const { Icon: e } = s(m);
    return (r, i) => (a(), t(n(e), p(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
