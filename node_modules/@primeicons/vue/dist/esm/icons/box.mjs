import { defineComponent as r, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { box as p } from "@primeicons/core/box";
import { createIcon as s } from "@primeicons/vue/core";
const x = /* @__PURE__ */ r({
  name: "Box",
  inheritAttrs: !1,
  __name: "box",
  setup(i) {
    const { Icon: o } = s(p);
    return (e, f) => (t(), n(a(o), c(m(e.$attrs)), null, 16));
  }
});
export {
  x as default
};
