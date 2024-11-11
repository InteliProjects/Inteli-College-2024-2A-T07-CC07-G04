# syntax=docker/dockerfile:1
# Nota: separamos Builder de Runner para criar imagens mais leves

# ---- Builder ----
FROM golang:1.23 AS builder
WORKDIR /app

# Dependências
COPY go.mod go.sum ./
RUN go mod download

# Build
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /go-backend

# ---- Imagem Final (minimal) ----
FROM gcr.io/distroless/base-debian11 AS runner

WORKDIR /
COPY --from=builder /go-backend /go-backend

COPY .env .env

EXPOSE 5000
USER nonroot:nonroot
ENTRYPOINT ["/go-backend"]
