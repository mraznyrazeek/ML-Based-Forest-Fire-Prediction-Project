import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as p, guardReactiveProps as c } from "vue";
import { arrowDownLeftAndArrowUpRightToCenter as i } from "@primeicons/core/arrow-down-left-and-arrow-up-right-to-center";
import { createIcon as f } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "ArrowDownLeftAndArrowUpRightToCenter",
  inheritAttrs: !1,
  __name: "arrow-down-left-and-arrow-up-right-to-center",
  setup(m) {
    const { Icon: r } = f(i);
    return (o, s) => (t(), n(a(r), p(c(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
