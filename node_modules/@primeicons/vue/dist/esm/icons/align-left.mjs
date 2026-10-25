import { defineComponent as t, openBlock as n, createBlock as o, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { alignLeft as f } from "@primeicons/core/align-left";
import { createIcon as l } from "@primeicons/vue/core";
const g = /* @__PURE__ */ t({
  name: "AlignLeft",
  inheritAttrs: !1,
  __name: "align-left",
  setup(m) {
    const { Icon: e } = l(f);
    return (r, p) => (n(), o(a(e), c(i(r.$attrs)), null, 16));
  }
});
export {
  g as default
};
