import { defineComponent as o, openBlock as t, createBlock as n, unref as s, normalizeProps as a, guardReactiveProps as c } from "vue";
import { refresh as f } from "@primeicons/core/refresh";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ o({
  name: "Refresh",
  inheritAttrs: !1,
  __name: "refresh",
  setup(p) {
    const { Icon: e } = m(f);
    return (r, i) => (t(), n(s(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
