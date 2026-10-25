import { defineComponent as n, openBlock as t, createBlock as o, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { externalLink as l } from "@primeicons/core/external-link";
import { createIcon as m } from "@primeicons/vue/core";
const k = /* @__PURE__ */ n({
  name: "ExternalLink",
  inheritAttrs: !1,
  __name: "external-link",
  setup(p) {
    const { Icon: e } = m(l);
    return (r, s) => (t(), o(a(e), c(i(r.$attrs)), null, 16));
  }
});
export {
  k as default
};
