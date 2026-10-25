import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as f } from "vue";
import { caretLeft as m } from "@primeicons/core/caret-left";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "CaretLeft",
  inheritAttrs: !1,
  __name: "caret-left",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, i) => (o(), n(a(e), c(f(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
