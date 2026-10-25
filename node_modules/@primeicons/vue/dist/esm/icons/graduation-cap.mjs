import { defineComponent as a, openBlock as e, createBlock as t, unref as n, normalizeProps as p, guardReactiveProps as c } from "vue";
import { graduationCap as i } from "@primeicons/core/graduation-cap";
import { createIcon as m } from "@primeicons/vue/core";
const d = /* @__PURE__ */ a({
  name: "GraduationCap",
  inheritAttrs: !1,
  __name: "graduation-cap",
  setup(s) {
    const { Icon: r } = m(i);
    return (o, u) => (e(), t(n(r), p(c(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
