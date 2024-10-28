import axios from "axios";

const hostQuestion = 'http://localhost:8080/api/v1/qna/question';
const hostAnswer = 'http://localhost:8080/api/v1/qna/answer';

// 리스트
export const getListQuestion = async (page, searchParams = {}) => {
    const { type, keyword, tags } = searchParams;

    const res = await axios.get(`${hostQuestion}/list`, {
        params: {
            page: page,
            size: 10,
            type: type || null,
            keyword: keyword || null,
            tags: tags || null,
        },
    });

    return res.data;
};

// 질문 등록
export const postAddQuestion = async (formData) => {

    try {
        const res = await axios.post(`${hostQuestion}/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return res.data;
    } catch (error) {
        console.error('Error posting question:', error);
        throw error;
    }
};

// 조회
export const getReadQuestion = async (qno) => {

    const res = await axios.get(`${hostQuestion}/${qno}`)

    return res.data
}

// 질문 삭제
export const deleteQuestion = async (qno) => {

    const res = await axios.delete(`${hostQuestion}/${qno}`)

    return res.data
}

// 질문 수정
export const putEditQuestion = async (qno, formData) => {

    try {

        const res = await axios.put(`${hostQuestion}/${qno}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // FormData 전송을 위해 헤더를 설정
            },
        });

        return res.data;
    } catch (error) {
        console.error('Error during question update API call:', error);
        throw error;
    }
};

// 답변 등록
export const postAddAnswer = async (obj) => {

    const res = await axios.post(`${hostAnswer}/add`, obj)

    return res.data
}

//
// // 답변 수정
// export const putEditQuestion = async (question) => {
//
//     const res = await axios.put(`${hostAnswer}/${question.qno}`, question)
//
//     return res.data
// }
//
// // 답변 삭제
// export const deleteQuestion = async (qno) => {
//
//     const res = await axios.delete(`${hostAnswer}/${qno}`)
//
//     return res.data
// }