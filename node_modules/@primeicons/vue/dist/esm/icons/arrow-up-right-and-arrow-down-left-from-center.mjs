import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as m, guardReactiveProps as p } from "vue";
import { arrowUpRightAndArrowDownLeftFromCenter as c } from "@primeicons/core/arrow-up-right-and-arrow-down-left-from-center";
import { createIcon as f } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "ArrowUpRightAndArrowDownLeftFromCenter",
  inheritAttrs: !1,
  __name: "arrow-up-right-and-arrow-down-left-from-center",
  setup(i) {
    const { Icon: r } = f(c);
    return (o, s) => (t(), n(a(r), m(p(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
