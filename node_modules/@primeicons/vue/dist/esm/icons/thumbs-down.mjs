import { defineComponent as r, openBlock as t, createBlock as n, unref as m, normalizeProps as s, guardReactiveProps as a } from "vue";
import { thumbsDown as c } from "@primeicons/core/thumbs-down";
import { createIcon as p } from "@primeicons/vue/core";
const h = /* @__PURE__ */ r({
  name: "ThumbsDown",
  inheritAttrs: !1,
  __name: "thumbs-down",
  setup(u) {
    const { Icon: o } = p(c);
    return (e, i) => (t(), n(m(o), s(a(e.$attrs)), null, 16));
  }
});
export {
  h as default
};
