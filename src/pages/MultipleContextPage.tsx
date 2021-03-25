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
