import UploadService from "../service/FileUploadService";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["csv"];

function WebsiteUploader(props) {
    const onUploadClick = props.onUploadClick
    const onUploadProgressProp = props.onUploadProgress
    const onUploadFile = props.onUploadFile
    const uploadFile = props.uploadFile

    const handleFileChange = (files) => {
      if (!files) {
        return
      }
      console.log("file changed")
      console.log("file.....");
      onUploadFile(files)

      for (let i = 0; i < files.length; i++) {
        let file = files.item(i);
        console.log(file.name);
        UploadService.upload(file, (i) => {onUploadProgressProp(i)}
          ).then((response) => { 
          console.log(response);
          console.log(response.status);
          console.log(response.data);
          if (response.status === 200) {
            onUploadClick(response.data)
          } else {
            onUploadClick(undefined)
          }
          onUploadFile(null)
          onUploadProgressProp(-1)
        }).catch((error) => {
          console.log("cannot onUploadClick, ", error);
          onUploadClick(undefined)
          onUploadFile(null)
        });
      }
    }

    console.log("fileOrFiles..." + uploadFile)
    return (
      <div className="uploader-container">
        <FileUploader 
          multiple
          handleChange={handleFileChange}
          name="file"
          type={fileTypes}
          fileOrFiles={uploadFile}
        />
      </div>
    );
  }

export default WebsiteUploader;