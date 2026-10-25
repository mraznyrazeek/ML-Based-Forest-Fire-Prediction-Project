import { defineComponent as r, openBlock as n, createBlock as t, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { download as p } from "@primeicons/core/download";
import { createIcon as s } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ r({
  name: "Download",
  inheritAttrs: !1,
  __name: "download",
  setup(l) {
    const { Icon: o } = s(p);
    return (e, i) => (n(), t(a(o), c(m(e.$attrs)), null, 16));
  }
});
export {
  _ as default
};
