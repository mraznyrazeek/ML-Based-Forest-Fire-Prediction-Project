import { defineComponent as o, openBlock as t, createBlock as n, unref as p, normalizeProps as a, guardReactiveProps as c } from "vue";
import { eyeDropper as m } from "@primeicons/core/eye-dropper";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "EyeDropper",
  inheritAttrs: !1,
  __name: "eye-dropper",
  setup(i) {
    const { Icon: e } = s(m);
    return (r, f) => (t(), n(p(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
