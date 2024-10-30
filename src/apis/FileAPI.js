const host = 'http://localhost:8080/api/v1/files';

export const downloadFile = (filename) => {

    return `${host}/download/${filename}`
}

export const viewFileImage = (filename) => {
    return `${host}/view/${filename}`;
}

