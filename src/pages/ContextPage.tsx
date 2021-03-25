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
