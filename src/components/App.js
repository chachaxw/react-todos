/**
 * Created by chacha on 16/4/24.
 */
'use strict';
import React from "react";
import LocalDb from "localDb";

import TodoHeader from "./TodoHeader.js";
import TodoMain from "./TodoMain.js";
import TodoFooter from "./TodoFooter.js";

class App extends React.Component {
    constructor(){
        super();
        this.db = new LocalDb('React-Todos');
        this.state = {
            todos: this.db.get("todos") || [],
            isAllChecked: false
        };
    }

    // 判断是否所有任务的状态都完成，同步底部的全选框
    allChecked() {
        let isAllChecked = false;
        if (this.state.todos.every((todo) => todo.isDone)){
            isAllChecked = true;
        }
        this.setState({ todos: this.state.todos, isAllChecked });
    }

    // 添加任务，是传递给Header组件的方法
    addTodo(todoItem) {
        this.state.todos.push(todoItem);
        this.allChecked();
        this.db.set('todos', this.state.todos);
    }

    // 改变任务状态，传递给TodoItem和Footer组件的方法
    changeTodoState(index, isDone, isChangeAll=false) {
        if (isChangeAll) {
            this.setState({
                todos: this.state.todos.map((todo) => {
                    todo.isDone = isDone;
                    return todo;
                }),
                isAllChecked: isDone
            }) 
        } else {
            this.state.todos[index].isDone = isDone;
            this.allChecked();
        }
        this.db.set('todos', this.state.todos);
    }

    // 清除已完成的任务，传递给Footer组件的方法
    clearDone() {
        let todos = this.state.todos.filter((todo) => !todo.isDone);
        this.setState({ 
            todos: todos,
            isAllChecked: true
        });
        this.db.set('todos', todos);
    }

    // 删除当前的任务，传递给TodoItem的方法
    deleteTodo(index) {
        this.state.todos.splice(index, 1);
        this.setState({ todos: this.state.todos });
        this.db.set('todos', this.state.todos);
    }

    render() {
        const props = {
            todoCount: this.state.todos.length || 0,
            todoDoneCount: (this.state.todos && this.state.todos.filter((todo) => todo.isDone)).length || 0 
        };
        
        console.log(props);
        
        return (
            <div className="panel">
                <TodoHeader addTodo={this.addTodo.bind(this)}/>
                <TodoMain todos={this.state.todos} changeTodoState={this.changeTodoState.bind(this)} deleteTodo={this.deleteTodo.bind(this)}/>
                <TodoFooter clearDone={this.clearDone.bind(this)} {...this.props} isAllChecked={this.state.isAllChecked} changeTodoState={this.changeTodoState.bind(this)} clearDone={this.clearDone.bind(this)}/>
            </div>
        )
    }
}
React.render(<App/>, document.getElementById("app"));
