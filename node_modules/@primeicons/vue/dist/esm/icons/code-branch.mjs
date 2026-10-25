import { defineComponent as o, openBlock as n, createBlock as t, unref as c, normalizeProps as a, guardReactiveProps as m } from "vue";
import { codeBranch as p } from "@primeicons/core/code-branch";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "CodeBranch",
  inheritAttrs: !1,
  __name: "code-branch",
  setup(i) {
    const { Icon: e } = s(p);
    return (r, f) => (n(), t(c(e), a(m(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
