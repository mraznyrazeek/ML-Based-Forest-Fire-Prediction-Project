import { defineComponent as r, openBlock as t, createBlock as n, unref as m, normalizeProps as c, guardReactiveProps as a } from "vue";
import { comment as p } from "@primeicons/core/comment";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Comment",
  inheritAttrs: !1,
  __name: "comment",
  setup(i) {
    const { Icon: e } = s(p);
    return (o, f) => (t(), n(m(e), c(a(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
