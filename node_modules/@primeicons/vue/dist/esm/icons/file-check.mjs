import { defineComponent as o, openBlock as t, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as i } from "vue";
import { fileCheck as m } from "@primeicons/core/file-check";
import { createIcon as p } from "@primeicons/vue/core";
const h = /* @__PURE__ */ o({
  name: "FileCheck",
  inheritAttrs: !1,
  __name: "file-check",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, f) => (t(), n(c(e), a(i(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
