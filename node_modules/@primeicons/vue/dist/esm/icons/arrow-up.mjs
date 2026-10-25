import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as p, guardReactiveProps as c } from "vue";
import { arrowUp as m } from "@primeicons/core/arrow-up";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "ArrowUp",
  inheritAttrs: !1,
  __name: "arrow-up",
  setup(i) {
    const { Icon: r } = s(m);
    return (o, f) => (t(), n(a(r), p(c(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
