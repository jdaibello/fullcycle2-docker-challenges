FROM golang:rc-alpine3.13 as builder

WORKDIR /go/src/app

ENV CGO_ENABLED=0

COPY . .

RUN go build -o /app main.go

FROM scratch

COPY --from=builder /app /app

CMD [ "/app" ]