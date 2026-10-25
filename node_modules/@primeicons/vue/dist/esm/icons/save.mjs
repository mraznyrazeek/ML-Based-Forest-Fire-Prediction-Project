import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { save as m } from "@primeicons/core/save";
import { createIcon as p } from "@primeicons/vue/core";
const v = /* @__PURE__ */ o({
  name: "Save",
  inheritAttrs: !1,
  __name: "save",
  setup(i) {
    const { Icon: e } = p(m);
    return (r, f) => (t(), n(a(e), s(c(r.$attrs)), null, 16));
  }
});
export {
  v as default
};
