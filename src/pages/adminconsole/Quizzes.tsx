import React, { useState, useEffect } from "react";
import { Table, Space, Select, message, Switch, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Adjust path based on your folder structure
import { Modal, Input, Button, InputNumber } from "antd";
import { addDoc, collection } from "firebase/firestore";
const { Option } = Select;
import "./Quizzes.css";

const Quizzes: React.FC = () => {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [quizName, setQuizName] = useState("");
  const [quizEndDate, setQuizEndDate] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", options: ["", ""], correctAnswer: 0, points: 1 },
  ]);

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", options: ["", ""], correctAnswer: 0, points: 1 },
    ]);
  };

  const handleAddOption = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push("");
    setQuestions(newQuestions);
  };

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const handleRemoveQuestion = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(questionIndex, 1);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionIndex: number
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].text = e.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionIndex: number,
    optionIndex: number
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    try {
      // Save the quiz to Firestore
      const quizData = {
        name: quizName,
        endDate: quizEndDate,
        questions,
        enabled: false,
      };
      await addDoc(collection(db, "quizzes"), quizData);
      message.success("Quiz added successfully!");
      // Reset the form
      setQuizName("");
      setQuestions([
        { text: "", options: ["", ""], correctAnswer: 0, points: 1 },
      ]);
    } catch (error) {
      message.error("Failed to add the quiz. Please try again.");
      console.error("Error adding quiz: ", error);
    }
  };

  const fetchQuizzes = async () => {
    const quizCollection = collection(db, "quizzes");
    const quizSnapshot = await getDocs(quizCollection);
    const fetchedQuizzes: any[] = [];

    quizSnapshot.forEach((doc) => {
      fetchedQuizzes.push({ id: doc.id, ...doc.data() });
    });

    setQuizzes(fetchedQuizzes);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleToggleEnabled = async (quizId: string, enabled: boolean) => {
    try {
      const quizRef = doc(db, "quizzes", quizId);
      await updateDoc(quizRef, { enabled });
      fetchQuizzes(); // Refresh the quizzes list after updating
    } catch (error) {
      console.error("Error updating quiz enabled status: ", error);
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    try {
      await deleteDoc(doc(db, "quizzes", quizId));
      message.success("Quiz deleted successfully!");
      fetchQuizzes(); // Refresh the quizzes list after deletion
    } catch (error) {
      message.error("Failed to delete the quiz. Please try again.");
      console.error("Error deleting quiz: ", error);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Questions",
      dataIndex: "questions",
      key: "questions",
      render: (questions: any[]) => questions.length,
    },
    {
      title: "Total Takers",
      dataIndex: "totalTakers",
      key: "totalTakers",
    },
    {
      title: "Average Score",
      dataIndex: "averageScore",
      key: "averageScore",
    },
    {
      title: "Enabled",
      dataIndex: "enabled",
      key: "enabled",
      render: (enabled: boolean, record: any) => (
        <Switch
          checked={enabled}
          onChange={(checked) => handleToggleEnabled(record.id, checked)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: any, record: any) => (
        <Space size="middle">
          <a>Edit</a>
          <a onClick={() => handleDeleteQuiz(record.id)}>Delete</a>
          <a>Analytics</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="quizzes-page">
      <Modal
        title="Add New Quiz"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        className="quiz-modal"
      >
        <div className="quiz-form">
          <Input
            placeholder="Quiz Name"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            className="quiz-name-input"
          />
          <DatePicker
            className="datepicker"
            onChange={(_e, date) => {
              setQuizEndDate(date.toString);
              console.log(quizEndDate);
            }}
            style={{ marginBottom: "15px" }}
          />
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="question-section">
              <Input
                placeholder={`Question ${qIndex + 1}`}
                value={question.text}
                onChange={(e) => handleQuestionChange(e, qIndex)}
                className="question-input"
              />
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="option-section">
                  <Input
                    placeholder={`Option ${oIndex + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(e, qIndex, oIndex)}
                    className="option-input"
                  />
                  <Button
                    onClick={() => handleRemoveOption(qIndex, oIndex)}
                    type="primary"
                    danger
                    className="remove-option-btn"
                  >
                    X
                  </Button>
                </div>
              ))}
              <Button
                onClick={() => handleAddOption(qIndex)}
                type="dashed"
                className="add-option-btn"
              >
                Add Option
              </Button>
              <div className="answer-section">
                <span>Correct Answer:</span>
                <Select
                  value={question.correctAnswer}
                  onChange={(value) => {
                    const newQuestions = [...questions];
                    newQuestions[qIndex].correctAnswer = value;
                    setQuestions(newQuestions);
                  }}
                  className="correct-answer-dropdown"
                >
                  {question.options.map((option, index) => (
                    <Option key={index} value={index}>
                      {option}
                    </Option>
                  ))}
                </Select>
                <span>Points:</span>
                <InputNumber
                  value={question.points}
                  onChange={(value) => {
                    const newQuestions = [...questions];
                    newQuestions[qIndex].points = value ? value : 0;
                    setQuestions(newQuestions);
                  }}
                  className="points-input"
                />
              </div>
              <Button
                onClick={() => handleRemoveQuestion(qIndex)}
                type="primary"
                danger
                className="remove-question-btn"
              >
                Remove Question
              </Button>
            </div>
          ))}
          <Button
            onClick={handleAddQuestion}
            type="dashed"
            className="add-question-btn"
          >
            Add Question
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            className="submit-quiz-btn"
          >
            Submit Quiz
          </Button>
        </div>
      </Modal>

      <div className="quizzes-header">
        <Input
          placeholder="Search quizzes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setIsModalVisible(true)}
        >
          Add Quiz
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredQuizzes}
        rowKey="id"
        rowClassName="custom-row-class"
      />
    </div>
  );
};

export default Quizzes;
