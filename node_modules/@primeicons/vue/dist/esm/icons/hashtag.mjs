import { defineComponent as t, openBlock as o, createBlock as a, unref as n, normalizeProps as s, guardReactiveProps as c } from "vue";
import { hashtag as m } from "@primeicons/core/hashtag";
import { createIcon as p } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ t({
  name: "Hashtag",
  inheritAttrs: !1,
  __name: "hashtag",
  setup(i) {
    const { Icon: e } = p(m);
    return (r, f) => (o(), a(n(e), s(c(r.$attrs)), null, 16));
  }
});
export {
  _ as default
};
