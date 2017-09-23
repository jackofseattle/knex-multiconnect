
import  assign  from 'lodash/assign'

function KnexManager(options = {}) {
    this._options = options
    this._connectionRegistry = {
        write: [],
        read: []
    }

    this._throw = function(msg) {
        throw new Error(msg)
    }
}

assign(KnexManager.prototype, {
    
    registerInstance(type, instance){
        if (this._connectionRegistry.hasOwnProperty(type)){
            this._connectionRegistry[type].push({ knex: instance })
        } else {
            this._throw(`Instance type ${type} is not a valid connection type.`)
        }
    },

    getInstance(type) {

        if (this._connectionRegistry.hasOwnProperty(type)){
            const numberOfConnections = this._connectionRegistry[type].length
            
            if (numberOfConnections == 0){
                this._throw(`No registered instances for ${type}s`)
            } else {
                const choice = Math.floor(Math.random() * numberOfConnections)
                return this._connectionRegistry[type][choice]
            }
        }

        this._throw(`Instance type ${type} is not a valid connection type.`)

    },

    destroyAllInstances(){

        Object.keys(this._connectionRegistry).map((type, i) => {
            this._connectionRegistry[type].map((instance, _i) => {
                instance.knex.destroy()
            })
        })
        
    },

    getReadInstance(){
        return this.getInstance('read')
    }, 

    getWriteInstance(){
        return this.getInstance('write')
    },

    read(){
        return this.getReadInstance()
    },

    write(){
        return this.getWriteInstance()
    }
})

export default KnexManager