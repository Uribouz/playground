package webchecker

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

type TestCases struct {
	name     string
	input    []string
	expected WebsiteSummary
}

var testCases = []TestCases{
	{
		name: "test_1",
		input: []string{
			"http://www.google.com",
			"https://github.com/",
			"https://mywebsitethatnotexists.com/",
		},
		expected: WebsiteSummary{
			TOTAL: 3,
			UP:    2,
			DOWN:  1,
		},
	},
	{
		name: "test_2",
		input: []string{
			"www.google.com",
			"github.com/",
			"www.twitter.com",
			"www.github.com/",
		},
		expected: WebsiteSummary{
			TOTAL: 4,
			UP:    4,
			DOWN:  0,
		},
	},
	{
		name: "test_3",
		input: []string{
			"http://www.google.com",
			"https://github.com/",
			"https://mywebsitethatnotexists.com/",
			"http://www.google.com",
			"https://github.com/",
			"https://mywebsitethatnotexists.com/",
			"http://www.google.com",
			"https://github.com/",
			"https://mywebsitethatnotexists.com/",
			"http://www.google.com",
			"https://github.com/",
			"https://mywebsitethatnotexists.com/",
			"http://www.google.com",
			"https://github.com/",
			"https://mywebsitethatnotexists.com/",
		},
		expected: WebsiteSummary{
			TOTAL: 15,
			UP:    10,
			DOWN:  5,
		},
	},
}

func TestGetWebsiteStatus(t *testing.T) {
	runner := NewWebCheckerRunner(2)
	for _, test := range testCases {
		t.Run(test.name, func(t *testing.T) {
			actual, err := runner.GetWebsiteStatus(test.input)
			assert.NoError(t, err, "GetWebsiteStatus failed")
			assert.Equal(t, test.expected.TOTAL, actual.TOTAL, "TOTAL")
			assert.Equal(t, test.expected.UP, actual.UP, "UP")
			assert.Equal(t, test.expected.DOWN, actual.DOWN, "DOWN")
		})
	}
}
