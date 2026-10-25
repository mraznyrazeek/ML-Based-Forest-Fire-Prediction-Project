import { defineComponent as t, openBlock as n, createBlock as o, unref as s, normalizeProps as a, guardReactiveProps as p } from "vue";
import { pinterest as c } from "@primeicons/core/pinterest";
import { createIcon as i } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "Pinterest",
  inheritAttrs: !1,
  __name: "pinterest",
  setup(m) {
    const { Icon: e } = i(c);
    return (r, f) => (n(), o(s(e), a(p(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
