import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { tag as p } from "@primeicons/core/tag";
import { createIcon as s } from "@primeicons/vue/core";
const g = /* @__PURE__ */ t({
  name: "Tag",
  inheritAttrs: !1,
  __name: "tag",
  setup(i) {
    const { Icon: e } = s(p);
    return (r, f) => (o(), n(a(e), c(m(r.$attrs)), null, 16));
  }
});
export {
  g as default
};
