/**
 * Created by chacha on 16/4/24.
 */
'use strict';

export default class TodoItem extends React.Component{

    // 处理任务是否完成状态
    handleChange() {
        let isDone = !this.props.isDone;
        this.props.changeTodoState(this.props.index, isDone);
    }

    // 鼠标移入
    handleMouseOver() {
        React.findDOMNode(this.refs.deleteBtn).style.display = "inline";
    }

    // 鼠标移出
    handleMouseOut() {
        React.findDOMNode(this.refs.deleteBtn).style.display = "none";
    }

    // 删除当前任务
    handleDelete() {
        this.props.deleteTodo(this.props.index);
    }

    render() {

        let doneStyle = this.props.isDone ? {textDecoration: 'line-through'} : {textDecoration: 'none'};
        
        return (
            <li onMouseOver={this.handleMouseOver.bind(this)} 
                onMouseOut={this.handleMouseOut.bind(this)}>
                <input type="checkbox" onChange={this.handleChange.bind(this)}/>
                <span style={doneStyle}>{this.props.text}</span>
                <button style={{'display': 'none'}} ref="deleteBtn" className="fr" onClick={this.handleDelete.bind(this)}>删除</button>
            </li>
        )
    }
}false