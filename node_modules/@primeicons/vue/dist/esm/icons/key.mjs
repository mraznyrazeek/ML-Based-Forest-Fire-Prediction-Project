import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { key as p } from "@primeicons/core/key";
import { createIcon as s } from "@primeicons/vue/core";
const k = /* @__PURE__ */ o({
  name: "Key",
  inheritAttrs: !1,
  __name: "key",
  setup(i) {
    const { Icon: e } = s(p);
    return (r, f) => (t(), n(a(e), c(m(r.$attrs)), null, 16));
  }
});
export {
  k as default
};
