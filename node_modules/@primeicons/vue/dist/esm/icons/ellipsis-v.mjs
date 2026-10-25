import { defineComponent as o, openBlock as t, createBlock as n, unref as s, normalizeProps as i, guardReactiveProps as p } from "vue";
import { ellipsisV as a } from "@primeicons/core/ellipsis-v";
import { createIcon as l } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "EllipsisV",
  inheritAttrs: !1,
  __name: "ellipsis-v",
  setup(c) {
    const { Icon: e } = l(a);
    return (r, m) => (t(), n(s(e), i(p(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
