/**
 * Created by chacha on 16/4/24.
 */
'use strict';
import React from "react";
import TodoItem from "./TodoItem.js"


export default class TodoMain extends React.Component{
    // 遍历显示任务，转发props
    render(){
        return (
            <ul className="todo-list">
                {this.props.todos.map((todo, index) => {
                    return <TodoItem key={index} {...todo} index={index} {...this.props}/>
                })}
            </ul>
        )
    }
}