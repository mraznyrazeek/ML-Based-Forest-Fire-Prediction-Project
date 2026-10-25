import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { gripVertical as p } from "@primeicons/core/grip-vertical";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ t({
  name: "GripVertical",
  inheritAttrs: !1,
  __name: "grip-vertical",
  setup(s) {
    const { Icon: r } = m(p);
    return (e, l) => (o(), n(a(r), c(i(e.$attrs)), null, 16));
  }
});
export {
  d as default
};
