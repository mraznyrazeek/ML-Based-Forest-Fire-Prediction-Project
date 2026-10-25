import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { table as p } from "@primeicons/core/table";
import { createIcon as s } from "@primeicons/vue/core";
const b = /* @__PURE__ */ t({
  name: "Table",
  inheritAttrs: !1,
  __name: "table",
  setup(l) {
    const { Icon: e } = s(p);
    return (r, i) => (o(), n(a(e), c(m(r.$attrs)), null, 16));
  }
});
export {
  b as default
};
