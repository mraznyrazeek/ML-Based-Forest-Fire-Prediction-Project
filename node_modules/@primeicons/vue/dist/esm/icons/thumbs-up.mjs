import { defineComponent as t, openBlock as o, createBlock as n, unref as m, normalizeProps as p, guardReactiveProps as s } from "vue";
import { thumbsUp as a } from "@primeicons/core/thumbs-up";
import { createIcon as c } from "@primeicons/vue/core";
const h = /* @__PURE__ */ t({
  name: "ThumbsUp",
  inheritAttrs: !1,
  __name: "thumbs-up",
  setup(u) {
    const { Icon: e } = c(a);
    return (r, i) => (o(), n(m(e), p(s(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
