import { defineComponent as n, openBlock as o, createBlock as t, unref as a, normalizeProps as c, guardReactiveProps as m } from "vue";
import { calendarTimes as s } from "@primeicons/core/calendar-times";
import { createIcon as i } from "@primeicons/vue/core";
const d = /* @__PURE__ */ n({
  name: "CalendarTimes",
  inheritAttrs: !1,
  __name: "calendar-times",
  setup(p) {
    const { Icon: e } = i(s);
    return (r, l) => (o(), t(a(e), c(m(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
