import { defineComponent as n, openBlock as o, createBlock as t, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { heading2 as m } from "@primeicons/core/heading-2";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ n({
  name: "Heading2",
  inheritAttrs: !1,
  __name: "heading-2",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, f) => (o(), t(a(e), c(i(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
