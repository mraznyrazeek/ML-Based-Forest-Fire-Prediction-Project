import { defineComponent as e, openBlock as r, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as p } from "vue";
import { stopwatch as s } from "@primeicons/core/stopwatch";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ e({
  name: "Stopwatch",
  inheritAttrs: !1,
  __name: "stopwatch",
  setup(i) {
    const { Icon: t } = m(s);
    return (o, f) => (r(), n(a(t), c(p(o.$attrs)), null, 16));
  }
});
export {
  h as default
};
