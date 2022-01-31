import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Logger from '@/plugins/logger'
import { DEFAULT as DEFAULT_LEVELS } from '@/plugins/logger/index'

Vue.config.productionTip = false

import * as Keycloak from 'keycloak-js'

Vue.use(
    Logger,
    Object.assign(DEFAULT_LEVELS, {
        socket: {
            isDev: true,
            color: '#007d32',
            prefix: 'SOCKET',
            type: 'log',
        },
    })
)

const initOptions = {
    //todo: use dynamic property for url path
    url: process.env.VUE_APP_KEYCLOACK_URL,
    realm: process.env.VUE_APP_KEYCLOACK_REALM,
    clientId: process.env.VUE_APP_KEYCLOACK_CLIENT,
    onLoad: 'login-required',
}

export const keycloak = Keycloak(initOptions)

keycloak
    .init({ onLoad: initOptions.onLoad })
    .then((auth) => {
        if (!auth) {
            Vue.log('debug', 'NOT Authenticated')
            window.location.reload()
        } else {
            Vue.log('debug', 'Authenticated')
            new Vue({
                router,
                store,
                vuetify,
                render: (h) => h(App),
            }).$mount('#app')
        }

        localStorage.setItem('vue-token', keycloak.token)
        localStorage.setItem('vue-refresh-token', keycloak.refreshToken)

        setInterval(() => {
            //todo: convert to typeScript
            // @ts-ignore
            keycloak
                .updateToken(100)
                .then((refreshed) => {
                    if (refreshed) {
                        // @ts-ignore
                        localStorage.setItem('vue-token', keycloak.token)
                        localStorage.setItem(
                            'vue-refresh-token',
                            keycloak.refreshToken
                        )
                    } else {
                        Vue.log(
                            'debug',
                            'Token not refreshed, valid for ' +
                                Math.round(
                                    keycloak.tokenParsed.exp +
                                        keycloak.timeSkew -
                                        new Date().getTime() / 1000
                                ) +
                                ' seconds'
                        )
                    }
                })
                .error(() => {
                    //todo: convert to typeScript
                    // @ts-ignore
                    Vue.log('error', 'Failed to refresh token')
                })
        }, 30000)
    })
    .error(() => {
        //todo: convert to typeScript
        // @ts-ignore
        Vue.$log.error('Authenticated Failed')
    })
