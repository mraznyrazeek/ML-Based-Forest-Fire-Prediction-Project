import { defineComponent as n, openBlock as o, createBlock as t, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { underline as m } from "@primeicons/core/underline";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ n({
  name: "Underline",
  inheritAttrs: !1,
  __name: "underline",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, l) => (o(), t(a(e), c(i(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
