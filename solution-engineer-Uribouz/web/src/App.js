import React, { useState } from 'react';
import WebsiteUploader from './component/WebsiteUploader';
import WebsiteSummary from './component/WebsiteSummary';
import UploadProgress from './component/UploadProgress';

import './App.css';
import 'antd/dist/antd.min.css';

function App() {
  const [uploadFile, setUploadFile] = useState(null);
  const [progressBar, setProgressBar] = useState(-1);
  const [summary, setSummary] = useState({total: 0,
                                          up: 0,
                                          down: 0,
                                          timeUsed: 0,});

  const setHaveResult = (data) => {
    if (data !== undefined) {
      setSummary({
        total: data.total,
        up: data.up,
        down: data.down,
        timeUsed: data.timeused,
      });
    } else {
      setSummary(undefined);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h4 className="App-title"> Website Checker </h4>
        <WebsiteUploader
            uploadFile={uploadFile}
            onUploadFile={setUploadFile}
            onUploadClick={setHaveResult}
            onUploadProgress={(progress) => { 
              console.log(progress)
              return setProgressBar(progress)
            }
        }/>
        <UploadProgress 
            value={progressBar}
        />
        <WebsiteSummary 
          summary={summary}
        />
      </header>
    </div>
  );
}

export default App;
