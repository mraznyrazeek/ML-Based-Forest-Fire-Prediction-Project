import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { folder as p } from "@primeicons/core/folder";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Folder",
  inheritAttrs: !1,
  __name: "folder",
  setup(f) {
    const { Icon: e } = s(p);
    return (r, l) => (t(), n(a(e), c(m(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
