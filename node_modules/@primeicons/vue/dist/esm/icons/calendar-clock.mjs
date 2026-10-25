import { defineComponent as o, openBlock as n, createBlock as a, unref as t, normalizeProps as c, guardReactiveProps as l } from "vue";
import { calendarClock as m } from "@primeicons/core/calendar-clock";
import { createIcon as p } from "@primeicons/vue/core";
const d = /* @__PURE__ */ o({
  name: "CalendarClock",
  inheritAttrs: !1,
  __name: "calendar-clock",
  setup(s) {
    const { Icon: e } = p(m);
    return (r, i) => (n(), a(t(e), c(l(r.$attrs)), null, 16));
  }
});
export {
  d as default
};
