import { defineComponent as e, openBlock as t, createBlock as n, unref as s, normalizeProps as a, guardReactiveProps as c } from "vue";
import { rows2 as m } from "@primeicons/core/rows-2";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "Rows2",
  inheritAttrs: !1,
  __name: "rows-2",
  setup(i) {
    const { Icon: r } = p(m);
    return (o, f) => (t(), n(s(r), a(c(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
