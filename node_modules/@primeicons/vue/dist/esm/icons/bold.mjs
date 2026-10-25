import { defineComponent as r, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { bold as p } from "@primeicons/core/bold";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Bold",
  inheritAttrs: !1,
  __name: "bold",
  setup(l) {
    const { Icon: o } = s(p);
    return (e, i) => (t(), n(a(o), c(m(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
