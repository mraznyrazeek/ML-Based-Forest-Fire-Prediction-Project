import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { car as p } from "@primeicons/core/car";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Car",
  inheritAttrs: !1,
  __name: "car",
  setup(i) {
    const { Icon: r } = s(p);
    return (e, f) => (t(), n(a(r), c(m(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
