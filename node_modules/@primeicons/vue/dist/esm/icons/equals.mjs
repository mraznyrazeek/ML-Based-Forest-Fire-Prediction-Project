import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { equals as m } from "@primeicons/core/equals";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Equals",
  inheritAttrs: !1,
  __name: "equals",
  setup(l) {
    const { Icon: e } = p(m);
    return (r, u) => (t(), n(a(e), s(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
