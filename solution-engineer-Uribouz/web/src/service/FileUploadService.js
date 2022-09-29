import axios from "../htttp-common";

const upload = async (file, setProgress) => {
    setProgress(0)
    const options = {
        onUploadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent;
            let percent = Math.round(loaded / total) * 100;
            setProgress(percent)
        },
        headers: {
            "Content-Type": "multipart/form-data",
        }, 
    }
    let formData = new FormData();
    formData.append("websitelist", file);
    const result = await axios.post("/uploadcsv", formData, options);
    return result
}

const FileUploadService = {
    upload,
}

export default FileUploadService;