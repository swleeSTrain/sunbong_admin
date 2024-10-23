import axios from "axios";

const hostQuestion = 'http://localhost:8080/api/v1/qna/question';
const hostAnswer = 'http://localhost:8080/api/v1/qna/answer';

// 조회
export const getReadQuestion = async (qno) => {

    const res = await axios.get(`${hostQuestion}/${qno}`)

    return res.data
}

// 리스트
export const getListQuestion = async (page) => {

    const res = await axios.get(`${hostQuestion}/list`, {
        params: { page: page, size: 10 }  // 페이지 번호와 크기 설정
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


//
// // 질문 수정
// export const putEditQuestion = async (question) => {
//
//     const res = await axios.put(`${hostQuestion}/${question.qno}`, question)
//
//     return res.data
// }
//
// // 질문 삭제
// export const deleteQuestion = async (qno) => {
//
//     const res = await axios.delete(`${hostQuestion}/${qno}`)
//
//     return res.data
// }
//
// // 답변 등록
// export const postAddQuestion = async (obj) => {
//
//     const res = await axios.post(`${hostAnswer}/add`, obj)
//
//     return res.data
// }
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