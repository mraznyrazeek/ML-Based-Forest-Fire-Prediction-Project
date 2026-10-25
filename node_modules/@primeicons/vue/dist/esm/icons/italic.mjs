import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { italic as m } from "@primeicons/core/italic";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "Italic",
  inheritAttrs: !1,
  __name: "italic",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, l) => (o(), n(a(e), c(i(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
