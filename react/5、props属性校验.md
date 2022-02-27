
```jsx
// index.js
import React from 'react';
import ReactDOM from 'react-dom'
import person from './person'

let props =  {
  name: '周三',
  age: 18,
  gender: '男'
}

ReactDOM.render(<person {...props}/>);
```

```jsx
// person.js 
import {Component} from 'react';
// 需要安装下面这个包
import PropTypes from 'prop-types'
export default class Person extends Component {
  static defaultProps {
    gender: '女'
  }
  static propTypes = {
    name: PropsTypes.string.isRequired,
    age: (props, propName, componentName) {
      if(props[propName] < 18) {
        return new Error('年龄小于18')
      }
    },
    gender: propTypes.string.oneOf(['男'，'女'])
  }
}
// 更多写法参考文档
```

prop-types 也适用 react的context属性的校验