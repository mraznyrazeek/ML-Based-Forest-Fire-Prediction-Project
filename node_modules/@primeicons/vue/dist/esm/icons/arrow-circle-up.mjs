import { defineComponent as o, openBlock as t, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as p } from "vue";
import { arrowCircleUp as i } from "@primeicons/core/arrow-circle-up";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "ArrowCircleUp",
  inheritAttrs: !1,
  __name: "arrow-circle-up",
  setup(s) {
    const { Icon: r } = m(i);
    return (e, l) => (t(), n(c(r), a(p(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
