import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { arrowsH as m } from "@primeicons/core/arrows-h";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "ArrowsH",
  inheritAttrs: !1,
  __name: "arrows-h",
  setup(i) {
    const { Icon: r } = p(m);
    return (o, f) => (t(), n(a(r), s(c(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
