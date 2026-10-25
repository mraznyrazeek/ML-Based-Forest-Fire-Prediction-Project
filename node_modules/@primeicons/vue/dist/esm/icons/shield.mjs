import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { shield as i } from "@primeicons/core/shield";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Shield",
  inheritAttrs: !1,
  __name: "shield",
  setup(p) {
    const { Icon: e } = m(i);
    return (r, l) => (t(), n(a(e), s(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
