import React, { Component } from "react";
import { Row, Col, Card } from "antd";
// importing todo components
import AddTaskForm from "../../components/Task/TodoForm";
import TodoList from "../../components/Task/TodoList";

class TODO extends Component {
  render() {
    return (
      <Row type="flex" justify="center" align="middle">
        <Col
          xs={{ span: 23 }}
          sm={{ span: 23 }}
          md={{ span: 21 }}
          lg={{ span: 20 }}
          xl={{ span: 18 }}
        >
          <AddTaskForm />
          <Card style={{ textAlign: "center" }} title="Todo List">
            <TodoList />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default TODO;
