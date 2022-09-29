package counter

type RangeCounter struct {
	maxChunkLen int
	dataLen     int
	startIdx    int
	endIdx      int
}

func NewRangeCounter(maxChunkLen int, dataLen int) RangeCounter {
	return RangeCounter{maxChunkLen: maxChunkLen, dataLen: dataLen}
}

func (r *RangeCounter) Next() bool {
	if r.endIdx >= r.dataLen {
		return false
	}
	r.startIdx = r.endIdx
	nextEndIdx := r.endIdx + r.maxChunkLen
	if nextEndIdx > r.dataLen {
		nextEndIdx = r.dataLen
	}
	r.endIdx = nextEndIdx
	return true
}

func (r RangeCounter) GetIdx() (int, int) {
	return r.startIdx, r.endIdx
}
