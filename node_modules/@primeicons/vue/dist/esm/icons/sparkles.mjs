import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as p } from "vue";
import { sparkles as c } from "@primeicons/core/sparkles";
import { createIcon as m } from "@primeicons/vue/core";
const k = /* @__PURE__ */ o({
  name: "Sparkles",
  inheritAttrs: !1,
  __name: "sparkles",
  setup(l) {
    const { Icon: e } = m(c);
    return (r, i) => (t(), n(a(e), s(p(r.$attrs)), null, 16));
  }
});
export {
  k as default
};
