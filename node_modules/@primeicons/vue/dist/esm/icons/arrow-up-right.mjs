import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as p, guardReactiveProps as c } from "vue";
import { arrowUpRight as i } from "@primeicons/core/arrow-up-right";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ e({
  name: "ArrowUpRight",
  inheritAttrs: !1,
  __name: "arrow-up-right",
  setup(s) {
    const { Icon: r } = m(i);
    return (o, f) => (t(), n(a(r), p(c(o.$attrs)), null, 16));
  }
});
export {
  h as default
};
