import { defineComponent as n, openBlock as o, createBlock as t, unref as a, normalizeProps as p, guardReactiveProps as c } from "vue";
import { expand as m } from "@primeicons/core/expand";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ n({
  name: "Expand",
  inheritAttrs: !1,
  __name: "expand",
  setup(i) {
    const { Icon: e } = s(m);
    return (r, f) => (o(), t(a(e), p(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
