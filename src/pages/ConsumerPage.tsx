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
