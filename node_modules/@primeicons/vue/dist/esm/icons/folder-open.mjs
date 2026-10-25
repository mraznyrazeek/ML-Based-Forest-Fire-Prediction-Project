import { defineComponent as o, openBlock as n, createBlock as t, unref as p, normalizeProps as a, guardReactiveProps as c } from "vue";
import { folderOpen as m } from "@primeicons/core/folder-open";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "FolderOpen",
  inheritAttrs: !1,
  __name: "folder-open",
  setup(f) {
    const { Icon: e } = s(m);
    return (r, l) => (n(), t(p(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
