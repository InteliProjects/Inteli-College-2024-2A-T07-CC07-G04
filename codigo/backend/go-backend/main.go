package main

import (
    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
    "go-backend/config"
    "go-backend/db"
    "go-backend/routes"
)

func main() {
    // Carrega as configurações e inicializa o banco de dados
    config.Load()
    db.Init()

    // Configura o roteador Gin
    router := gin.Default()

    // Configura o CORS para permitir todas as origens
    router.Use(cors.New(cors.Config{
        AllowAllOrigins: true, // Permite todas as origens
        AllowMethods:    []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
        AllowHeaders:    []string{"Origin", "Content-Type", "Accept", "Authorization"},
        AllowCredentials: true,
    }))

    // Registra as rotas
    routes.RegisterRoutes(router)

    // Inicializa o servidor na porta 5000
    router.Run(":5000")
}
