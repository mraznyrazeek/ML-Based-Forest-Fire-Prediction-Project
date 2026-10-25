import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { eraser as m } from "@primeicons/core/eraser";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Eraser",
  inheritAttrs: !1,
  __name: "eraser",
  setup(i) {
    const { Icon: r } = p(m);
    return (e, f) => (t(), n(a(r), s(c(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
