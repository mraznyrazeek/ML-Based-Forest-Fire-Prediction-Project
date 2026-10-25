import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { caretRight as m } from "@primeicons/core/caret-right";
import { createIcon as p } from "@primeicons/vue/core";
const h = /* @__PURE__ */ t({
  name: "CaretRight",
  inheritAttrs: !1,
  __name: "caret-right",
  setup(s) {
    const { Icon: r } = p(m);
    return (e, f) => (o(), n(a(r), c(i(e.$attrs)), null, 16));
  }
});
export {
  h as default
};
