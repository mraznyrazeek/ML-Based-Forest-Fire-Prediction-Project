import { defineComponent as r, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as f } from "vue";
import { deleteLeft as l } from "@primeicons/core/delete-left";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ r({
  name: "DeleteLeft",
  inheritAttrs: !1,
  __name: "delete-left",
  setup(p) {
    const { Icon: e } = m(l);
    return (t, s) => (o(), n(a(e), c(f(t.$attrs)), null, 16));
  }
});
export {
  d as default
};
