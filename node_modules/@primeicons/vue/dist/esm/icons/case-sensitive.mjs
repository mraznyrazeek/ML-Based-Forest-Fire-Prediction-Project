import { defineComponent as t, openBlock as n, createBlock as o, unref as s, normalizeProps as a, guardReactiveProps as i } from "vue";
import { caseSensitive as c } from "@primeicons/core/case-sensitive";
import { createIcon as m } from "@primeicons/vue/core";
const v = /* @__PURE__ */ t({
  name: "CaseSensitive",
  inheritAttrs: !1,
  __name: "case-sensitive",
  setup(p) {
    const { Icon: e } = m(c);
    return (r, f) => (n(), o(s(e), a(i(r.$attrs)), null, 16));
  }
});
export {
  v as default
};
