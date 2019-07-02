import React, { Component } from "react";
import { Form, Icon, Row, Col, Button, Input } from "antd";
import { connect } from "react-redux";
import { addTask } from "../../redux/task/actions";
import { bindActionCreators } from "redux";

import "./styles.css";

class TodoForm extends Component {
  // form submit handler
  handleSubmit = async e => {
    e.preventDefault();
    this.props.form.validateFields((err, payload) => {
      if (!err) {
        // resetting form fields
        this.props.form.resetFields();
        this.props.addTask(payload);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form
        onSubmit={e => this.handleSubmit(e)}
        layout="horizontal"
        className="todo-form"
      >
        <Row gutter={20}>
          <Col xs={24} sm={24} md={17} lg={19} xl={20}>
            <Form.Item>
              {getFieldDecorator("description", {
                rules: [
                  {
                    required: true,
                    message: "Can not be empty worker :("
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="tags" className="icon" />}
                  placeholder="What needs to be done?"
                  spellCheck={false}
                />
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={7} lg={5} xl={4}>
            <Button
              type="primary"
              style={{ marginTop: 3 }}
              htmlType="submit"
              block
            >
              <Icon type="plus-circle" />
              Add
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addTask
    },
    dispatch
  );

const WrappedHorizontalLoginForm = Form.create({ name: "TodoForm" })(TodoForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedHorizontalLoginForm);
