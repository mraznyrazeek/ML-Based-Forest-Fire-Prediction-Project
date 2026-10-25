import { defineComponent as r, openBlock as n, createBlock as t, unref as a, normalizeProps as m, guardReactiveProps as c } from "vue";
import { moon as p } from "@primeicons/core/moon";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Moon",
  inheritAttrs: !1,
  __name: "moon",
  setup(i) {
    const { Icon: o } = s(p);
    return (e, f) => (n(), t(a(o), m(c(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
