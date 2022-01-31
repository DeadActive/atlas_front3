import _ from 'lodash'

export const DEFAULT = {
    error: {
        isDev: true,
        color: '#ff2600',
        prefix: 'ERROR',
        type: 'error'
    },
    warn: {
        isDev: true,
        color: '#dbb807',
        prefix: 'WARNING',
        type: 'warn'
    },
    debug: {
        isDev: true,
        color: '#0e0e96',
        prefix: 'DEBUG',
        type: 'log'
    },
    fatal: {
        isDev: false,
        color: '#ff2600',
        prefix: 'FATAL',
        type: 'error'
    }
}

const Logger = {
    install(Vue, args = {}) {
        if (this.installed) {
            return
        }

        this.installed = true
        this.params = args


        this.levels = this.params.levels || DEFAULT
        this.name = this.params.name || 'log'
        this.textColor = this.params.textColor || '#eeeeee'
        this.weight = this.params.weight || 900

        const log = (params, message, ...args) => {
            if (params.isDev && !process.env.NODE_ENV === 'development') {
                return
            }

            const style = `background: ${params.color}; color: ${this.textColor}; font-weight: ${this.weight};`

            console[params.type].call(this, `%c[${params.prefix}]`, style, message, ...args)
        }

        const logger = (levelName, message, ...args) => {
            var key, params

            [key, params] = Object.entries(this.levels).find(([key, params]) => key === levelName)

            log(params, message, ...args)
        }

        Vue.prototype[`$${this.name}`] = logger
        Vue[this.name] = logger

        Object.entries(this.levels).forEach(([key, params]) => {

            const logger = (message, ...args) => {
                log(params, message, ...args)
            }

            Vue.prototype[`$${this.name}`][key] = logger
        })
    }
}

export default Logger