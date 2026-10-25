import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { arrowsAlt as m } from "@primeicons/core/arrows-alt";
import { createIcon as p } from "@primeicons/vue/core";
const A = /* @__PURE__ */ e({
  name: "ArrowsAlt",
  inheritAttrs: !1,
  __name: "arrows-alt",
  setup(l) {
    const { Icon: r } = p(m);
    return (o, i) => (t(), n(a(r), s(c(o.$attrs)), null, 16));
  }
});
export {
  A as default
};
