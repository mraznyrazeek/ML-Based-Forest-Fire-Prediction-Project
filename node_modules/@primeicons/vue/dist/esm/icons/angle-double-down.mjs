import { defineComponent as n, openBlock as r, createBlock as t, unref as a, normalizeProps as l, guardReactiveProps as c } from "vue";
import { angleDoubleDown as m } from "@primeicons/core/angle-double-down";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ n({
  name: "AngleDoubleDown",
  inheritAttrs: !1,
  __name: "angle-double-down",
  setup(s) {
    const { Icon: e } = p(m);
    return (o, u) => (r(), t(a(e), l(c(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
