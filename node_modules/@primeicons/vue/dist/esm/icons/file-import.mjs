import { defineComponent as o, openBlock as t, createBlock as n, unref as m, normalizeProps as p, guardReactiveProps as a } from "vue";
import { fileImport as i } from "@primeicons/core/file-import";
import { createIcon as c } from "@primeicons/vue/core";
const I = /* @__PURE__ */ o({
  name: "FileImport",
  inheritAttrs: !1,
  __name: "file-import",
  setup(s) {
    const { Icon: e } = c(i);
    return (r, f) => (t(), n(m(e), p(a(r.$attrs)), null, 16));
  }
});
export {
  I as default
};
