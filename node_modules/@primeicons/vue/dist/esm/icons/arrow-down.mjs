import { defineComponent as e, openBlock as n, createBlock as t, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { arrowDown as p } from "@primeicons/core/arrow-down";
import { createIcon as s } from "@primeicons/vue/core";
const w = /* @__PURE__ */ e({
  name: "ArrowDown",
  inheritAttrs: !1,
  __name: "arrow-down",
  setup(i) {
    const { Icon: r } = s(p);
    return (o, f) => (n(), t(a(r), c(m(o.$attrs)), null, 16));
  }
});
export {
  w as default
};
