import { defineComponent as t, openBlock as n, createBlock as o, unref as a, normalizeProps as i, guardReactiveProps as s } from "vue";
import { alignJustify as c } from "@primeicons/core/align-justify";
import { createIcon as f } from "@primeicons/vue/core";
const g = /* @__PURE__ */ t({
  name: "AlignJustify",
  inheritAttrs: !1,
  __name: "align-justify",
  setup(m) {
    const { Icon: e } = f(c);
    return (r, p) => (n(), o(a(e), i(s(r.$attrs)), null, 16));
  }
});
export {
  g as default
};
