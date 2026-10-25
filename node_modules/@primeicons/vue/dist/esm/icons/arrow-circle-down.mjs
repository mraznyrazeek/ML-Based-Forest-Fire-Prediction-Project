import { defineComponent as e, openBlock as n, createBlock as t, unref as c, normalizeProps as a, guardReactiveProps as i } from "vue";
import { arrowCircleDown as m } from "@primeicons/core/arrow-circle-down";
import { createIcon as p } from "@primeicons/vue/core";
const w = /* @__PURE__ */ e({
  name: "ArrowCircleDown",
  inheritAttrs: !1,
  __name: "arrow-circle-down",
  setup(s) {
    const { Icon: r } = p(m);
    return (o, l) => (n(), t(c(r), a(i(o.$attrs)), null, 16));
  }
});
export {
  w as default
};
