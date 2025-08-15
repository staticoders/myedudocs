import { useEffect, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Upload,
  Space,
  Divider,
  Typography,
  message
} from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;
import axios from 'axios';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Sidebar2 from './Sidebar2';
import url from '../../url';
const { Title } = Typography;

interface Teacher {
  _id: string;
  tname: string;
}


const AddCourse = () => {
  
  
  const [loginUser, setLoginuser] = useState<{ name?: string; tname?: string; aname?: string }>({});
  useEffect(() => {
    const user = localStorage.getItem('edudocs')
      ? JSON.parse(localStorage.getItem('edudocs') as string)
      : null;
    if (user) setLoginuser(user);
  }, []);

    const [form] = Form.useForm();
  const [teachersName, setTeachersName] = useState<Teacher[]>([]);
  const [chapters, setChapters] = useState<number>(0);

  // Fetch teacher names
  useEffect(() => {
    fetch(`${url}/allteachersName`)
      .then((res) => res.json())
      .then((data) => setTeachersName(data.teachers))
      .catch((err) => console.error(err));
  }, []);

  const handleChapterCountChange = (value: number) => {
    setChapters(value);
  };

const allowedTypes = [
  "application/pdf",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.ms-powerpoint", // .ppt
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
];
const beforeUpload = (file: File) => {
  const isAllowed = allowedTypes.includes(file.type);

  if (!isAllowed) {
    message.error(`${file.name} is not a valid file type.`);
  }

  // Do not auto upload
  return isAllowed ? false : Upload.LIST_IGNORE;
};


  const getFileValue = (e: any) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

const onFinish = async (values: any) => {
  try {
    const formData = new FormData();

    // Append base course fields
    formData.append("title", values.title);
    formData.append("short_desc", values.short_desc);
    formData.append("long_desc", values.long_desc);
    formData.append("price", values.price);
    formData.append("duration", values.duration);
    formData.append("teacher_id", values.teacher_id);
    formData.append("youtube_link", values.youtube_link);
    formData.append("language", values.language);
    formData.append("skill_level", values.skill_level);

    // Cover photo (only first file)
    if (values.coverphoto?.[0]?.originFileObj) {
      formData.append("coverphoto", values.coverphoto[0].originFileObj);
    }

    // Prepare chapters (text part only)
    const chaptersTextOnly = values.chapters.map((chapter: any) => ({
      chapter_name: chapter.chapter_name,
    }));
    formData.append("chapters", JSON.stringify(chaptersTextOnly));

    // Add chapter file uploads
    values.chapters.forEach((chapter: any, index: number) => {
      if (chapter.study_file?.[0]?.originFileObj) {
        formData.append(
          `chapters[${index}][study_file]`,
          chapter.study_file[0].originFileObj
        );
      }
    });

    // Send to backend
    const res = await fetch(`${url}/course/create-course`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      message.success("Course created successfully!");
      form.resetFields();
      setChapters(0); // reset chapter fields
    } else {
      console.error(data);
      message.error("Failed to create course.");
    }
  } catch (err) {
    console.error(err);
    message.error("Something went wrong.");
  }
};




  return (
    <div className="wrapper">
      <Topbar />
      {'aname' in loginUser ? <Sidebar /> : <Sidebar2 />}

      <div className="content-page">
        <div className="container py-5">
          <div style={{ maxWidth: "800px", margin: "auto" }}>
     <Title level={3}>Create New Course</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ price: 0, duration: 0 }}
      >
        <Form.Item label="Course Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Short Description" name="short_desc" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Long Description" name="long_desc" rules={[{ required: true }]}>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Price (₹)" name="price" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Duration (hours)" name="duration" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Teacher" name="teacher_id" rules={[{ required: true }]}>
          <Select placeholder="Select teacher">
            {teachersName.map((teacher) => (
              <Select.Option key={teacher._id} value={teacher.tname}>
                {teacher.tname}
              </Select.Option>
                
            ))}
              <Select.Option key={loginUser.id} value={loginUser.aname}>
                {loginUser.aname}
              </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Cover Photo"
          name="coverphoto"
          valuePropName="fileList"
          getValueFromEvent={getFileValue}
        >
          <Upload
            name="cover"
            listType="picture"
            beforeUpload={() => false}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload Cover Photo</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="YouTube Video Link" name="youtube_link">
          <Input />
        </Form.Item>

        <Form.Item label="Language" name="language" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Skill Level" name="skill_level" rules={[{ required: true }]}>
          <Select placeholder="Select level">
            <Select.Option value="beginner">Beginner</Select.Option>
            <Select.Option value="intermediate">Intermediate</Select.Option>
            <Select.Option value="advanced">Advanced</Select.Option>
          </Select>
        </Form.Item>

        <Divider />

        <Form.Item
          label="Number of Chapters"
          name="chapterCount"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} onChange={handleChapterCountChange} />
        </Form.Item>

        {Array.from({ length: chapters }, (_, index) => (
          <Space
            key={index}
            direction="vertical"
            style={{
              display: "block",
              marginBottom: "20px",
              padding: "10px",
              border: "1px dashed #ccc",
              borderRadius: "8px",
            }}
          >
            <Title level={5}>Chapter {index + 1}</Title>

            <Form.Item
              label={`Chapter ${index + 1} Name`}
              name={["chapters", index, "chapter_name"]}
              rules={[{ required: true, message: "Chapter name required" }]}
            >
              <Input placeholder="Enter chapter name" />
            </Form.Item>

            <Form.Item
              label={`Study Material (PDF/PPT/DOC)`}
              name={["chapters", index, "study_file"]}
              valuePropName="fileList"
              getValueFromEvent={getFileValue}
              rules={[{ required: true, message: "Please upload study material" }]}
            >
              <Upload
                beforeUpload={beforeUpload}
                maxCount={1}
                listType="text"
                multiple={false}
                accept=".pdf,.ppt,.pptx,.doc,.docx"
              >
                <Button icon={<UploadOutlined />}>Upload File</Button>
              </Upload>
            </Form.Item>
          </Space>
        ))}

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Submit Course
          </Button>
        </Form.Item>
      </Form>
    </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
