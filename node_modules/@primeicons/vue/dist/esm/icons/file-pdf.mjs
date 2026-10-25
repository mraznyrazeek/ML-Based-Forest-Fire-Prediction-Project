import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as f, guardReactiveProps as c } from "vue";
import { filePdf as i } from "@primeicons/core/file-pdf";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "FilePdf",
  inheritAttrs: !1,
  __name: "file-pdf",
  setup(m) {
    const { Icon: e } = p(i);
    return (r, s) => (t(), n(a(e), f(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
