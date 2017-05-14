目录  
[react生命周期及接口](#生命周期及接口)  
[关于state与props](#关于state与props)  
[关于React与Vue](#关于React与Vue)  
[mobx及react-mobx](#mobx及react-mobx)  
[vuex](#vuex)
# 关于React
## 生命周期及接口
创建react有状态组件可以使用React.createClass & React.Component两种方式，当然官方推荐使用第二种
#### React.createClass
1. 生命周期比较完整，但是整体作为一个对象（所有属性使用，隔开），这也是为了在es5中使用class
2. 写法 export default React.createClass({})
3. 生命周期
   * getDefaultProps 检查默认属性，返回一个对象，如果这个对象某个属性是个复杂对象，那么意味这这个属性的变更是跨实例的，因为返回对象是应用生命周期一次性的
   * getInitialState 返回一个对象，作为state初始值
   * componentWillMount 这个钩子用于在实例被安装前调用，嗯你可以访问refs，因为先创建子组件再创建父组件
   * componentDidMount 相信你知道这个是干什么的
   * componentWillReceiveProps 参数为即将接收到的新属性，此时访问this.props还是未变更的，这里是操作state不错的钩子
   * shouldComponentUpdate 返回一个布尔，参数为新，旧属性
   * componentWillUpdate 参数为新的props及state，对了，在这里不能setState哦
   * componentDidUpdate 参数为旧的props及state
   * render 返回一个jsx对象用于渲染
   * componentWillUnmount 组件被卸载前触发
#### React.Component
1. 首先注意写法上类似es6的class： export default class xx extends React.Component {}
2. 生命周期基本和createClass一致，只是在初始化状态和属性上有所不同

```javascript
// createClass
React.createClass({
    propTypes: { // as an object
        name: React.PropTypes.string
    },
    getDefaultProps(){   // return a object
        return {
            name: ''    
        }
    },
    getInitialState(){
        return {
            isEditing: false
        }
    }
    ...
})
// component
class TodoItem extends React.Component {
    static propTypes = {//类的静态属性
        name: React.PropTypes.string
    };
    static defaultProps = {//类的静态属性
        name: ''
    };
    constructor(props){
        super(props);
        this.state = { // define this.state in constructor
            isEditing: false
        }
    }
    ...
}
```

## 关于state与props
在设计模式中状态模式只是去定义一个‘开关’去控制电灯的状态，而不是定义整个电路  
同样props只是为了控制子组件的一种方式。  
组件在发现state或props发生变化才会去重新计算dom变化

#### 对state的理解
使用状态去控制组件自己的行为的变化，更多的只是状态机而不是实际的data。  
那么我们是不是可以通过静态数据去替代state？  
答案是否，因为react并不是无时不刻去检查render的结果是否发生变化，而是检查自己的state与接收的props是否发生变化  
一旦setstate或者receiveprops就会去执行render，不论两次是否相同（state或props）都会触发render执行，只是render返回的结果再去对比vnode，并最小粒度的去操作dom
这也意为着我们去管理state只是去管理自己的状态机通过它再去维护自己的静态属性（或方法）  
或者说我们可以去判断静态数据是否发生变化再决定是否需要更新状态（即使两次的状态是一致的，都会触发render）

#### 对props的理解
props则是一种不错的保存数据的方式  
所以一定程度上父组件可以使用静态属性来定义子组件的props，当然这意味父组件一厢情愿的更改静态属性而未触发render也会使子组件也不会接收到新属性

## 关于React与Vue
初步看来Vue和React区别还是挺大的  
首先Vue主要依赖于数据追踪机制（getter，setter）去同步更新并异步执行Dep（watcher）队列（computed，watch），然后执行类似render函数，通过diff决定是否更新页面  
React更像是一种状态机，这种状态机制为了符合复杂的组件关系引入了props也作为一种触发一系列生命周期的状态机制  
然而最大的区别是，Vue每次会对比值是否发生变化，比如赋值后值不变并不会触发watcher队列更新更不会render一个待比较的vnode，而react则是自己
实现了一个状态机制，一旦setState或者父组件重新渲染传递了props（不论这种变化是否真的变了）都会触发一系列钩子，只是强大的diff会去决定是否重新渲染  
#### React与Vue区别
1. React生命周期更为科学有条理，这也是得益于自身实现的一套状态机制。而Vue则相对弱一点
2. Vue通过源数据（data，props）变化来实现自己的事件循环，避免了不必要的render，而React则是一旦接收到props和setState就会触发一系列事件
3. Vue通信依赖于类似emit，Bus等方式，React则不需要额外的操作，如将函数作为属性传递即可达到效果
3. 初学者更适合使用Vue，因为框架帮你做了很多优化，减少了很多不必要的操作，如异步执行Dep（watcher）队列，“脏值检测”等。而react一旦触发更新则会同步去触发相应事件（虽然change state是所谓异步）但感觉并没什么卵用。所以对于新手而言会run很多不必要的代码
4. 使用react一定要进行必要的shouldComponentUpdate检测

不论是通过代理属性还是实现一套状态机本质上都是形成事件循环（event loop）将model与view之间建立起一套相互pubsub的法则  
Vue和React都是很优秀的框架，尤其是在vue1.0时代，高性能的diff大大减少了不必要的dom操作（妈蛋，你每次都render能不用个diff来减少dom开销嘛）

## mobx及react-mobx
### 由于还没参透mobx，下面仅为一个可行的实践，并不一定是正确的使用方法
### 对mobx的理解
其实个人觉得mobx实现了类似vue的一套数据追踪机制，认为在set一个值，那么所有挂载这个数据的组件应该update  
而react对它的实践（mobx-react）则是使得组件可观察，在发布消息时会自动更新组件（我想应该是做了类似于this.setState(this.state)操作）。好，下面可以看看目前两种场景，及如何实现
### 1.组件内共享数据
1. 将组件变为可观察模式 @observer 依赖mobx-react
2. 将一些静态属性变为可观察属性 @observable 依赖mobx
3. 将静态数据绑定到页面中，可以在代码中更新该属性，页面就会自动渲染

### 2.不同组件间共享数据
1. 类似vuex，建立一个store并使得该store可观察 observable 依赖mobx，建议使用类似vuex机制将get与set分离
2. 在组件内引入可观察的数据或更改可观察数据的方法（看业务场景了），并使组件可观察 @observer 依赖mobx－react
3. 使用更新stroe的方法，所有依赖该数据的组件就会更新
4. 让人郁闷的是，即使将shouldCOmponentUpdate return false竟然没啥用了,当然如果该值不直接挂载在页面上都不会触发渲染


## vuex
### vuex是什么?
1. store save what state we want to manage 我们不应该直接去获取store中的状态，而应该代理其get与set行为这样才能做到一处change所有都能收到消息
2. getter getter就是代理获取
3. mutation mutation就是完成set，并由vuex完成state change的派发
4. actions 已经有了mutation，为什么还需要action呢？在于，我们不希望在vue中去完成异步操作后再执行mutaion，毕竟有写逻辑只是去为了维护state和组件关系并不大，因此可以将这一部分逻辑封装到actions中，由action完成异步的操作，再传递给mutation再由mutation去完成状态的派发

### vuex基本使用
vuex部分可以类似以下代码：
```JavaScript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```
在vue中可以引入mapGetter与mapActions（或mutation）转化为vue的computed与methods参与进来
```JavaScript
import { mapGetter, mapActions } from 'vuex'

export default {
  // ...
  computed: {
    ...mapGetter([
      'state1',
      'state2'
    ]),
    ...mapGetter({
      s3: 'state3',
      s4: 'state4'
    })
  },
  methods: {
    ...mapActions([
      'increment' // 映射 this.increment() 为 this.$store.dispatch('increment')
    ]),
    ...mapActions({
      add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    })
  }
}
```
### 如何划分？
通过上面我们知道了，我们可以把所有state交给store来管理了，将get操作交给了getter，将change交给mutations了，但是随着项目越来越大，不同的功能间一些state没有任何耦合，没有共享的必要了，所以vuex还提供了module来分离不同的state
```JavaScript
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
注： 唯一的不同是引入了一个rootState作为getter与actions，mutation的第三个参数

### 详解API
##### 1. all
```JavaScript
new Vuex.stroe({
  state: {}, // mapState
  getter: {}, // mapGetters
  mutations: {}, // mapMutations
  actions: {}, // mapActions
  modules: {}
})
```
在注入实例时添加store，这样每个组件都能获得到实例，否则只能拿到一个空的vuex
```JavaScript
new Vue({
  el: '#app',
  store: stroe,
  template: '<App/>',
  components: { App }
})
```
##### 2. state
state在内部以对象形式存在，用于保存标识的变量，因此主要是保存数据的，key value形式。  
虽然提供了mapState接口，但是并不推荐使用这个接口
```JavaScript
import {mapState} from 'vuex'
...
computed: {
  mapState({
    state1: state => state.state1,
    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```
在组件内作为computed使用，并以函数方式使用，参数为state
##### 3. getter
第一个参数为state，但是你知道第二个参数是getter吗？
这个getter相当于返回其get value  
比如：我们用state维护list，用getter维护chooseList（返回list的子数组），那么我们还想维护chooseList length怎么办？  
这个时候getter参数就有意义了  
注：在modules中第三个参数为rootState
```JavaScript
new vuex.Stroe({
  state: {
    list: [...]
  },
  getter: {
    chooseList: (state) => state.filter((item) => item.choose),
    chooseListLength: (state, getter) => getter.chooseList.length 
  }
})
```
暴露给vue接口mapGetters配合computed使用，[具体可以见](#vuex基本使用)
##### 4. mutations
第一个参数是state，第二个参数是newValue，在modules中第三个参数是rootState。暴露给vue的接口是mapMutations  
在vue中作为methods使用，只需要传入newValue参数即可
```JavaScript
mutations: {
  setV (state, v) { // 相当于执行了state.commit('setV' {v: v})
    state.v = v 
  }
}
```
注： mutations中相当于同步执行了set，因此最好不要在内部使用异步，如果非要使用异步，请使用actions  
当然我们也可以在一个mutations中操作多个state，不过这个时候建议用actions试试commit，因为这个还不清楚它是不是同步订阅异步发布
##### 5. actions
第一个参数是state（官方文档用的context），第二个参数还是newValue，在modules中第三个参数是rootState。暴露给vue的接口是mapActions  
其实个人觉得actions主要是为了聚合mutations操作或异步操作mutations的
```JavaScript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state, v) {
      state.count = v
    }
  },
  actions: {
    increment (context, v) { // 相当于执行了state.dispatch(mutationName, value)
      context.commit('increment', {count: v}) 
    },
    test ({commit}, v) {
      commit('increment', v)
    }
  }
})
```
是时候小结一下了，从上面我们基本可以看出一些端倪了，虽然vuex给暴露给vue有mapState，mapGetters，mapMutations，mapActions  
但是我们全部可以使用state来完成上面的操作对应的分别是state，state，state.commit,state.dispatch
##### 6. modules
使用与普通的一致，因此为了防止有同名的getters mutations actions，官方给的方案是加一个命名空间

## event bus
1. 在全局到处一个空的vue实例 export default new Vue()
2. 在需要发布事件或监听事件的组件内引入vue空实例 import bus from './bus.js'
3. 在合适的钩子里监听事件 如created bus.$on(eventName, handler)
4. 在合适的地方发送消息，如click bus.$emit(eventName, message)
# 项目配置说明文档

## 开发环境

- nodejs

- npm


## 使用

``` bash
$ npm install
$ npm run dev
```

如果本机8080端口被占用，在`/config/index.js`中修改端口号。 否则执行 `npm run dev` 会失败。

## 命令

- `npm run dev`
  启动本地server，server具有热启动功能，修改代码后，浏览会自动刷新。

- `npm run build`:
	生成带哈希值目标代码，默认放在dist目录，用于生产环境。

## 目录说明

### build
存放webpack配置脚本，无特别需求不用修改。

### config
存放项目构建配置，根据需要修改其中的配置。

#### build配置项如下：

| 配置项 	| 功能 	| 默认 	|
|---------------------	|----------------------------	|-----------------------------	|
| index 	| 配置生成的html文件位置 	| yourproject/dist/index.html 	|
| assetsRoot 	| 配置生成的文件存放的根目录 	| yourproject/dist 	|
| assetsSubDirectory 	| 配置目标代码的静态资源目录 	| yourproject/dist/static 	|
| assetsPublicPath 	| 配置目标代码的线上地址 	| / 	|
| productionSourceMap 	| 配置是否使用source map 	| false 	|

#### dev配置项如下

| 配置项 	| 功能 	| 默认 	|
|--------------------	|------------------------	|--------	|
| port 	| 配置本地开发端口号 	| 8080 	|
| assetsSubDirectory 	| 配置静态资源目录 	| static 	|
| assetsPublicPath 	| 配置线上地址 	| / 	|
| proxyTable 	| 配置代理 	| 空 	|
| cssSourceMap 	| 配置是否使用source map 	| true 	|
| autoOpenBrowser 	| 是否自动打开浏览器 	| false 	|
