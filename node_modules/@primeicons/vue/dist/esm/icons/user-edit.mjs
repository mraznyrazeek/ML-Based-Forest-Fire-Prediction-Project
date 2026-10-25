import { defineComponent as t, openBlock as o, createBlock as n, unref as s, normalizeProps as a, guardReactiveProps as c } from "vue";
import { userEdit as i } from "@primeicons/core/user-edit";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "UserEdit",
  inheritAttrs: !1,
  __name: "user-edit",
  setup(p) {
    const { Icon: e } = m(i);
    return (r, u) => (o(), n(s(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
