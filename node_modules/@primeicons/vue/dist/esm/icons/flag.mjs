import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { flag as p } from "@primeicons/core/flag";
import { createIcon as s } from "@primeicons/vue/core";
const g = /* @__PURE__ */ o({
  name: "Flag",
  inheritAttrs: !1,
  __name: "flag",
  setup(f) {
    const { Icon: e } = s(p);
    return (r, l) => (t(), n(a(e), c(m(r.$attrs)), null, 16));
  }
});
export {
  g as default
};
