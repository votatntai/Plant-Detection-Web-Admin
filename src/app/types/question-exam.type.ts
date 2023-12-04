import { Question } from "./question.type"

export interface QuestionExam {
    question: Question,
    description?: string,
    selectedAnswer: string
}