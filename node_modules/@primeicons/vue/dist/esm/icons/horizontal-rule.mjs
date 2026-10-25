import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as l, guardReactiveProps as c } from "vue";
import { horizontalRule as i } from "@primeicons/core/horizontal-rule";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ e({
  name: "HorizontalRule",
  inheritAttrs: !1,
  __name: "horizontal-rule",
  setup(p) {
    const { Icon: o } = m(i);
    return (r, s) => (t(), n(a(o), l(c(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
