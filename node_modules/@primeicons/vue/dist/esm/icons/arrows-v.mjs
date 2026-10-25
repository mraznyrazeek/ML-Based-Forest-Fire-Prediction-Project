import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { arrowsV as m } from "@primeicons/core/arrows-v";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "ArrowsV",
  inheritAttrs: !1,
  __name: "arrows-v",
  setup(i) {
    const { Icon: r } = p(m);
    return (o, f) => (t(), n(a(r), s(c(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
