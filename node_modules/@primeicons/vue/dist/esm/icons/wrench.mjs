import { defineComponent as n, openBlock as o, createBlock as t, unref as c, normalizeProps as a, guardReactiveProps as m } from "vue";
import { wrench as p } from "@primeicons/core/wrench";
import { createIcon as s } from "@primeicons/vue/core";
const h = /* @__PURE__ */ n({
  name: "Wrench",
  inheritAttrs: !1,
  __name: "wrench",
  setup(i) {
    const { Icon: e } = s(p);
    return (r, f) => (o(), t(c(e), a(m(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
