package db

import (
    "log"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "go-backend/config"
    "go-backend/models" // Importe os modelos para migrar as tabelas
)

var DB *gorm.DB

func Init() {
    cfg := config.Load()

    var err error
    DB, err = gorm.Open(postgres.Open(cfg.DatabaseURI), &gorm.Config{})
    if err != nil {
        log.Fatal("Failed to connect to the database: ", err)
    }

    log.Println("Database connected successfully.")

    // Adiciona a chamada para AutoMigrate para todos os modelos
    err = DB.AutoMigrate(
        &models.Produto{},
        &models.Estoque{},
        &models.Loja{},
        &models.Pedido{},
        &models.ProdutoCarrinho{},
        &models.Usuario{},
        &models.Vendedor{},
    )
    if err != nil {
        log.Fatal("Failed to migrate database: ", err)
    }

    log.Println("Database migrated successfully.")
}
