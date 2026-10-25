import { defineComponent as t, openBlock as o, createBlock as n, unref as p, normalizeProps as s, guardReactiveProps as c } from "vue";
import { superscript as a } from "@primeicons/core/superscript";
import { createIcon as i } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "Superscript",
  inheritAttrs: !1,
  __name: "superscript",
  setup(m) {
    const { Icon: r } = i(a);
    return (e, u) => (o(), n(p(r), s(c(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
