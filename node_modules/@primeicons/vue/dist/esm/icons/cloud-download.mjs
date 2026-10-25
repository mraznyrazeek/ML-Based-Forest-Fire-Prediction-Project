import { defineComponent as r, openBlock as n, createBlock as t, unref as a, normalizeProps as c, guardReactiveProps as l } from "vue";
import { cloudDownload as m } from "@primeicons/core/cloud-download";
import { createIcon as p } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ r({
  name: "CloudDownload",
  inheritAttrs: !1,
  __name: "cloud-download",
  setup(s) {
    const { Icon: o } = p(m);
    return (e, d) => (n(), t(a(o), c(l(e.$attrs)), null, 16));
  }
});
export {
  _ as default
};
