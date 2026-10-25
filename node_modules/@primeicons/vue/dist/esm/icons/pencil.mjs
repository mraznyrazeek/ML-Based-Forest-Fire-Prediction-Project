import { defineComponent as n, openBlock as o, createBlock as t, unref as c, normalizeProps as a, guardReactiveProps as p } from "vue";
import { pencil as i } from "@primeicons/core/pencil";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ n({
  name: "Pencil",
  inheritAttrs: !1,
  __name: "pencil",
  setup(s) {
    const { Icon: e } = m(i);
    return (r, l) => (o(), t(c(e), a(p(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
