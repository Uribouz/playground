package parser

import (
	"bufio"
	"fmt"
	"io"
	"strings"
)

type FileParser struct {
	isTrimComma bool
}

func NewFileParserTrimComma() FileParser {
	return FileParser{isTrimComma: true}
}

func (fp FileParser) ParseFileToArray(file io.Reader) ([]string, error) {
	var result []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		text := scanner.Text()
		if fp.isTrimComma {
			text = strings.TrimSuffix(text, ",")
		}
		result = append(result, text)
	}
	err := scanner.Err()
	if err != nil {
		return nil, fmt.Errorf("scanner: %v", err)
	}
	return result, nil
}
