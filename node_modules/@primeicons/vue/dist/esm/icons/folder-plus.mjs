import { defineComponent as o, openBlock as t, createBlock as n, unref as s, normalizeProps as a, guardReactiveProps as l } from "vue";
import { folderPlus as c } from "@primeicons/core/folder-plus";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "FolderPlus",
  inheritAttrs: !1,
  __name: "folder-plus",
  setup(m) {
    const { Icon: e } = p(c);
    return (r, f) => (t(), n(s(e), a(l(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
