import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as m } from "vue";
import { mars as c } from "@primeicons/core/mars";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Mars",
  inheritAttrs: !1,
  __name: "mars",
  setup(i) {
    const { Icon: r } = p(c);
    return (e, f) => (t(), n(a(r), s(m(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
