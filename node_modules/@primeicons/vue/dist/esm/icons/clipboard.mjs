import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as p } from "vue";
import { clipboard as i } from "@primeicons/core/clipboard";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "Clipboard",
  inheritAttrs: !1,
  __name: "clipboard",
  setup(s) {
    const { Icon: r } = m(i);
    return (o, l) => (t(), n(a(r), c(p(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
