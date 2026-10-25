import { defineComponent as t, openBlock as o, createBlock as n, unref as s, normalizeProps as c, guardReactiveProps as p } from "vue";
import { subscript as a } from "@primeicons/core/subscript";
import { createIcon as i } from "@primeicons/vue/core";
const b = /* @__PURE__ */ t({
  name: "Subscript",
  inheritAttrs: !1,
  __name: "subscript",
  setup(m) {
    const { Icon: r } = i(a);
    return (e, u) => (o(), n(s(r), c(p(e.$attrs)), null, 16));
  }
});
export {
  b as default
};
