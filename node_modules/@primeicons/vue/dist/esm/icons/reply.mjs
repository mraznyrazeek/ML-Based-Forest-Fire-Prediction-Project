import { defineComponent as o, openBlock as t, createBlock as n, unref as p, normalizeProps as a, guardReactiveProps as c } from "vue";
import { reply as m } from "@primeicons/core/reply";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "Reply",
  inheritAttrs: !1,
  __name: "reply",
  setup(l) {
    const { Icon: e } = s(m);
    return (r, i) => (t(), n(p(e), a(c(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
