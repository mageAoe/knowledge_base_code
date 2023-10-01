# styled-components

它是通过JavaScript改变CSS编写方式的解决方案之一，从根本上解决常规CSS编写的一些弊端。 通过JavaScript来为CSS赋能，我们能达到常规CSS所不好处理的逻辑复杂、函数方法、复用、避免干扰。样式书写 将直接依附在JSX上面，HTML、CSS、JS三者再次内聚。all in js的思想



## 基本

```js
import React, { Component } from 'react'
import styled from 'styled-components'

export default class App extends Component {
  render () {
    
    const StyledFooter = styled.footer`
      background:yellow
      ul{
        display:flex
        li{
          flex:1
        }
      }
    `
    return (
      <StyledFooter>
        <ul>
          <li>首页</li>
          <li>列表</li>
          <li>我的</li>
        </ul>
      </StyledFooter>
    )
  }
}

```

## 透传prop

```js
const StyledInput = styled.input`
color: red;
background: yellow;
border: none;
border-radius: 3px;
`
<StyledInput type="text" placeholder="okok"/>
```



## 基于props做样式判断

```js
const StyledButton = styled.button`
background:${props=>props.bg || 'blue'}
`
/*<StyledButton>click</StyledButton>
<StyledButton bg="red">click</StyledButton>*/
```



## 样式化任意组件(一定要写className )

```js
const Child = (props)=><div className={props.className}>child</div>

const StyledChild = styled(Child)`
	background:red;
`
<StyledChild/>
```



## 扩展样式

```js
const MyButton = styled.button`
background:yellow;
`
const BigButton = styled(MyButton)`
height:100px;
width:100px;
```

### 加动画

```js
import styled,{keyframes} from 'styled-components'
const rotate360 = keyframes`
from {
transform: rotate(0deg);
}
to {
transform: rotate(360deg);
}
`;

const Rotate = styled.div`
width:100px;
height:100px;
background:yellow;
animation:${rotate360} 1s linear infinite;
```