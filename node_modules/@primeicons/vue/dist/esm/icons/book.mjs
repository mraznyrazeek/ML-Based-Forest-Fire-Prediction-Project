import { defineComponent as r, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { book as p } from "@primeicons/core/book";
import { createIcon as s } from "@primeicons/vue/core";
const k = /* @__PURE__ */ r({
  name: "Book",
  inheritAttrs: !1,
  __name: "book",
  setup(i) {
    const { Icon: o } = s(p);
    return (e, f) => (t(), n(a(o), c(m(e.$attrs)), null, 16));
  }
});
export {
  k as default
};
