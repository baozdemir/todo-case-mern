import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox, Tooltip, Tag, Icon, List, Button } from "antd";

import "./styles.css";

class TodoItem extends Component {
  render() {
    const { deleteTask, task, updateTask } = this.props;
    const { _id, isCompleted, description } = task;
    return (
      <List.Item
        actions={[
          <Tooltip title="Remove Todo">
            <Button type="danger" onClick={e => deleteTask(_id)}>
              <Icon type="delete" />
            </Button>
          </Tooltip>
        ]}
        className="list-item"
      >
        <div className="todo-item">
          <Tooltip
            title={isCompleted ? "Mark as uncompleted" : "Mark as completed"}
          >
            <Checkbox
              checked={isCompleted}
              onChange={() =>
                updateTask({
                  _id,
                  description,
                  isCompleted: !isCompleted
                })
              }
            />
          </Tooltip>
          <Tag color={isCompleted ? "green" : "volcano"} className="todo-tag">
            {isCompleted ? <Icon type="check" /> : "-"}
          </Tag>

          <div className="todo-name">
            {isCompleted ? <del>{description}</del> : description}
          </div>
        </div>
      </List.Item>
    );
  }
}

TodoItem.propTypes = {
  task: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired
};

export default TodoItem;
