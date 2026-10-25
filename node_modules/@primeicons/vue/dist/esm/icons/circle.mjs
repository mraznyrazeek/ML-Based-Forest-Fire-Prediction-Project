import { defineComponent as o, openBlock as t, createBlock as c, unref as n, normalizeProps as a, guardReactiveProps as i } from "vue";
import { circle as m } from "@primeicons/core/circle";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Circle",
  inheritAttrs: !1,
  __name: "circle",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, l) => (t(), c(n(e), a(i(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
