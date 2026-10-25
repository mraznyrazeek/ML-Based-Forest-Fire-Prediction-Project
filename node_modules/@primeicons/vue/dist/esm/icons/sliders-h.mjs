import { defineComponent as o, openBlock as t, createBlock as n, unref as s, normalizeProps as a, guardReactiveProps as c } from "vue";
import { slidersH as i } from "@primeicons/core/sliders-h";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "SlidersH",
  inheritAttrs: !1,
  __name: "sliders-h",
  setup(p) {
    const { Icon: e } = m(i);
    return (r, l) => (t(), n(s(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
