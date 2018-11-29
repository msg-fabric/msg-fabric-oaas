# msg-fabric-oaas

`msg-fabric-oaas` builds persistent object state as a plugin to `msg-fabric-core`.


Inspired by:

- Alan Kay's vision of messaging between objects in [Smalltalk](https://en.wikipedia.org/wiki/Smalltalk#Messages)
- [Erlang](http://erlang.org/doc/reference_manual/distributed.html)'s distributed messaging
- Uber's [Ringpop](https://github.com/uber-node/ringpop-node) and [TChannel](https://github.com/uber/tchannel-node)


## Examples

```javascript
import FabricHubBase from 'msg-fabric-core' 
import pi_rpc from 'msg-fabric-core/esm/plugin-rpc.js'
import pi_oaas from 'oaas/esm/index.js'

const FabricHub = FabricHubBase
  .plugin( pi_rpc(), pi_oaas() )

const hub = FabricHub.create()

hub.initOaaS({ loadConfig })

function loadConfig(key) {
  // load OaaS config from any datastore as an object
  return JSON.parse(window.localStore.getItem(key))
}
```


## License

[2-Clause BSD](https://github.com/shanewholloway/msg-fabric-core/blob/master/LICENSE)

