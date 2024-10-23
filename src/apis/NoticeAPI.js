import axios from "axios"

const host = 'http://localhost:8080/api/v1/notice'

export const getList = async (page) => {

    const res = await axios.get(`${host}/list`, {
        params: { page: page, size: 10 }
    });

    return res.data;
};

export const getOne = async (noticeNo) => {
    const res = await axios.get(`${host}/${noticeNo}`)

    return res.data
}

// 등록
export const postOne = async (formData) => {
    const res = await axios.post(`${host}/add`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // 파일 업로드 시 필요
        },
    });

    return res.data;
};


export const deleteOne = async (noticeNo) => {

    const res = await axios.delete(`${host}/${noticeNo}`)

    return res.data
}

export const putOne = async (notice) => {

    const res = await axios.put(`${host}/${notice.noticeNo}`, notice)
    return res.data
}

