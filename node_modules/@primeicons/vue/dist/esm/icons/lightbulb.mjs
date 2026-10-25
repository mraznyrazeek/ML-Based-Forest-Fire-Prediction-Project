import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { lightbulb as l } from "@primeicons/core/lightbulb";
import { createIcon as m } from "@primeicons/vue/core";
const b = /* @__PURE__ */ t({
  name: "Lightbulb",
  inheritAttrs: !1,
  __name: "lightbulb",
  setup(p) {
    const { Icon: e } = m(l);
    return (r, s) => (o(), n(a(e), c(i(r.$attrs)), null, 16));
  }
});
export {
  b as default
};
