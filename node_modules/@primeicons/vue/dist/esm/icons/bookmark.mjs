import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as m, guardReactiveProps as c } from "vue";
import { bookmark as p } from "@primeicons/core/bookmark";
import { createIcon as s } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ e({
  name: "Bookmark",
  inheritAttrs: !1,
  __name: "bookmark",
  setup(i) {
    const { Icon: o } = s(p);
    return (r, f) => (t(), n(a(o), m(c(r.$attrs)), null, 16));
  }
});
export {
  _ as default
};
