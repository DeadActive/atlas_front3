import { PluginFunction } from 'vue'

declare module 'vue/types/vue' {
    interface Vue {
        $log: (level: string, ...args: any) => void
    }
    interface VueConstructor {
        log: (level: string, ...args: any) => void
    }
}

declare class VueLogger {
    static install: PluginFunction<any>
}

export default VueLogger
export const DEFAULT: any
