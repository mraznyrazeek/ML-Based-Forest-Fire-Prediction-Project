import { defineComponent as t, openBlock as o, createBlock as n, unref as i, normalizeProps as a, guardReactiveProps as c } from "vue";
import { fileEdit as m } from "@primeicons/core/file-edit";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "FileEdit",
  inheritAttrs: !1,
  __name: "file-edit",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, f) => (o(), n(i(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
