import { defineComponent as o, openBlock as t, createBlock as c, unref as n, normalizeProps as a, guardReactiveProps as m } from "vue";
import { check as p } from "@primeicons/core/check";
import { createIcon as s } from "@primeicons/vue/core";
const h = /* @__PURE__ */ o({
  name: "Check",
  inheritAttrs: !1,
  __name: "check",
  setup(i) {
    const { Icon: e } = s(p);
    return (r, f) => (t(), c(n(e), a(m(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
