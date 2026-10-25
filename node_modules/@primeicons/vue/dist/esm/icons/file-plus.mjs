import { defineComponent as o, openBlock as t, createBlock as n, unref as s, normalizeProps as a, guardReactiveProps as l } from "vue";
import { filePlus as c } from "@primeicons/core/file-plus";
import { createIcon as i } from "@primeicons/vue/core";
const P = /* @__PURE__ */ o({
  name: "FilePlus",
  inheritAttrs: !1,
  __name: "file-plus",
  setup(p) {
    const { Icon: e } = i(c);
    return (r, m) => (t(), n(s(e), a(l(r.$attrs)), null, 16));
  }
});
export {
  P as default
};
