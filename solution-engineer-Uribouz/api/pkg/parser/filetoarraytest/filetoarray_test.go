package parser__test

import (
	"github.com/LINE-TH-Recruitment/solution-engineer-Uribouz/pkg/parser"
	"github.com/stretchr/testify/assert"
	"os"
	"testing"
)

type TestCases struct {
	fileName string
	expected []string
}

var testCases = []TestCases{
	{
		fileName: "file/file1.csv",
		expected: []string{
			"www.google.com",
			"www.test.com",
		},
	}, {
		fileName: "file/file2.csv",
		expected: []string{
			"www.mangrove.com",
			"www.coco.com",
			"www.mangrove.com",
			"www.coco.com",
			"www.mangrove.com",
			"www.coco.com",
			"www.mangrove.com",
			"www.coco.com",
			"www.mangrove.com",
			"www.coco.com",
			"www.mangrove.com",
			"www.coco.com",
			"www.mangrove.com",
			"www.coco.com",
			"www.mangrove.com",
			"www.coco.com",
			"www.mangrove.com",
			"www.coco.com",
			"www.mangrove.com",
			"www.coco.com",
		},
	},
}

func TestParseFileToArray(t *testing.T) {
	runner := parser.NewFileParserTrimComma()
	for _, testCase := range testCases {
		t.Run(testCase.fileName, func(t *testing.T) {
			file, err := os.Open(testCase.fileName)
			assert.NoError(t, err, "os.Open failed")
			defer file.Close()
			result, err := runner.ParseFileToArray(file)
			assert.NoError(t, err, "ParseFileToArray failed")
			assert.Equal(t, testCase.expected, result, testCase.fileName)
		})
	}
}
