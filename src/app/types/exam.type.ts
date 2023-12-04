import { QuestionExam } from "./question-exam.type";
import { Student } from "./student.type";

export interface Exam {
    id: string,
    student: Student,
    createAt: string,
    submitAt?: string,
    isSubmitted: boolean,
    questionExams: QuestionExam[]
}