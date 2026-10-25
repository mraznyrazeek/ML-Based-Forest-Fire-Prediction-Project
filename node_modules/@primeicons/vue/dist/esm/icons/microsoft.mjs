import { defineComponent as e, openBlock as t, createBlock as n, unref as c, normalizeProps as s, guardReactiveProps as a } from "vue";
import { microsoft as m } from "@primeicons/core/microsoft";
import { createIcon as i } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "Microsoft",
  inheritAttrs: !1,
  __name: "microsoft",
  setup(f) {
    const { Icon: o } = i(m);
    return (r, p) => (t(), n(c(o), s(a(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
