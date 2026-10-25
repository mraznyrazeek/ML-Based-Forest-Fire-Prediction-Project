import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { file as m } from "@primeicons/core/file";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "File",
  inheritAttrs: !1,
  __name: "file",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, f) => (t(), n(a(e), c(i(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
