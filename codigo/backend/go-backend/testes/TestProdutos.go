package routes

import (
    "net/http"
    "go-backend/models"
    "go-backend/db"
    "github.com/gin-gonic/gin"
)

func RegisterProdutoRoutes(router *gin.Engine) {
    router.GET("/produtos", getProdutos)
    router.GET("/produtos/:id", getProduto)
    router.POST("/produtos", createProduto)
    router.PATCH("/produtos/:id", updateProduto)
    router.DELETE("/produtos/:id", deleteProduto)
}

func getProdutos(c *gin.Context) {
    var produtos []models.Produto
    if err := db.DB.Find(&produtos).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao buscar produtos"})
        return
    }
    c.JSON(http.StatusOK, produtosToMap(produtos))
}

func getProduto(c *gin.Context) {
    var produto models.Produto
    id := c.Param("id")
    if err := db.DB.First(&produto, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Produto não encontrado"})
        return
    }
    c.JSON(http.StatusOK, produto.ToMap())
}

func createProduto(c *gin.Context) {
    var produto models.Produto
    if err := c.ShouldBindJSON(&produto); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Dados inválidos"})
        return
    }
    if err := db.DB.Create(&produto).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao criar produto"})
        return
    }
    c.JSON(http.StatusCreated, produto.ToMap())
}

func updateProduto(c *gin.Context) {
    var produto models.Produto
    id := c.Param("id")
    if err := db.DB.First(&produto, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Produto não encontrado"})
        return
    }

    var data map[string]interface{}
    if err := c.ShouldBindJSON(&data); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Dados inválidos"})
        return
    }

    if err := db.DB.Model(&produto).Updates(data).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao atualizar produto"})
        return
    }

    c.JSON(http.StatusOK, produto.ToMap())
}

func deleteProduto(c *gin.Context) {
    var produto models.Produto
    id := c.Param("id")
    if err := db.DB.First(&produto, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Produto não encontrado"})
        return
    }

    if err := db.DB.Delete(&produto).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao excluir produto"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Produto excluído"})
}

func produtosToMap(produtos []models.Produto) []map[string]interface{} {
    result := make([]map[string]interface{}, len(produtos))
    for i, produto := range produtos {
        result[i] = produto.ToMap()
    }
    return result
}
