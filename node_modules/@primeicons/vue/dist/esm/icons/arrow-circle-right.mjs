import { defineComponent as o, openBlock as t, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as i } from "vue";
import { arrowCircleRight as m } from "@primeicons/core/arrow-circle-right";
import { createIcon as p } from "@primeicons/vue/core";
const h = /* @__PURE__ */ o({
  name: "ArrowCircleRight",
  inheritAttrs: !1,
  __name: "arrow-circle-right",
  setup(s) {
    const { Icon: r } = p(m);
    return (e, l) => (t(), n(c(r), a(i(e.$attrs)), null, 16));
  }
});
export {
  h as default
};
