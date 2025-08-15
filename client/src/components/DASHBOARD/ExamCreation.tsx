import { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  TimePicker,
  InputNumber,
  Space,
  Divider,
  message,
  Typography,
  Card,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from 'axios';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Sidebar2 from './Sidebar2';
import url from '../../url';
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const ExamCreation = () => {
  const [loginUser, setLoginuser] = useState<{ id?: string; name?: string; tname?: string; aname?: string }>({});
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const user = localStorage.getItem('edudocs')
      ? JSON.parse(localStorage.getItem('edudocs') as string)
      : null;
    if (user) setLoginuser(user);
  }, []);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: "mcq",
        questionText: "",
        options: [""],
        correctAnswer: "",
        marks: 1,
      },
    ]);
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const updateMCQOption = (qIndex: number, optIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addMCQOption = (qIndex: number) => {
    const updated = [...questions];
    if (updated[qIndex].options.length < 5) {
      updated[qIndex].options.push("");
      setQuestions(updated);
    } else {
      message.warning("Maximum 5 options allowed.");
    }
  };

  const removeMCQOption = (qIndex: number, optIndex: number) => {
    const updated = [...questions];
    if (updated[qIndex].options.length > 1) {
      updated[qIndex].options.splice(optIndex, 1);
      setQuestions(updated);
    } else {
      message.warning("At least 1 option is required.");
    }
  };

  const handleSubmit = async (values: any) => {
    const scheduledAt = values.scheduledDate && values.scheduledTime
      ? moment(values.scheduledDate)
          .set({
            hour: values.scheduledTime.hour(),
            minute: values.scheduledTime.minute(),
          })
          .toISOString()
      : null;

    const payload = {
      title: values.title,
      subject: values.subject,
      instructions: values.instructions,
      totalMarks: questions.reduce((sum, q) => sum + Number(q.marks || 0), 0),
      durationMinutes: values.duration,
      scheduledAt,
      createdBy: loginUser?.id || "64cce3fc7b6b990cf029394b",
      questions,
    };

    try {
      await axios.post(`${url}/exam/create`, payload);
      message.success("✅ Exam Created Successfully!");
      form.resetFields();
      setQuestions([]);
    } catch (err) {
      message.error("❌ Error creating exam.");
    }
  };

  return (
    <div className="wrapper">
      <Topbar />
      {"aname" in loginUser ? <Sidebar /> : <Sidebar2 />}

      <div className="content-page">
        <div className="container py-5">
          <div style={{ maxWidth: "900px", margin: "auto" }}>
            <Card
              bordered
              style={{ padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}
            >
              <Title level={3} style={{ textAlign: "center", marginBottom: 20 }}>
                Create Exam
              </Title>

              <Form layout="vertical" form={form} onFinish={handleSubmit}>
                <Form.Item name="createdBy" initialValue={loginUser?.id} hidden>
                  <Input type="hidden" />
                </Form.Item>

                <Form.Item label="Exam Title" name="title" rules={[{ required: true }]}>
                  <Input size="large" placeholder="Enter exam title" />
                </Form.Item>

                <Form.Item label="Subject" name="subject" rules={[{ required: true }]}>
                  <Input size="large" placeholder="Enter subject name" />
                </Form.Item>

                <Form.Item label="Instructions" name="instructions">
                  <TextArea rows={3} placeholder="Any specific instructions..." />
                </Form.Item>

                <Space size="large" wrap>
                  <Form.Item label="Duration (minutes)" name="duration" rules={[{ required: true }]}>
                    <InputNumber min={1} size="large" />
                  </Form.Item>

                  <Form.Item label="Scheduled Date" name="scheduledDate">
                    <DatePicker size="large" />
                  </Form.Item>

                  <Form.Item label="Scheduled Time" name="scheduledTime">
                    <TimePicker format="HH:mm" size="large" />
                  </Form.Item>
                </Space>

                <Divider>Questions</Divider>

                {questions.map((q, index) => (
                  <Card
                    key={index}
                    style={{ marginBottom: 24, border: "1px solid #f0f0f0", borderRadius: 10 }}
                    title={`Question ${index + 1}`}
                  >
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Select
                        value={q.type}
                        style={{ width: 200 }}
                        onChange={(val) => updateQuestion(index, "type", val)}
                      >
                        <Option value="mcq">MCQ</Option>
                        <Option value="short">Short Answer</Option>
                        <Option value="paragraph">Paragraph</Option>
                      </Select>

                      <Input.TextArea
                        rows={2}
                        placeholder="Enter question text"
                        value={q.questionText}
                        onChange={(e) => updateQuestion(index, "questionText", e.target.value)}
                      />

                      {q.type === "mcq" && (
                        <>
                          {q.options.map((opt: string, i: number) => (
                            <Space key={i} style={{ display: 'flex', marginBottom: 8 }}>
                              <Input
                                value={opt}
                                placeholder={`Option ${i + 1}`}
                                onChange={(e) => updateMCQOption(index, i, e.target.value)}
                              />
                              <Button
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => removeMCQOption(index, i)}
                              />
                            </Space>
                          ))}
                          <Button
                            icon={<PlusOutlined />}
                            onClick={() => addMCQOption(index)}
                            size="small"
                            style={{ marginBottom: 8 }}
                          >
                            Add Option
                          </Button>

                          <Input
                            placeholder="Correct answer"
                            value={q.correctAnswer}
                            onChange={(e) => updateQuestion(index, "correctAnswer", e.target.value)}
                          />
                        </>
                      )}

                      <InputNumber
                        min={1}
                        value={q.marks}
                        onChange={(val) => updateQuestion(index, "marks", val)}
                        placeholder="Marks for this question"
                      />
                    </Space>
                  </Card>
                ))}

                <Form.Item>
                  <Button type="dashed" block onClick={addQuestion} icon={<PlusOutlined />}>
                    Add Question
                  </Button>
                </Form.Item>

                <Divider />

                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large" block>
                    Submit Exam
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCreation;
