import { defineComponent as o, openBlock as r, createBlock as t, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { angleDown as p } from "@primeicons/core/angle-down";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "AngleDown",
  inheritAttrs: !1,
  __name: "angle-down",
  setup(l) {
    const { Icon: e } = s(p);
    return (n, i) => (r(), t(a(e), c(m(n.$attrs)), null, 16));
  }
});
export {
  d as default
};
