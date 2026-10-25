import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { at as p } from "@primeicons/core/at";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "At",
  inheritAttrs: !1,
  __name: "at",
  setup(i) {
    const { Icon: e } = s(p);
    return (r, f) => (o(), n(a(e), c(m(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
