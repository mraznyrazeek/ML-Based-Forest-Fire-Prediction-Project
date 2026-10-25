import { defineComponent as r, openBlock as t, createBlock as n, unref as s, normalizeProps as a, guardReactiveProps as c } from "vue";
import { compass as m } from "@primeicons/core/compass";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Compass",
  inheritAttrs: !1,
  __name: "compass",
  setup(i) {
    const { Icon: o } = p(m);
    return (e, f) => (t(), n(s(o), a(c(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
