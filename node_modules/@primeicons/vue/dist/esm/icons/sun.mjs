import { defineComponent as n, openBlock as o, createBlock as t, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { sun as m } from "@primeicons/core/sun";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ n({
  name: "Sun",
  inheritAttrs: !1,
  __name: "sun",
  setup(u) {
    const { Icon: e } = p(m);
    return (r, i) => (o(), t(a(e), s(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
