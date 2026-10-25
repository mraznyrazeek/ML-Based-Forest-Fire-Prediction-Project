import { defineComponent as o, openBlock as r, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { outdent as p } from "@primeicons/core/outdent";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Outdent",
  inheritAttrs: !1,
  __name: "outdent",
  setup(u) {
    const { Icon: e } = s(p);
    return (t, i) => (r(), n(a(e), c(m(t.$attrs)), null, 16));
  }
});
export {
  d as default
};
