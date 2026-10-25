import { defineComponent as r, openBlock as t, createBlock as o, unref as n, normalizeProps as s, guardReactiveProps as c } from "vue";
import { database as m } from "@primeicons/core/database";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Database",
  inheritAttrs: !1,
  __name: "database",
  setup(i) {
    const { Icon: e } = p(m);
    return (a, f) => (t(), o(n(e), s(c(a.$attrs)), null, 16));
  }
});
export {
  d as default
};
