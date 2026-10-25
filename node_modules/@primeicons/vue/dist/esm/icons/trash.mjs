import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { trash as m } from "@primeicons/core/trash";
import { createIcon as p } from "@primeicons/vue/core";
const h = /* @__PURE__ */ t({
  name: "Trash",
  inheritAttrs: !1,
  __name: "trash",
  setup(i) {
    const { Icon: r } = p(m);
    return (e, f) => (o(), n(a(r), s(c(e.$attrs)), null, 16));
  }
});
export {
  h as default
};
