import { defineComponent as r, openBlock as t, createBlock as n, unref as m, normalizeProps as s, guardReactiveProps as a } from "vue";
import { thumbsDownFill as l } from "@primeicons/core/thumbs-down-fill";
import { createIcon as c } from "@primeicons/vue/core";
const h = /* @__PURE__ */ r({
  name: "ThumbsDownFill",
  inheritAttrs: !1,
  __name: "thumbs-down-fill",
  setup(i) {
    const { Icon: o } = c(l);
    return (e, p) => (t(), n(m(o), s(a(e.$attrs)), null, 16));
  }
});
export {
  h as default
};
