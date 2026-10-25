import { defineComponent as e, openBlock as t, createBlock as n, unref as s, normalizeProps as a, guardReactiveProps as c } from "vue";
import { history as i } from "@primeicons/core/history";
import { createIcon as m } from "@primeicons/vue/core";
const h = /* @__PURE__ */ e({
  name: "History",
  inheritAttrs: !1,
  __name: "history",
  setup(p) {
    const { Icon: r } = m(i);
    return (o, f) => (t(), n(s(r), a(c(o.$attrs)), null, 16));
  }
});
export {
  h as default
};
