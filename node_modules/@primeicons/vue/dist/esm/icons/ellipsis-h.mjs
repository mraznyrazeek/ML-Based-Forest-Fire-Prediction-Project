import { defineComponent as o, openBlock as t, createBlock as n, unref as s, normalizeProps as i, guardReactiveProps as p } from "vue";
import { ellipsisH as a } from "@primeicons/core/ellipsis-h";
import { createIcon as l } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "EllipsisH",
  inheritAttrs: !1,
  __name: "ellipsis-h",
  setup(c) {
    const { Icon: e } = l(a);
    return (r, m) => (t(), n(s(e), i(p(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
