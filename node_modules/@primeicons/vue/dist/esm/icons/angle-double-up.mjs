import { defineComponent as r, openBlock as n, createBlock as t, unref as a, normalizeProps as p, guardReactiveProps as l } from "vue";
import { angleDoubleUp as c } from "@primeicons/core/angle-double-up";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "AngleDoubleUp",
  inheritAttrs: !1,
  __name: "angle-double-up",
  setup(s) {
    const { Icon: e } = m(c);
    return (o, u) => (n(), t(a(e), p(l(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
