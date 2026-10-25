import { defineComponent as r, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { bolt as p } from "@primeicons/core/bolt";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Bolt",
  inheritAttrs: !1,
  __name: "bolt",
  setup(l) {
    const { Icon: o } = s(p);
    return (e, i) => (t(), n(a(o), c(m(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
