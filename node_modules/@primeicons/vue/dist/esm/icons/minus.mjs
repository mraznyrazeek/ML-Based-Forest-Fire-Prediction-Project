import { defineComponent as n, openBlock as o, createBlock as t, unref as s, normalizeProps as a, guardReactiveProps as m } from "vue";
import { minus as c } from "@primeicons/core/minus";
import { createIcon as i } from "@primeicons/vue/core";
const d = /* @__PURE__ */ n({
  name: "Minus",
  inheritAttrs: !1,
  __name: "minus",
  setup(p) {
    const { Icon: e } = i(c);
    return (r, u) => (o(), t(s(e), a(m(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
