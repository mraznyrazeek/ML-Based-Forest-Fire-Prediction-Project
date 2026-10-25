import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as s, guardReactiveProps as c } from "vue";
import { strikethrough as i } from "@primeicons/core/strikethrough";
import { createIcon as m } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ t({
  name: "Strikethrough",
  inheritAttrs: !1,
  __name: "strikethrough",
  setup(p) {
    const { Icon: r } = m(i);
    return (e, u) => (o(), n(a(r), s(c(e.$attrs)), null, 16));
  }
});
export {
  _ as default
};
