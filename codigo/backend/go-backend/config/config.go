package config

import (
    "fmt"
    "log"
    "os"
    "github.com/joho/godotenv"
)

type Config struct {
    DatabaseURI string
}

func Load() *Config {
    // Carrega o arquivo .env
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    // Carrega variáveis de ambiente
    dbUser := os.Getenv("DB_USER")
    dbPassword := os.Getenv("DB_PASSWORD")
    dbHost := os.Getenv("DB_HOST")
    dbPort := os.Getenv("DB_PORT")
    dbName := os.Getenv("DB_NAME")
    dbSSLMode := os.Getenv("DB_SSLMODE")

    // Verifica se todas as variáveis de ambiente necessárias estão definidas
    if dbUser == "" || dbPassword == "" || dbHost == "" || dbPort == "" || dbName == "" {
        log.Fatal("All database environment variables are required")
    }

    // Constrói o DatabaseURI
    dbURI := fmt.Sprintf(
        "host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
        dbHost, dbUser, dbPassword, dbName, dbPort, dbSSLMode,
    )

    

    config := &Config{
        DatabaseURI: dbURI,
    }
    fmt.Println(dbURI)
    return config
}
