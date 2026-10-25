import { defineComponent as o, openBlock as t, createBlock as n, unref as c, normalizeProps as s, guardReactiveProps as a } from "vue";
import { plusCircle as l } from "@primeicons/core/plus-circle";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "PlusCircle",
  inheritAttrs: !1,
  __name: "plus-circle",
  setup(i) {
    const { Icon: e } = p(l);
    return (r, m) => (t(), n(c(e), s(a(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
