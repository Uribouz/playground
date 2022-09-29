package main

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/LINE-TH-Recruitment/solution-engineer-Uribouz/pkg/parser"
	"github.com/LINE-TH-Recruitment/solution-engineer-Uribouz/pkg/webchecker"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/labstack/gommon/log"
)

const FILE_NAME = "websitelist"
const THREAD_HANDLER_WEBSITECOUNT = 20

func uploadFile(c echo.Context) error {
	startTime := time.Now()
	var fmtError error
	defer func() {
		if fmtError != nil {
			log.Error(fmtError)
		}
	}()
	log.Debug("Uploading file...")
	file, err := c.FormFile(FILE_NAME)
	if err != nil {
		fmtError = fmt.Errorf("Cannot FormFile(%v), %v", FILE_NAME, err)
		return fmtError
	}
	log.Debug("Opening file...")
	src, err := file.Open()
	if err != nil {
		fmtError = fmt.Errorf("Cannot Open file, %v", err)
		return fmtError
	}
	defer src.Close()
	parserRunner := parser.NewFileParserTrimComma()
	log.Debug("Running ParseFileToArray...")
	websiteList, err := parserRunner.ParseFileToArray(src)
	if err != nil {
		fmtError = fmt.Errorf("Cannot ParseFileToArray, %v", err)
		return fmtError
	}
	checkerRunner := webchecker.NewWebCheckerRunner(THREAD_HANDLER_WEBSITECOUNT)

	log.Debug("Running GetWebsiteStatus..")
	result, err := checkerRunner.GetWebsiteStatus(websiteList)
	if err != nil {
		fmtError = fmt.Errorf("Cannot GetWebsiteStatus, %v", err)
		return fmtError
	}
	timeUsed := int(time.Now().Sub(startTime).Seconds())
	result.TIMEUSED = timeUsed
	return c.JSON(http.StatusOK, result)
}

func main() {
	log.SetOutput(os.Stdout)
	log.SetLevel(log.DEBUG)
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))
	e.POST("/uploadcsv", uploadFile)
	e.Logger.Fatal(e.Start(":1323"))
}
