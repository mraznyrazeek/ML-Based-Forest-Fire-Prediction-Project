import { defineComponent as o, openBlock as t, createBlock as n, unref as s, normalizeProps as a, guardReactiveProps as p } from "vue";
import { plus as c } from "@primeicons/core/plus";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Plus",
  inheritAttrs: !1,
  __name: "plus",
  setup(l) {
    const { Icon: e } = m(c);
    return (r, u) => (t(), n(s(e), a(p(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
