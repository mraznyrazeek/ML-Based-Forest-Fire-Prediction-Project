import { defineComponent as o, openBlock as t, createBlock as n, unref as p, normalizeProps as a, guardReactiveProps as c } from "vue";
import { fileExport as i } from "@primeicons/core/file-export";
import { createIcon as m } from "@primeicons/vue/core";
const x = /* @__PURE__ */ o({
  name: "FileExport",
  inheritAttrs: !1,
  __name: "file-export",
  setup(s) {
    const { Icon: e } = m(i);
    return (r, f) => (t(), n(p(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  x as default
};
