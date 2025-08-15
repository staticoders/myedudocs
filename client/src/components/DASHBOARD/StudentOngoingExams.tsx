import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  Button,
  message,
  Typography,
  Card,
  Radio,
  Input,
  Alert
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import url from "../../url";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const MAX_VIOLATIONS = 3;

export default function StudentOngoingExam() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [showRulesModal, setShowRulesModal] = useState(true);
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [violationCount, setViolationCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const timerRef = useRef(null);
  const mediaStreamRef = useRef(null);

  // Fetch exam
  useEffect(() => {
    axios.get(`${url}/exam/student/fetch/${examId}`)
      .then(res => {
        if (res.data.success) {
          setExam(res.data.exam);
          setTimeLeft(res.data.exam.durationMinutes * 60);
        } else {
          message.error("Exam not found");
          navigate("/student/exams");
        }
      })
      .catch(() => {
        message.error("Failed to fetch exam");
        navigate("/student/exams");
      });
  }, [examId, navigate]);

  // Timer
  useEffect(() => {
    if (!exam) return;
    if (timeLeft <= 0) {
      handleSubmit(true);
      return;
    }
    timerRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [timeLeft, exam]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      mediaStreamRef.current = stream;
      return true;
    } catch {
      message.error("Camera & microphone are required to start the exam");
      return false;
    }
  };

  const enterFullscreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
  };

  // Handle visibility change
  const handleVisibilityChange = () => {
    if (document.hidden || document.visibilityState !== "visible") {
      const newCount = violationCount + 1;
      setViolationCount(newCount);
      setIsLocked(true);
      message.warning(`⚠️ Violation ${newCount}/${MAX_VIOLATIONS}: Tab/window switch detected`);
      if (newCount >= MAX_VIOLATIONS) {
        message.error("Max violations reached! Auto-submitting exam...");
        handleSubmit(true);
      }
    } else {
      setIsLocked(false);
    }
  };

  const startExam = async () => {
    const allowed = await requestPermissions();
    if (!allowed) return;

    setShowRulesModal(false);
    enterFullscreen();

    // Disable right-click/copy/paste/select
    const prevent = e => e.preventDefault();
    document.addEventListener("contextmenu", prevent);
    document.addEventListener("copy", prevent);
    document.addEventListener("paste", prevent);
    document.addEventListener("cut", prevent);
    document.addEventListener("selectstart", prevent);

    // Listen for tab changes
    document.addEventListener("visibilitychange", handleVisibilityChange);
  };

  const handleAnswerChange = (qIndex, val) => {
    if (isLocked) {
      message.error("Exam locked due to violation");
      return;
    }
    setAnswers(prev => ({ ...prev, [qIndex]: val }));
  };

  const handleSubmit = (auto = false) => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (document.exitFullscreen) document.exitFullscreen();

    message.loading({ content: "Submitting exam...", key: "submit" });
    axios.post(`${url}/exam/student/submit/${examId}`, {
      studentId: JSON.parse(localStorage.getItem("edudocs") || "{}").id,
      answers
    })
      .then(() => {
        message.success({
          content: auto ? "Auto-submitted due to time/violations" : "Exam submitted successfully!",
          key: "submit",
          duration: 2
        });
        navigate("/student/results");
      })
      .catch(() => message.error({ content: "Submission failed", key: "submit" }));
  };

  if (!exam) return null;

  return (
    <>
      <Modal
        open={showRulesModal}
        closable={false}
        footer={null}
        centered
      >
        <Title level={3}>Exam Instructions</Title>
        <Paragraph>
          ⚠️ During this exam:
          <ul>
            <li>You will not be able to switch tabs or windows</li>
            <li>Camera and microphone will remain on</li>
            <li>Any violations will be recorded</li>
            <li>After {MAX_VIOLATIONS} violations, your exam will be auto-submitted</li>
          </ul>
        </Paragraph>
        <Button type="primary" block onClick={startExam}>
          I Understand, Start Exam
        </Button>
      </Modal>

      {!showRulesModal && (
        <div style={{ maxWidth: 900, margin: "auto", padding: 20, userSelect: "none" }}>
          <Title level={3}>{exam.title}</Title>
          <p><b>Subject:</b> {exam.subject}</p>
          <p><b>Time Left:</b> {formatTime(timeLeft)}</p>
          {isLocked && <Alert type="error" message="Exam Locked due to tab/window switch" />}

          {exam.questions.map((q, i) => (
            <Card key={i} title={`Q${i + 1}. ${q.questionText}`} style={{ marginBottom: 20 }}>
              {q.type === "mcq" && (
                <Radio.Group
                  value={answers[i]}
                  onChange={e => handleAnswerChange(i, e.target.value)}
                  disabled={isLocked}
                >
                  {q.options.map((opt, idx) => (
                    <Radio key={idx} value={opt}>{opt}</Radio>
                  ))}
                </Radio.Group>
              )}
              {q.type === "short" && (
                <Input
                  value={answers[i] || ""}
                  onChange={e => handleAnswerChange(i, e.target.value)}
                  disabled={isLocked}
                />
              )}
              {q.type === "paragraph" && (
                <TextArea
                  rows={4}
                  value={answers[i] || ""}
                  onChange={e => handleAnswerChange(i, e.target.value)}
                  disabled={isLocked}
                />
              )}
            </Card>
          ))}

          <Button type="primary" block size="large" onClick={() => handleSubmit(false)} disabled={isLocked}>
            Submit Exam
          </Button>
        </div>
      )}
    </>
  );
}
