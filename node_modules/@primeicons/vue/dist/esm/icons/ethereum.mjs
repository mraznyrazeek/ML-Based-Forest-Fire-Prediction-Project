import { defineComponent as t, openBlock as o, createBlock as n, unref as m, normalizeProps as a, guardReactiveProps as c } from "vue";
import { ethereum as p } from "@primeicons/core/ethereum";
import { createIcon as s } from "@primeicons/vue/core";
const h = /* @__PURE__ */ t({
  name: "Ethereum",
  inheritAttrs: !1,
  __name: "ethereum",
  setup(u) {
    const { Icon: e } = s(p);
    return (r, i) => (o(), n(m(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
