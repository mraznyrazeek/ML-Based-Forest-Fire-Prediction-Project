import { defineComponent as r, openBlock as t, createBlock as o, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { indent as m } from "@primeicons/core/indent";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Indent",
  inheritAttrs: !1,
  __name: "indent",
  setup(s) {
    const { Icon: e } = p(m);
    return (n, f) => (t(), o(a(e), c(i(n.$attrs)), null, 16));
  }
});
export {
  d as default
};
