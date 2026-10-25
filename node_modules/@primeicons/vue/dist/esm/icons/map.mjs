import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as p, guardReactiveProps as m } from "vue";
import { map as c } from "@primeicons/core/map";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Map",
  inheritAttrs: !1,
  __name: "map",
  setup(i) {
    const { Icon: e } = s(c);
    return (r, f) => (t(), n(a(e), p(m(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
