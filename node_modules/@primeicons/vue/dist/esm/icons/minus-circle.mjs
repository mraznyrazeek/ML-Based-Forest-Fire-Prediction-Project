import { defineComponent as n, openBlock as o, createBlock as t, unref as c, normalizeProps as i, guardReactiveProps as s } from "vue";
import { minusCircle as a } from "@primeicons/core/minus-circle";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ n({
  name: "MinusCircle",
  inheritAttrs: !1,
  __name: "minus-circle",
  setup(p) {
    const { Icon: e } = m(a);
    return (r, l) => (o(), t(c(e), i(s(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
