
import secondsToMinutes from "../util/secondsToMinutes";

function WebsiteSummary({summary}) {
    if (summary !== undefined) {
      const total = summary.total
      const up = summary.up
      const down = summary.down
      const timeUsed = secondsToMinutes(summary.timeUsed)
    
      return (
        <div className="website-summary-container">
          <div className="website-summary-header">
            <h4 className="website-summary-title">Total {total} Websites</h4>
            <p className="website-summary-subtitle">(Used {timeUsed.minute} minute and {timeUsed.second} second)</p>
          </div>
  
          <div className="website-summary-body">
            <div className="website-summary-block website-summary-block--up">
              <p className="website-summary-block-status-title">UP</p>
              <p className="website-summary-block-status-value">{up}</p>
            </div>
            <div className="website-summary-block">
              <p className="website-summary-block-status-title">Down</p>
              <p className="website-summary-block-status-value">{down}</p>
            </div>
          </div>
        </div>
      );
    }
  }

export default WebsiteSummary;