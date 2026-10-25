import { defineComponent as r, openBlock as n, createBlock as t, unref as c, normalizeProps as m, guardReactiveProps as s } from "vue";
import { columns2 as a } from "@primeicons/core/columns-2";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Columns2",
  inheritAttrs: !1,
  __name: "columns-2",
  setup(l) {
    const { Icon: o } = p(a);
    return (e, u) => (n(), t(c(o), m(s(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
