import { defineComponent as r, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { thumbtack as p } from "@primeicons/core/thumbtack";
import { createIcon as s } from "@primeicons/vue/core";
const h = /* @__PURE__ */ r({
  name: "Thumbtack",
  inheritAttrs: !1,
  __name: "thumbtack",
  setup(u) {
    const { Icon: t } = s(p);
    return (e, i) => (o(), n(a(t), c(m(e.$attrs)), null, 16));
  }
});
export {
  h as default
};
