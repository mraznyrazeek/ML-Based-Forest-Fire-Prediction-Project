import { defineComponent as r, openBlock as o, createBlock as t, unref as i, normalizeProps as a, guardReactiveProps as c } from "vue";
import { linkedin as m } from "@primeicons/core/linkedin";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Linkedin",
  inheritAttrs: !1,
  __name: "linkedin",
  setup(s) {
    const { Icon: e } = p(m);
    return (n, l) => (o(), t(i(e), a(c(n.$attrs)), null, 16));
  }
});
export {
  d as default
};
