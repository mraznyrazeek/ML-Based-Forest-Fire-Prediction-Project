import { defineComponent as o, openBlock as t, createBlock as n, unref as c, normalizeProps as a, guardReactiveProps as l } from "vue";
import { fileExcel as i } from "@primeicons/core/file-excel";
import { createIcon as m } from "@primeicons/vue/core";
const x = /* @__PURE__ */ o({
  name: "FileExcel",
  inheritAttrs: !1,
  __name: "file-excel",
  setup(p) {
    const { Icon: e } = m(i);
    return (r, s) => (t(), n(c(e), a(l(r.$attrs)), null, 16));
  }
});
export {
  x as default
};
