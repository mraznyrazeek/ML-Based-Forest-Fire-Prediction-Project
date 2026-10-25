import { defineComponent as o, openBlock as t, createBlock as n, unref as c, normalizeProps as i, guardReactiveProps as s } from "vue";
import { directions as a } from "@primeicons/core/directions";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Directions",
  inheritAttrs: !1,
  __name: "directions",
  setup(p) {
    const { Icon: e } = m(a);
    return (r, f) => (t(), n(c(e), i(s(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
