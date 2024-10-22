import axios from "axios";

const host = 'http://localhost:8080/api/v1/notice';

export const getNoticeList = async (page) => {
    const response = await axios.get(`${host}/list`, {
        params: {page: page, size: 10}
    });
    return response.data;
}

export const getNoticeOne = async (noticeNo) => {
    const response = await axios.get(`${host}/${noticeNo}`)
    return response.data;
}

export const postNoticeOne = async (obj) => {
    const response = await axios.post(`${host}`, obj);
    return response.data;
}

export const deleteNoticeOne = async (noticeNo) => {
    const response = await axios.delete(`${host}/${noticeNo}`);
    return response.data;
}

export const putNoticeOne = async (notice) => {
    const response = await axios.put(`${host}/${notice.noticeNo}`, notice);
    return response.data;
}