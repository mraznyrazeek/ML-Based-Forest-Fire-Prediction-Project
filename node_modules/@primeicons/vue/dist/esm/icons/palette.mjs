import { defineComponent as r, openBlock as o, createBlock as n, unref as a, normalizeProps as p, guardReactiveProps as c } from "vue";
import { palette as m } from "@primeicons/core/palette";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Palette",
  inheritAttrs: !1,
  __name: "palette",
  setup(l) {
    const { Icon: e } = s(m);
    return (t, i) => (o(), n(a(e), p(c(t.$attrs)), null, 16));
  }
});
export {
  d as default
};
