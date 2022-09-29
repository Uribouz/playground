import { Progress } from 'antd';

function UploadProgress(props) {
    const progress = props.value
    console.log("Uploading: " + progress)
    if (progress >= 0 && progress <= 100) {
      return (
        <div className="progress-container">
          <Progress percent={progress} status="active" />
        </div>
      )
    }
  }

export default UploadProgress;