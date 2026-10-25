import { defineComponent as r, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { dot as p } from "@primeicons/core/dot";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Dot",
  inheritAttrs: !1,
  __name: "dot",
  setup(i) {
    const { Icon: o } = s(p);
    return (e, f) => (t(), n(a(o), c(m(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
