import { defineComponent as t, openBlock as o, createBlock as n, unref as c, normalizeProps as s, guardReactiveProps as a } from "vue";
import { listCheck as i } from "@primeicons/core/list-check";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ t({
  name: "ListCheck",
  inheritAttrs: !1,
  __name: "list-check",
  setup(p) {
    const { Icon: e } = m(i);
    return (r, l) => (o(), n(c(e), s(a(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
