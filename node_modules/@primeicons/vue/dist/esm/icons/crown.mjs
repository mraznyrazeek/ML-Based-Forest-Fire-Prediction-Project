import { defineComponent as e, openBlock as n, createBlock as t, unref as c, normalizeProps as a, guardReactiveProps as m } from "vue";
import { crown as p } from "@primeicons/core/crown";
import { createIcon as s } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "Crown",
  inheritAttrs: !1,
  __name: "crown",
  setup(i) {
    const { Icon: r } = s(p);
    return (o, f) => (n(), t(c(r), a(m(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
