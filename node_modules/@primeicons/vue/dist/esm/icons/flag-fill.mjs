import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as l, guardReactiveProps as c } from "vue";
import { flagFill as i } from "@primeicons/core/flag-fill";
import { createIcon as f } from "@primeicons/vue/core";
const g = /* @__PURE__ */ o({
  name: "FlagFill",
  inheritAttrs: !1,
  __name: "flag-fill",
  setup(m) {
    const { Icon: e } = f(i);
    return (r, p) => (t(), n(a(e), l(c(r.$attrs)), null, 16));
  }
});
export {
  g as default
};
