import { defineComponent as r, openBlock as t, createBlock as n, unref as a, normalizeProps as l, guardReactiveProps as c } from "vue";
import { angleDoubleLeft as f } from "@primeicons/core/angle-double-left";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "AngleDoubleLeft",
  inheritAttrs: !1,
  __name: "angle-double-left",
  setup(p) {
    const { Icon: e } = m(f);
    return (o, s) => (t(), n(a(e), l(c(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
