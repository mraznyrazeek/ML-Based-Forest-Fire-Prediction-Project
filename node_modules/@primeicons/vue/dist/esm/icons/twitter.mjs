import { defineComponent as r, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { twitter as m } from "@primeicons/core/twitter";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "Twitter",
  inheritAttrs: !1,
  __name: "twitter",
  setup(s) {
    const { Icon: t } = p(m);
    return (e, f) => (o(), n(a(t), c(i(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
