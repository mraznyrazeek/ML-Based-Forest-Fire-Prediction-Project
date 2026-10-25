import { defineComponent as n, openBlock as o, createBlock as a, unref as t, normalizeProps as c, guardReactiveProps as s } from "vue";
import { calendarPlus as l } from "@primeicons/core/calendar-plus";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ n({
  name: "CalendarPlus",
  inheritAttrs: !1,
  __name: "calendar-plus",
  setup(m) {
    const { Icon: e } = p(l);
    return (r, u) => (o(), a(t(e), c(s(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
