# reactDay-2-1--context
react 使用context


# 组件跨层级通讯-Context
## Context API
- React.createContext   **创建一个Context对象**
- Context.Provider **Provider 接受一个Value属性，传递给消费组件，当Provider 的Value值发生辩护时，它内部的所有消费组件都会重新渲染，Provider及其内部的consumer 组件都不受制于`shouldComponentUpdate`函数，因此当consumer组件载器祖先组件退出更新的情况下也能更新** 
- Class.contextType **挂在clss 上的contextType属性会被重新复制为有`React.createContext`创建的Context对象，这可以让你使用 `this.context`来消费最近Context上的那个值。可以在任何生命周期函数中访问，包括render函数中**
- Context.Consumer **返回一个React节点，传递给函数的`value`值等同于往上组件树里这个context最近的Provider提供的Value值**

## 第一步，创建一个`ThemeContext.ts`管理上下文,用于生产数据和消费数据
```
// ThemeContext.ts

import React from 'react'

//  创建context 
export const ThemeContext = React.createContext({ themeColor: "pink" });
// 接收者
export const ThemeProvider = ThemeContext.Provider;
// 消费者
export const ThemeConsumer = ThemeContext.Consumer;
```

## 第二步，消费数据
+ ### 方式一:使用 **Class.contextType** 方式消费
  + 重点是 `static contextType = ThemeContext;` 加上它就可以在任何生命周期中访问到`this.context`
```
// ContextTypePage.tsx

import React, { Component } from 'react'
import { ThemeContext } from '../ThemeContext'

export default class ContextTypePage extends Component {
    static contextType = ThemeContext;

    render() {

        const { themeColor } = this.context;

        return (
            <div className="border">
                <h3 className={themeColor}>
                    ContextTypePage
                </h3>
            </div>
        )
    }
}


```
+ ### 方式二:使用 **Context.Consumer** 方式消费
```
// ConsumerPage.tsx

import React, { Component } from 'react'
import { ThemeConsumer } from '../ThemeContext'

export default function ConsumerPage() {
    return (
        <div className="border">
            <h3>ConsumerPage</h3>
            <ThemeConsumer>
                {ctx => <div className={ctx.themeColor}>文本</div>}
            </ThemeConsumer>
        </div>
    );
}
```

## 第三步生产数据
```
// ContextPage.tsx

import React, { Component } from 'react'
import { ThemeProvider } from '../ThemeContext'
import ConsumerPage from '../pages/ConsumerPage'
import ContextTypePage from '../pages/ContextTypePage'

// 使用contetx步骤
// 1. 创建 createContext
// 2. Proiver接收value，以保证有传下去的数据
// 3. 接收 Consumer或者class.contextType

export default class ContextPage extends Component {

    state: {
        theme: {
            themeColor: string
        }
    }

    constructor(props: any) {
        super(props);

        this.state = {
            theme: {
                themeColor: "red"
            }
        }
    }

    changeColor = () => {
        const { themeColor } = this.state.theme;

        this.setState({
            theme: {
                themeColor: themeColor === "red" ? "green" : "red"
            }
        })
    }


    render() {

        const { theme} = this.state;
        return (
            <div className="App">
                <button onClick={this.changeColor}>changeColor</button>
                <button onClick={this.changeName}>changeName</button>
            </div>
        )
    }
}

```
****
# 消费多个Context
## 第一步在上述案例中补充一个 context `UserContext.ts`
```
// UserContext.ts

import React from 'react'

export const UserContext = React.createContext({name:"hotpinkBorder"});

export const UserProvider = UserContext.Provider;

export const UserConsumer = UserContext.Consumer;
```

## 第二部增加一个消费多个context  的页面 `MultipleContextPage.tsx`
```
// MultipleContextPage.tsx

import React, { Component } from 'react'
import { ThemeConsumer } from '../ThemeContext'
import { UserConsumer } from '../UserContext'

export default class MultipleContextPage extends Component {
    render() {
        return (
            <div>
                <h3>MultipleContextPage</h3>
                <ThemeConsumer>
                    {themeCtx => (
                        <UserConsumer>
                            {
                                userCtx =>
                                    <div>
                                        <div>themeCtx:{themeCtx.themeColor}</div>
                                        <div>userCtx:{userCtx.name}</div>
                                    </div>
                            }
                        </UserConsumer>
                    )}
                </ThemeConsumer>
            </div>
        )
    }
}
```

## 生产多个context ，用于消费
```
// ContextPage.tsx

import React, { Component } from 'react'
import { ThemeProvider } from '../ThemeContext'
import { UserProvider } from '../UserContext'
import ConsumerPage from '../pages/ConsumerPage'
import ContextTypePage from '../pages/ContextTypePage'
import MultipleContextPage from './MultipleContextPage'

// 使用contetx步骤
// 1. 创建 createContext
// 2. Proiver接收value，以保证有传下去的数据
// 3. 接收 Consumer或者class.contextType

export default class ContextPage extends Component {

    state: {
        theme: {
            themeColor: string
        },
        user: {
            name: string
        }
    }

    constructor(props: any) {
        super(props);

        this.state = {
            theme: {
                themeColor: "red"
            },
            user: {
                name: "xiaoming"
            }
        }
    }

    changeColor = () => {
        const { themeColor } = this.state.theme;

        this.setState({
            theme: {
                themeColor: themeColor === "red" ? "green" : "red"
            }
        })
    }

    changeName = () => {
        const { name } = this.state.user

        this.setState({
            user: {
                name: name === "xiaoming" ? "小明" : "xiaoming"
            }
        })
    }

    render() {

        const { theme, user } = this.state;
        return (
            <div className="App">
                <button onClick={this.changeColor}>changeColor</button>
                <button onClick={this.changeName}>changeName</button>

                <ThemeProvider value={theme}>
                    <ContextTypePage />
                    <ConsumerPage />

                    <UserProvider value={user}>
                        <MultipleContextPage />
                    </UserProvider>
                </ThemeProvider>
            </div>
        )
    }
}

```
[源码](https://github.com/fssqLove/reactDay-2-1--context)
****
