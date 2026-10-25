import { defineComponent as t, openBlock as o, createBlock as n, unref as c, normalizeProps as p, guardReactiveProps as a } from "vue";
import { receipt as i } from "@primeicons/core/receipt";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "Receipt",
  inheritAttrs: !1,
  __name: "receipt",
  setup(s) {
    const { Icon: e } = m(i);
    return (r, f) => (o(), n(c(e), p(a(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
