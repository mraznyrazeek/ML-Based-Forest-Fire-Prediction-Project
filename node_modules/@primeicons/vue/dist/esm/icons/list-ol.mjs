import { defineComponent as t, openBlock as o, createBlock as n, unref as s, normalizeProps as a, guardReactiveProps as c } from "vue";
import { listOl as i } from "@primeicons/core/list-ol";
import { createIcon as l } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "ListOl",
  inheritAttrs: !1,
  __name: "list-ol",
  setup(m) {
    const { Icon: e } = l(i);
    return (r, p) => (o(), n(s(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
