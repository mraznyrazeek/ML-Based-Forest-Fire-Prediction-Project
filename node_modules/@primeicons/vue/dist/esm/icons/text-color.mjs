import { defineComponent as r, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { textColor as p } from "@primeicons/core/text-color";
import { createIcon as s } from "@primeicons/vue/core";
const x = /* @__PURE__ */ r({
  name: "TextColor",
  inheritAttrs: !1,
  __name: "text-color",
  setup(l) {
    const { Icon: o } = s(p);
    return (e, i) => (t(), n(a(o), c(m(e.$attrs)), null, 16));
  }
});
export {
  x as default
};
