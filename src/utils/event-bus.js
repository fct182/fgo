import Vue from "vue"

const Eventbus = new Vue();
Object.defineProperties(Vue.prototype, {
    $bus: {
        get() {
            return Eventbus;
        }
    }
})