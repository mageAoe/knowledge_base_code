# 单元测试

```
npm i react-test-renderer // 官方自带的库

npm i enzyme // 社区
npm i @wojtekmaj/enzyme-adapter-react-17
```



## 挂载组件

```js
import Enzyme,{mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
//在使用Enzyme 前需要先适配React对应的版本
Enzyme.configure({ adapter: new Adapter() })
it('挂载拿到状态', () => {
const app = mount(<App />);
expect(app.state().name).toEqual('kerwin');
expect(app.state().age).toEqual(100);
})
/*
.text()：返回当前组件的文本内容
.html()：返回当前组件的HTML代码形式
.props()：返回根组件的所有属性
.prop(key)：返回根组件的指定属性
.state([key])：返回根组件的状态
.setState(nextState)：设置根组件的状态
.setProps(nextProps)：设置根组件的属性
*/

```

## 测试组件渲染出来的 HTML

```js
it('组件渲染出来的 HTML', () => {
const app = mount(<App />);
expect(app.find('#myid').text()).toEqual('kerwin');
})

```

## 模拟用户交互

