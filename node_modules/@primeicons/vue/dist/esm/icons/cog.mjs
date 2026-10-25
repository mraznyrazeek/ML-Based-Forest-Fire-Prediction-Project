import { defineComponent as r, openBlock as t, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as m } from "vue";
import { cog as p } from "@primeicons/core/cog";
import { createIcon as s } from "@primeicons/vue/core";
const g = /* @__PURE__ */ r({
  name: "Cog",
  inheritAttrs: !1,
  __name: "cog",
  setup(i) {
    const { Icon: o } = s(p);
    return (e, f) => (t(), n(c(o), a(m(e.$attrs)), null, 16));
  }
});
export {
  g as default
};
