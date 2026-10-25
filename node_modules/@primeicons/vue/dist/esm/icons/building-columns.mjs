import { defineComponent as e, openBlock as r, createBlock as t, unref as i, normalizeProps as m, guardReactiveProps as s } from "vue";
import { buildingColumns as a } from "@primeicons/core/building-columns";
import { createIcon as c } from "@primeicons/vue/core";
const d = /* @__PURE__ */ e({
  name: "BuildingColumns",
  inheritAttrs: !1,
  __name: "building-columns",
  setup(l) {
    const { Icon: n } = c(a);
    return (o, u) => (r(), t(i(n), m(s(o.$attrs)), null, 16));
  }
});
export {
  d as default
};
