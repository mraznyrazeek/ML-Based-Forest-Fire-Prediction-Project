import { defineComponent as r, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as p } from "vue";
import { cloudUpload as l } from "@primeicons/core/cloud-upload";
import { createIcon as m } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ r({
  name: "CloudUpload",
  inheritAttrs: !1,
  __name: "cloud-upload",
  setup(s) {
    const { Icon: o } = m(l);
    return (e, u) => (t(), n(a(o), c(p(e.$attrs)), null, 16));
  }
});
export {
  _ as default
};
