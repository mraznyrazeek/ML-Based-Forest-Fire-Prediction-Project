import { defineComponent as r, openBlock as t, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as m } from "vue";
import { cloud as p } from "@primeicons/core/cloud";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Cloud",
  inheritAttrs: !1,
  __name: "cloud",
  setup(l) {
    const { Icon: o } = s(p);
    return (e, u) => (t(), n(c(o), a(m(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
