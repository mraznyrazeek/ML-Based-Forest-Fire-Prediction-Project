import { defineComponent as o, openBlock as t, createBlock as n, unref as a, normalizeProps as c, guardReactiveProps as i } from "vue";
import { idCard as m } from "@primeicons/core/id-card";
import { createIcon as p } from "@primeicons/vue/core";
const _ = /* @__PURE__ */ o({
  name: "IdCard",
  inheritAttrs: !1,
  __name: "id-card",
  setup(s) {
    const { Icon: r } = p(m);
    return (e, d) => (t(), n(a(r), c(i(e.$attrs)), null, 16));
  }
});
export {
  _ as default
};
