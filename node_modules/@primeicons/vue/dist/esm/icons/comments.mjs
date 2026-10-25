import { defineComponent as r, openBlock as t, createBlock as n, unref as m, normalizeProps as c, guardReactiveProps as s } from "vue";
import { comments as a } from "@primeicons/core/comments";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Comments",
  inheritAttrs: !1,
  __name: "comments",
  setup(i) {
    const { Icon: e } = p(a);
    return (o, f) => (t(), n(m(e), c(s(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
