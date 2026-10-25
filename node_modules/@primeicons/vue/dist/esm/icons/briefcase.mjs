import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as s } from "vue";
import { briefcase as i } from "@primeicons/core/briefcase";
import { createIcon as f } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Briefcase",
  inheritAttrs: !1,
  __name: "briefcase",
  setup(m) {
    const { Icon: e } = f(i);
    return (r, p) => (t(), n(a(e), c(s(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
