import { defineComponent as r, openBlock as n, createBlock as t, unref as a, normalizeProps as m, guardReactiveProps as c } from "vue";
import { amazon as p } from "@primeicons/core/amazon";
import { createIcon as s } from "@primeicons/vue/core";
const z = /* @__PURE__ */ r({
  name: "Amazon",
  inheritAttrs: !1,
  __name: "amazon",
  setup(i) {
    const { Icon: o } = s(p);
    return (e, f) => (n(), t(a(o), m(c(e.$attrs)), null, 16));
  }
});
export {
  z as default
};
