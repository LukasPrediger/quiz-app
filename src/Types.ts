import cyrb53String from "./hash";

export default interface Question {
    question: string,
    correctAnswer: string,
    otherAnswers: string[],
}

export class QuestionResult {
    public readonly questionId: string
    public readonly question: string
    public readonly seletedAnswer: string
    public readonly correctAnswer: string

    public readonly isCorrect: boolean

    constructor(
        questionId: string,
        question: string,
        seletedAnswer: string,
        correctAnswer: string,
    ) {
        this.questionId = questionId
        this.question = question
        this.seletedAnswer = seletedAnswer
        this.correctAnswer = correctAnswer
        this.isCorrect = seletedAnswer === correctAnswer
    }
}

export interface QuestionStats {
    readonly questionCount: number
    readonly answers: number
    readonly correctAnswers: number
}

export function generateStats(questionCount: number, questionResults: Array<QuestionResult>): QuestionStats {
    console.log("Generating Stats", questionResults)
    console.log("answers", questionResults.length)
    console.log("correctAnswers", questionResults.filter(result => result.isCorrect).length)
    return {
        questionCount,
        answers: questionResults.length,
        correctAnswers: questionResults.filter(result => result.isCorrect).length
    }
}

export function questionId(question: Question): string {
    return cyrb53String(JSON.stringify(question))
}