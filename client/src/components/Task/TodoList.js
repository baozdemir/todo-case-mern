import React, { Component } from "react";
import { List } from "antd";
import TodoItem from "./TodoItem";
import { connect } from "react-redux";
import { fetchTasks, deleteTask, updateTask } from "../../redux/task/actions";
import { bindActionCreators } from "redux";;

class TodoList extends Component {
  componentDidMount() {
    this.props.fetchTasks();
  }

  handleDeleteTask = async id => {
    await this.props.deleteTask(id);
  };

  handleUpdateTask = async params => {
    await this.props.updateTask(params);
  };

  render() {
    const { todoList } = this.props;
    return (
      <List
        locale={{
          emptyText: "Don't you have anything to do ? :("
        }}
        dataSource={todoList}
        renderItem={task => (
          <TodoItem
            task={task}
            deleteTask={this.handleDeleteTask}
            updateTask={this.handleUpdateTask}
          />
        )}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    todoList: state.task
      ? Array.isArray(state.task.list) && state.task.list
      : []
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTasks,
      deleteTask,
      updateTask
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
