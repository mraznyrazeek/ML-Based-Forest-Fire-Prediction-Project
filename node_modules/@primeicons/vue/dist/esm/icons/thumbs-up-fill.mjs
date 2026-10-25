import { defineComponent as t, openBlock as o, createBlock as n, unref as m, normalizeProps as p, guardReactiveProps as s } from "vue";
import { thumbsUpFill as a } from "@primeicons/core/thumbs-up-fill";
import { createIcon as l } from "@primeicons/vue/core";
const h = /* @__PURE__ */ t({
  name: "ThumbsUpFill",
  inheritAttrs: !1,
  __name: "thumbs-up-fill",
  setup(c) {
    const { Icon: e } = l(a);
    return (r, i) => (o(), n(m(e), p(s(r.$attrs)), null, 16));
  }
});
export {
  h as default
};
