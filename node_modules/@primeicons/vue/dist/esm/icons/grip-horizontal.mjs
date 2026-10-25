import { defineComponent as e, openBlock as t, createBlock as n, unref as a, normalizeProps as i, guardReactiveProps as p } from "vue";
import { gripHorizontal as c } from "@primeicons/core/grip-horizontal";
import { createIcon as m } from "@primeicons/vue/core";
const z = /* @__PURE__ */ e({
  name: "GripHorizontal",
  inheritAttrs: !1,
  __name: "grip-horizontal",
  setup(s) {
    const { Icon: r } = m(c);
    return (o, l) => (t(), n(a(r), i(p(o.$attrs)), null, 16));
  }
});
export {
  z as default
};
