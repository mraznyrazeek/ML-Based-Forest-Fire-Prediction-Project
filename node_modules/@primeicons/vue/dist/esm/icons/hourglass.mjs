import { defineComponent as e, openBlock as t, createBlock as n, unref as s, normalizeProps as a, guardReactiveProps as c } from "vue";
import { hourglass as m } from "@primeicons/core/hourglass";
import { createIcon as p } from "@primeicons/vue/core";
const g = /* @__PURE__ */ e({
  name: "Hourglass",
  inheritAttrs: !1,
  __name: "hourglass",
  setup(l) {
    const { Icon: r } = p(m);
    return (o, u) => (t(), n(s(r), a(c(o.$attrs)), null, 16));
  }
});
export {
  g as default
};
