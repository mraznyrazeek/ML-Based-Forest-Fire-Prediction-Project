import { defineComponent as n, openBlock as o, createBlock as t, unref as a, normalizeProps as p, guardReactiveProps as c } from "vue";
import { angleUp as m } from "@primeicons/core/angle-up";
import { createIcon as s } from "@primeicons/vue/core";
const g = /* @__PURE__ */ n({
  name: "AngleUp",
  inheritAttrs: !1,
  __name: "angle-up",
  setup(l) {
    const { Icon: e } = s(m);
    return (r, i) => (o(), t(a(e), p(c(r.$attrs)), null, 16));
  }
});
export {
  g as default
};
