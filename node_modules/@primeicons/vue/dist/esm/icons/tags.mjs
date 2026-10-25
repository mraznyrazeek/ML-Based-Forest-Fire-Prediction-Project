import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { tags as m } from "@primeicons/core/tags";
import { createIcon as p } from "@primeicons/vue/core";
const g = /* @__PURE__ */ t({
  name: "Tags",
  inheritAttrs: !1,
  __name: "tags",
  setup(i) {
    const { Icon: e } = p(m);
    return (r, f) => (o(), n(a(e), s(c(r.$attrs)), null, 16));
  }
});
export {
  g as default
};
