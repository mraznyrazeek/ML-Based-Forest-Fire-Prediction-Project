import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { warehouse as m } from "@primeicons/core/warehouse";
import { createIcon as p } from "@primeicons/vue/core";
const h = /* @__PURE__ */ o({
  name: "Warehouse",
  inheritAttrs: !1,
  __name: "warehouse",
  setup(u) {
    const { Icon: e } = p(m);
    return (r, i) => (t(), n(a(e), s(c(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
