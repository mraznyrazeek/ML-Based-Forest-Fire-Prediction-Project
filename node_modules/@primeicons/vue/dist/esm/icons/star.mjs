import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { star as m } from "@primeicons/core/star";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "Star",
  inheritAttrs: !1,
  __name: "star",
  setup(i) {
    const { Icon: r } = p(m);
    return (e, f) => (o(), n(a(r), s(c(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
