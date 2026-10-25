import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as m, guardReactiveProps as l } from "vue";
import { bookmarkFill as c } from "@primeicons/core/bookmark-fill";
import { createIcon as i } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ e({
  name: "BookmarkFill",
  inheritAttrs: !1,
  __name: "bookmark-fill",
  setup(p) {
    const { Icon: o } = i(c);
    return (r, s) => (t(), n(a(o), m(l(r.$attrs)), null, 16));
  }
});
export {
  _ as default
};
