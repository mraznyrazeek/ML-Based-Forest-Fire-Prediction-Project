import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { sidebar as i } from "@primeicons/core/sidebar";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Sidebar",
  inheritAttrs: !1,
  __name: "sidebar",
  setup(p) {
    const { Icon: e } = m(i);
    return (r, f) => (t(), n(a(e), s(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
