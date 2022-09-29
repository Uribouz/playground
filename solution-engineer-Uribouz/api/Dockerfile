FROM golang:1.16.2 as builder

WORKDIR /solution-engineer-Uribouz
COPY go.mod ./
COPY go.sum ./
COPY service/main.go ./service/main.go
COPY pkg/ ./pkg/

RUN go mod download
RUN GOOS=linux go build service/main.go

FROM gcr.io/distroless/base-debian10

WORKDIR /root
COPY --from=builder /solution-engineer-Uribouz/main ./

CMD ["./main"]