import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { sort as m } from "@primeicons/core/sort";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "Sort",
  inheritAttrs: !1,
  __name: "sort",
  setup(i) {
    const { Icon: r } = p(m);
    return (o, f) => (t(), n(a(r), s(c(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
