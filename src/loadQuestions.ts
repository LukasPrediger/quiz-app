import Question from "./Types"

interface RemoteQuestions {
    id: number,
    text: string,
    image?: string,
    answers: {
        text: string,
        isCorrect: boolean
    }[]
}

export default async function fetchQuestions(): Promise<Array<Question>> {
    try {
        const response = await fetch("https://github.com/Chase22/german-citizenship-questions/releases/download/2025-08-05/questions.json", {
        method: "GET",
        mode: "no-cors",
        redirect: "follow"
    })

    if (!response.ok) {
        throw Error(`Unexpected status code ${response.status} when fetching questions`)
    }

    const remoteQuestions = (await response.json()) as Array<RemoteQuestions>

    return remoteQuestions.map(question => {
        const correctAnswer = question.answers.find(it => it.isCorrect)!!.text
        const otherAnswers = question.answers.filter(it => !it.isCorrect).map(it => it.text)

        return {
            question: question.text,
            correctAnswer,
            otherAnswers
        } as Question
    })
    } catch(e) {
        console.error("Failed to fetch questions", e)
        throw e
    }
}