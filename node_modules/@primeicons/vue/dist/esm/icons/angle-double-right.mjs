import { defineComponent as r, openBlock as t, createBlock as n, unref as a, normalizeProps as l, guardReactiveProps as c } from "vue";
import { angleDoubleRight as i } from "@primeicons/core/angle-double-right";
import { createIcon as m } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ r({
  name: "AngleDoubleRight",
  inheritAttrs: !1,
  __name: "angle-double-right",
  setup(p) {
    const { Icon: e } = m(i);
    return (o, s) => (t(), n(a(e), l(c(o.$attrs)), null, 16));
  }
});
export {
  _ as default
};
