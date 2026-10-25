import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { arrowRight as m } from "@primeicons/core/arrow-right";
import { createIcon as p } from "@primeicons/vue/core";
const h = /* @__PURE__ */ e({
  name: "ArrowRight",
  inheritAttrs: !1,
  __name: "arrow-right",
  setup(s) {
    const { Icon: r } = p(m);
    return (o, f) => (t(), n(a(r), c(i(o.$attrs)), null, 16));
  }
});
export {
  h as default
};
