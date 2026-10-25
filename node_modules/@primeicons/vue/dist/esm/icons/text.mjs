import { defineComponent as r, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { text as p } from "@primeicons/core/text";
import { createIcon as s } from "@primeicons/vue/core";
const x = /* @__PURE__ */ r({
  name: "Text",
  inheritAttrs: !1,
  __name: "text",
  setup(i) {
    const { Icon: e } = s(p);
    return (t, f) => (o(), n(a(e), c(m(t.$attrs)), null, 16));
  }
});
export {
  x as default
};
