import { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  Upload,
  Space,
  Spin,
  message
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Sidebar2 from "./Sidebar2";
import url from "../../url";

const { TextArea } = Input;

const UpdateCourse = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [course, setCourse] = useState<any>(null);
  const [teachersName, setTeachersName] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loginUser, setLoginUser] = useState<{ aname?: string; tname?: string }>({});

  // Get file list from event
  const getFileValue = (e: any) => Array.isArray(e) ? e : e?.fileList || [];

  // Get logged-in user
  useEffect(() => {
    const user = localStorage.getItem("edudocs");
    if (user) {
      setLoginUser(JSON.parse(user));
    }
  }, []);

  // Fetch course details
  useEffect(() => {
    axios
      .get(`${url}/course/courseDetails/${id}`)
      .then((res) => {
        setCourse(res.data.course);
        setLoading(false);
      })
      .catch((err) => {
        message.error("Failed to load course");
        setLoading(false);
      });
  }, [id]);

  // Fetch teachers
  useEffect(() => {
    axios
      .get(`${url}/allteachersName`)
      .then((res) => setTeachersName(res.data.teachers))
      .catch(() => message.error("Failed to load teachers"));
  }, []);

  // Set values in form when course is loaded
  useEffect(() => {
    if (course) {
      const formattedCover = course.coverphoto
        ? [{
            uid: "-1",
            name: course.coverphoto.split("/").pop(),
            url: `${url}/${course.coverphoto.replace(/\\/g, "/")}`,
            status: "done"
          }]
        : [];

      const formattedChapters = course.chapters?.map((chapter: any) => {
        const formattedStudy = chapter.study_file
          ? [{
              uid: "-1",
              name: chapter.study_file.split("/").pop(),
              url: `${url}/${chapter.study_file.replace(/\\/g, "/")}`,
              status: "done"
            }]
          : [];

        return {
          chapter_name: chapter.chapter_name,
          study_file: formattedStudy
        };
      });

      form.setFieldsValue({
        ...course,
        coverphoto: formattedCover,
        chapters: formattedChapters
      });
    }
  }, [course]);

  // Submit handler
  const handleUpdate = (values: any) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("short_desc", values.short_desc);
    formData.append("long_desc", values.long_desc);
    formData.append("price", `${values.price}`);
    formData.append("duration", `${values.duration}`);
    formData.append("teacher_id", values.teacher_id);
    formData.append("language", values.language);
    formData.append("skill_level", values.skill_level);
    formData.append("youtube_link", values.youtube_link);

    // Cover Photo
    if (values.coverphoto?.[0]?.originFileObj) {
      formData.append("coverphoto", values.coverphoto[0].originFileObj);
    }

    // Chapters
    values.chapters?.forEach((chapter: any, index: number) => {
      formData.append(`chapters[${index}][chapter_name]`, chapter.chapter_name);

      const studyFile = chapter.study_file;
      if (Array.isArray(studyFile)) {
        const fileObj = studyFile[0];
        if (fileObj?.originFileObj) {
          formData.append(`chapters[${index}][study_file]`, fileObj.originFileObj);
        } else if (fileObj?.url) {
          formData.append(`chapters[${index}][study_file]`, fileObj.url);
        }
      } else if (typeof studyFile === "string") {
        formData.append(`chapters[${index}][study_file]`, studyFile);
      }
    });

    axios
      .put(`${url}/course/updateCourse/${id}`, formData)
      .then(() => message.success("Course updated successfully"))
      .catch(() => message.error("Failed to update course"));
  };

  if (loading || !course) return <Spin style={{ margin: 100 }} />;

  return (
    <>
      <div className="wrapper">
        <Topbar />
        {"aname" in loginUser ? <Sidebar /> : <Sidebar2 />}

        <div className="content-page">
          <div className="content">
            <div className="container-fluid mt-3">
              <h4 className="page-title">Dashboard / Update Course</h4>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-12 p-5">
                <Form form={form} layout="vertical" onFinish={handleUpdate}>
                  <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>

                  <Form.Item name="short_desc" label="Short Description" rules={[{ required: true }]}>
                    <TextArea rows={2} />
                  </Form.Item>

                  <Form.Item name="long_desc" label="Long Description" rules={[{ required: true }]}>
                    <TextArea rows={4} />
                  </Form.Item>

                  <Form.Item name="price" label="Price ₹" rules={[{ required: true }]}>
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item name="duration" label="Duration (hours)" rules={[{ required: true }]}>
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item name="teacher_id" label="Teacher" rules={[{ required: true }]}>
                    <Select placeholder="Select teacher">
                      {teachersName.map((t: any) => (
                        <Select.Option key={t._id} value={t._id}>
                          {t.tname}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item name="language" label="Language" rules={[{ required: true }]}>
                    <Select>
                      <Select.Option value="english">English</Select.Option>
                      <Select.Option value="hindi">Hindi</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="skill_level" label="Skill Level" rules={[{ required: true }]}>
                    <Select>
                      <Select.Option value="beginner">Beginner</Select.Option>
                      <Select.Option value="intermediate">Intermediate</Select.Option>
                      <Select.Option value="advanced">Advanced</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="youtube_link" label="YouTube Link" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="coverphoto"
                    label="Cover Photo"
                    valuePropName="fileList"
                    getValueFromEvent={getFileValue}
                  >
                    <Upload listType="picture" beforeUpload={() => false}>
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </Form.Item>

                  {/* Chapters Loop */}
                  {course.chapters?.map((_: any, index: number) => (
                    <Space key={index} direction="vertical" style={{ width: "100%" }}>
                      <Form.Item
                        label={`Chapter ${index + 1} Name`}
                        name={["chapters", index, "chapter_name"]}
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="Study File"
                        name={["chapters", index, "study_file"]}
                        valuePropName="fileList"
                        getValueFromEvent={getFileValue}
                      >
                        <Upload listType="text" beforeUpload={() => false}>
                          <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                      </Form.Item>
                    </Space>
                  ))}

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Update Course
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCourse;
