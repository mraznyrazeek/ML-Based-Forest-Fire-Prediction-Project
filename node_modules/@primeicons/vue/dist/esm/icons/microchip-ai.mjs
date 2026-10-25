import { defineComponent as e, openBlock as t, createBlock as c, unref as i, normalizeProps as n, guardReactiveProps as a } from "vue";
import { microchipAi as p } from "@primeicons/core/microchip-ai";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ e({
  name: "MicrochipAi",
  inheritAttrs: !1,
  __name: "microchip-ai",
  setup(s) {
    const { Icon: r } = m(p);
    return (o, f) => (t(), c(i(r), n(a(o.$attrs)), null, 16));
  }
});
export {
  h as default
};
