import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as f } from "vue";
import { arrowDownLeft as m } from "@primeicons/core/arrow-down-left";
import { createIcon as p } from "@primeicons/vue/core";
const w = /* @__PURE__ */ e({
  name: "ArrowDownLeft",
  inheritAttrs: !1,
  __name: "arrow-down-left",
  setup(s) {
    const { Icon: r } = p(m);
    return (o, i) => (t(), n(a(r), c(f(o.$attrs)), null, 16));
  }
});
export {
  w as default
};
