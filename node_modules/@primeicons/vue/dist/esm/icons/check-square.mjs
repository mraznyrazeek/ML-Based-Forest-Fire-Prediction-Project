import { defineComponent as o, openBlock as t, createBlock as c, unref as n, normalizeProps as a, guardReactiveProps as s } from "vue";
import { checkSquare as m } from "@primeicons/core/check-square";
import { createIcon as p } from "@primeicons/vue/core";
const h = /* @__PURE__ */ o({
  name: "CheckSquare",
  inheritAttrs: !1,
  __name: "check-square",
  setup(u) {
    const { Icon: e } = p(m);
    return (r, i) => (t(), c(n(e), a(s(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
