import { defineComponent as r, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { google as p } from "@primeicons/core/google";
import { createIcon as s } from "@primeicons/vue/core";
const g = /* @__PURE__ */ r({
  name: "Google",
  inheritAttrs: !1,
  __name: "google",
  setup(l) {
    const { Icon: o } = s(p);
    return (e, i) => (t(), n(a(o), c(m(e.$attrs)), null, 16));
  }
});
export {
  g as default
};
