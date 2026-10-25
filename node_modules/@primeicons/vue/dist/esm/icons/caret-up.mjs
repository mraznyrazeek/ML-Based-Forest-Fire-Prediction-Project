import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as p } from "vue";
import { caretUp as m } from "@primeicons/core/caret-up";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "CaretUp",
  inheritAttrs: !1,
  __name: "caret-up",
  setup(i) {
    const { Icon: e } = s(m);
    return (r, f) => (o(), n(a(e), c(p(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
