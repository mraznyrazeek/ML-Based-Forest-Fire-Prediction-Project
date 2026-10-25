import { defineComponent as t, openBlock as o, createBlock as n, unref as s, normalizeProps as a, guardReactiveProps as c } from "vue";
import { listTree as i } from "@primeicons/core/list-tree";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "ListTree",
  inheritAttrs: !1,
  __name: "list-tree",
  setup(p) {
    const { Icon: e } = m(i);
    return (r, l) => (o(), n(s(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
