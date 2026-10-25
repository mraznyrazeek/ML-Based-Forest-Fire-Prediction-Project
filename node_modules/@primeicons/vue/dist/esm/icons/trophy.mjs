import { defineComponent as e, openBlock as t, createBlock as n, unref as p, normalizeProps as a, guardReactiveProps as c } from "vue";
import { trophy as m } from "@primeicons/core/trophy";
import { createIcon as s } from "@primeicons/vue/core";
const h = /* @__PURE__ */ e({
  name: "Trophy",
  inheritAttrs: !1,
  __name: "trophy",
  setup(i) {
    const { Icon: r } = s(m);
    return (o, f) => (t(), n(p(r), a(c(o.$attrs)), null, 16));
  }
});
export {
  h as default
};
