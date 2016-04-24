/**
 * Created by YikaJ on 15/6/16.
 */
'use strict';
import React from "react";

class TodoHeader extends React.Component {

    // 绑定键盘回车事件，添加新任务
    handleKeyUp(event){
        if(event.keyCode === 13){
            let value = event.target.value;

            if(!value) return false;

            let newTodoItem = {
                text: value,
                isDone: false
            };
            event.target.value = "";
            this.props.addTodo(newTodoItem);
//            console.log(newTodoItem);
        }
    }

    render(){
        return (
            <div className="panel-header">
                <input onKeyUp={this.handleKeyUp.bind(this)} type="text" placeholder="what's your task ?"/>
            </div>
        )
    }
}

export default TodoHeader;

