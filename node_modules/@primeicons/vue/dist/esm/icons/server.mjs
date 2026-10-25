import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { server as m } from "@primeicons/core/server";
import { createIcon as p } from "@primeicons/vue/core";
const v = /* @__PURE__ */ o({
  name: "Server",
  inheritAttrs: !1,
  __name: "server",
  setup(i) {
    const { Icon: e } = p(m);
    return (r, f) => (t(), n(a(e), s(c(r.$attrs)), null, 16));
  }
});
export {
  v as default
};
