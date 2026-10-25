import { defineComponent as e, openBlock as t, createBlock as c, unref as n, normalizeProps as i, guardReactiveProps as p } from "vue";
import { microchip as a } from "@primeicons/core/microchip";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ e({
  name: "Microchip",
  inheritAttrs: !1,
  __name: "microchip",
  setup(s) {
    const { Icon: r } = m(a);
    return (o, f) => (t(), c(n(r), i(p(o.$attrs)), null, 16));
  }
});
export {
  h as default
};
