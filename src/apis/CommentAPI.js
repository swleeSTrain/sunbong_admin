import axios from "axios"

const host = 'http://localhost:8080/api/v1/comment';

export const getCommentList = async (bno, page) => {
    const response = await axios.get(`${host}/${bno}`, {
        params: {
            page: page,
            size: 10,
        },
    });
    return response.data;
}

export const postCommentOne = async (commentData) => {
    const formData = new FormData();
    // boardData의 모든 필드를 FormData에 추가
    for (const key in commentData) {
        formData.append(key, commentData[key]);
    }
    // 요청 보내기
    const response = await axios.post(`${host}/add`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}

// 게시글을 삭제하는 함수
export const deleteCommentOne = async (cno) => {
    const response = await axios.delete(`${host}/${cno}`);
    return response.data;
}