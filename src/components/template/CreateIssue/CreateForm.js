import React from 'react'
import { Col, Form, Input, Row, Select } from 'antd'
import { CheckCircleFilled, WarningFilled, PlusSquareFilled, CaretUpOutlined, UpOutlined, MinusOutlined, DownOutlined, CaretDownOutlined } from '@ant-design/icons';
import '../../../assets/scss/CreateIssue/CreateForm.scss'

const { Option } = Select;

const CreateForm = () => {
    return (
        <div className='create'>
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="Issue Type"
                            label="Issue Type"
                            rules={[{ required: true, message: "Please enter user type" }]}
                        >
                            <Input.Group>
                                <Select defaultValue="Option1">
                                    <Option value="Option1">
                                        <div className="text-success">
                                            <CheckCircleFilled className="icon fs-5" />
                                            <span className="title ms-2">Task</span>
                                        </div>
                                    </Option>
                                    <Option value="Option2">
                                        <div className="text-danger">
                                            <WarningFilled className="icon fs-5" />
                                            <span className="title ms-2">Bug</span>
                                        </div>
                                    </Option>
                                    <Option value="Option3">
                                        <div className="text-warning">
                                            <PlusSquareFilled className="icon fs-5" />
                                            <span className="title ms-2">Story</span>
                                        </div>
                                    </Option>
                                </Select>
                            </Input.Group>
                            <span className="text">
                                Start typing to get a list of possible matches.
                            </span>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="priority"
                            label="Priority"
                            rules={[{ required: true, message: "Please enter priority" }]}
                        >
                            <Input.Group>
                                <Select defaultValue="Option1">
                                    <Option value="Option1">
                                        <div className="text-danger">
                                            <CaretUpOutlined className="icon fs-5" />
                                            <span className="title ms-2">Highest</span>
                                        </div>
                                    </Option>
                                    <Option value="Option2">
                                        <div className="text-warning">
                                            <UpOutlined className="icon fs-5" />
                                            <span className="title ms-2">High</span>
                                        </div>
                                    </Option>
                                    <Option value="Option3">
                                        <div className="text-secondary">
                                            <MinusOutlined className="icon fs-5" />
                                            <span className="title ms-2">Medium</span>
                                        </div>
                                    </Option>
                                    <Option value="Option4">
                                        <div className="text-success">
                                            <DownOutlined className="icon fs-5" />
                                            <span className="title ms-2">Low</span>
                                        </div>
                                    </Option>
                                    <Option value="Option5">
                                        <div className="text-primary">
                                            <CaretDownOutlined className="icon fs-5" />
                                            <span className="title ms-2">Lowest</span>
                                        </div>
                                    </Option>
                                </Select>
                            </Input.Group>
                            <span className="text">
                                Priority in relation to other issues.
                            </span>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="summary"
                            label="Short Summary"
                            rules={[
                                { required: true, message: "Please select an short summary" },
                            ]}
                        >
                            <Input />
                            <span className="text">
                                Concisely summarize the issue in one or two sentences.
                            </span>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                                {
                                    required: true,
                                    message: "please enter url description",
                                },
                            ]}
                        >
                            <Input.TextArea
                                rows={4}
                                placeholder="please enter url description"
                            />
                            <span className="text">
                                Describe the issue in as much detail as you'd like.
                            </span>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="reporter"
                            label="Reporter"
                            rules={[
                                { required: true, message: "Please choose the reporter" },
                            ]}
                        >
                            <Select defaultValue="Option1">
                                <Option value="Option1">Option 1</Option>
                                <Option value="Option2">Option 2</Option>
                                <Option value="Option3">Option 3</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="assignees"
                            label="Assignees"
                            rules={[
                                { required: true, message: "Please choose the assignees" },
                            ]}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: "100%" }}
                                placeholder="Please select"
                                defaultValue={["Option1"]}
                            >
                                <Option value="Option1">Option 1</Option>
                                <Option value="Option2">Option 2</Option>
                                <Option value="Option3">Option 3</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default CreateForm