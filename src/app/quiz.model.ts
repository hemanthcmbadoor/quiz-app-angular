export interface GetQuizResponse {
    results: Data;
    response_code: number;
}

export interface Data {
    category: string;
    correct_answer: string;
    difficulty: string;
    //incorrect_answers: [];
    question: string;
    type: string;
}