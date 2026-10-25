import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { euro as p } from "@primeicons/core/euro";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Euro",
  inheritAttrs: !1,
  __name: "euro",
  setup(u) {
    const { Icon: r } = s(p);
    return (e, i) => (t(), n(a(r), c(m(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
