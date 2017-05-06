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
