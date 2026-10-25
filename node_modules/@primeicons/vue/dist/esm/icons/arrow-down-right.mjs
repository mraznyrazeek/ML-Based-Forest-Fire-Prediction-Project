import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { arrowDownRight as m } from "@primeicons/core/arrow-down-right";
import { createIcon as p } from "@primeicons/vue/core";
const w = /* @__PURE__ */ e({
  name: "ArrowDownRight",
  inheritAttrs: !1,
  __name: "arrow-down-right",
  setup(s) {
    const { Icon: r } = p(m);
    return (o, f) => (t(), n(a(r), c(i(o.$attrs)), null, 16));
  }
});
export {
  w as default
};
