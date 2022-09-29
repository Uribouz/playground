# Solution Engineer


## Personal Information

Please provide all information in English.

|  |  |
| --- | --- |
| **⚠️ First Name:** | `[Vatcharit]` |
| **⚠️ Last Name:** | `[Opaswattanakul]` |
| **⚠️ Email:** | `[vatcharitopas@gmail.com]` |
| **⚠️ Phone Number:** | `[0970588811]` |


## How-to-use:

### 1) API: (from project directory)
    Run following command on the project directory.
        $ cd api
        $ docker build -t solution-engineer-uribouz-api:0.0.1 -f Dockerfile .
        $ docker container stop solution-engineer-uribouz-api
        $ docker run -d --rm -p 1323:1323 --name solution-engineer-uribouz-api solution-engineer-uribouz-api:0.0.1
### 2) WEB: (from project directory)
    Run following command on the project directory.
        $ cd web
        $ docker build -t solution-engineer-uribouz-web:0.0.1 -f Dockerfile .
        $ docker container stop solution-engineer-uribouz-web
        $ docker run -d --rm -p 3000:3000 --name solution-engineer-uribouz-web solution-engineer-uribouz-web:0.0.1
### 3) Open website:localhost [http://localhost:/3000](http://localhost:3000/)


## What we are looking for

* Clarity: You can write clear code that any devs could read and understand in one go
* Simplicity: You can write gimmick-free and straightforward code with no ambiguities
* Defensiveness: You can cover edge cases and treat user inputs with care
* Resilience: You can gracefully handle an error and unexpected behavior


## Overview

Implement a website that can upload the list of websites as a CSV file. The service will check all of those websites' availability and show their status in the UI. See the flow & design below.

![c342339565cbdedcf65aa65b74999c11](https://user-images.githubusercontent.com/4660719/182761148-06365bac-41d2-4d0c-b366-ba15076226c0.png)


## General requirements

* Up-and-Running the application with container
* Provide instruction to run your services in README.md file
* Ensure reproducible build and run on a local machine
* Separate backend and frontend
* Can find the example of the CSV file [here](https://gist.github.com/pangaunn/028f99cf5f7e7fcdaf575dfdccba7cd5)


## Frontend requirements

* Implement UI component for uploading a CSV file
* Implement uploading file functionality
* Render the response resulting from API
* Can use any frontend frameworks and any CSS frameworks
* Can find the design in detail on Figma [here](https://www.figma.com/file/b85ivW9iddCv1eV7D0uF2g/Assignment?node-id=0%3A1)


### Frontend Bonus

* If you validate the input
* If your progress bar shows a calculation between uploading time and processing time
* If you can make drag and drop work properly
* If you come up with some frontend tests


## Backend requirements

* Must be written in Golang
* Check website available with net/http package
* Up: any http status code that is returned from the website
* Down: cannot reach the website (request timeout and not found)
* Handle errors without stopping the entire process
* Write readable code
* Write automated unit tests
* Run program as fast as possible on multi-core CPU


### Backend Bonus

* If you have a good package structure
* If you can handle a vast file
