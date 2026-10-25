import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as l, guardReactiveProps as c } from "vue";
import { dollar as m } from "@primeicons/core/dollar";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "Dollar",
  inheritAttrs: !1,
  __name: "dollar",
  setup(s) {
    const { Icon: r } = p(m);
    return (o, i) => (t(), n(a(r), l(c(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
