import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { eyeSlash as m } from "@primeicons/core/eye-slash";
import { createIcon as p } from "@primeicons/vue/core";
const h = /* @__PURE__ */ o({
  name: "EyeSlash",
  inheritAttrs: !1,
  __name: "eye-slash",
  setup(l) {
    const { Icon: e } = p(m);
    return (r, i) => (t(), n(a(e), s(c(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
