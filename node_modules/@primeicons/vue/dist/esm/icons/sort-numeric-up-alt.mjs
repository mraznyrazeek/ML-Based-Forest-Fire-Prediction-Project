import { defineComponent as t, openBlock as o, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as m } from "vue";
import { sortNumericUpAlt as p } from "@primeicons/core/sort-numeric-up-alt";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "SortNumericUpAlt",
  inheritAttrs: !1,
  __name: "sort-numeric-up-alt",
  setup(i) {
    const { Icon: r } = s(p);
    return (e, u) => (o(), n(c(r), a(m(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
