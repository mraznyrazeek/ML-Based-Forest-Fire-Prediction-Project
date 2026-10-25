import { defineComponent as o, openBlock as t, createBlock as n, unref as m, normalizeProps as a, guardReactiveProps as p } from "vue";
import { prime as c } from "@primeicons/core/prime";
import { createIcon as i } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Prime",
  inheritAttrs: !1,
  __name: "prime",
  setup(s) {
    const { Icon: e } = i(c);
    return (r, f) => (t(), n(m(e), a(p(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
