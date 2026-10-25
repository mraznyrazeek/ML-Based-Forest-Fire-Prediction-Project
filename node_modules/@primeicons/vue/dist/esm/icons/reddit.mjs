import { defineComponent as t, openBlock as o, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { reddit as m } from "@primeicons/core/reddit";
import { createIcon as p } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ t({
  name: "Reddit",
  inheritAttrs: !1,
  __name: "reddit",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, d) => (o(), n(a(e), c(i(r.$attrs)), null, 16));
  }
});
export {
  _ as default
};
