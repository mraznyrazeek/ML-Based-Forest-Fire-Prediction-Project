import { defineComponent as t, openBlock as o, createBlock as n, unref as s, normalizeProps as a, guardReactiveProps as c } from "vue";
import { list as i } from "@primeicons/core/list";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "List",
  inheritAttrs: !1,
  __name: "list",
  setup(p) {
    const { Icon: e } = m(i);
    return (r, l) => (o(), n(s(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
