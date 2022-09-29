package webchecker

import (
	"net/http"
	"strings"
	"sync"

	"github.com/LINE-TH-Recruitment/solution-engineer-Uribouz/pkg/counter"
)

type WebCheckerRunner struct {
	dataChunkLen int
}

func NewWebCheckerRunner(dataChunkLen int) WebCheckerRunner {
	return WebCheckerRunner{dataChunkLen: dataChunkLen}
}

type WebsiteSummary struct {
	TOTAL    int `json:"total"`
	UP       int `json:"up"`
	DOWN     int `json:"down"`
	TIMEUSED int `json:"timeused"`
}

func DoGetWebsite(websiteList []string) (WebsiteSummary, error) {
	summary := WebsiteSummary{
		TOTAL: len(websiteList),
	}
	isServerUp := func(resp *http.Response, inErr error) bool {
		if inErr != nil || resp.StatusCode != http.StatusOK {
			return false
		}
		return true
	}
	for _, website := range websiteList {
		websiteFull := website
		isHavePrefix := (strings.HasPrefix(website, "http://") || strings.HasPrefix(website, "https://"))
		var err error
		if !isHavePrefix {
			websiteFull = "http://" + website
		}
		resp, err := http.Get(websiteFull)
		if !isHavePrefix && !isServerUp(resp, err) {
			websiteFull = "https://" + website
			resp, err = http.Get(websiteFull)
		}
		if !isServerUp(resp, err) {
			summary.DOWN++
		} else {
			summary.UP++
		}
	}
	return summary, nil
}

func (wr WebCheckerRunner) GetWebsiteStatus(websiteList []string) (WebsiteSummary, error) {
	var wg sync.WaitGroup
	var mu sync.Mutex
	type ResultData struct {
		result WebsiteSummary
		err    error
	}
	var resultList []ResultData
	rangeCounter := counter.NewRangeCounter(wr.dataChunkLen, len(websiteList))
	for rangeCounter.Next() {
		startIdx, endIdx := rangeCounter.GetIdx()
		wg.Add(1)
		go func() {
			defer wg.Done()
			result, err := DoGetWebsite(websiteList[startIdx:endIdx])
			mu.Lock()
			resultList = append(resultList, ResultData{result: result, err: err})
			mu.Unlock()
		}()
	}
	wg.Wait()
	var summary WebsiteSummary
	for _, val := range resultList {
		if val.err != nil {
			return WebsiteSummary{}, val.err
		}
		summary.TOTAL += val.result.TOTAL
		summary.UP += val.result.UP
		summary.DOWN += val.result.DOWN
	}
	return summary, nil
}
