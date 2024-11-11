package routes

import (
    "net/http"
    "go-backend/models"
    "go-backend/db"
    "github.com/gin-gonic/gin"
)

func RegisterEstoqueRoutes(router *gin.Engine) {
    router.GET("/estoques", getEstoques)
    router.GET("/estoques/:id", getEstoque)
    router.POST("/estoques", createEstoque)
    router.PATCH("/estoques/:id", updateEstoque)
    router.DELETE("/estoques/:id", deleteEstoque)
}

func getEstoques(c *gin.Context) {
    var estoques []models.Estoque
    if err := db.DB.Find(&estoques).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao buscar estoques"})
        return
    }
    c.JSON(http.StatusOK, estoquesToMap(estoques))
}

func getEstoque(c *gin.Context) {
    var estoque models.Estoque
    id := c.Param("id")
    if err := db.DB.First(&estoque, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Estoque não encontrado"})
        return
    }
    c.JSON(http.StatusOK, estoque.ToMap())
}

func createEstoque(c *gin.Context) {
    var estoque models.Estoque
    if err := c.ShouldBindJSON(&estoque); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Dados inválidos"})
        return
    }
    if err := db.DB.Create(&estoque).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao criar estoque"})
        return
    }
    c.JSON(http.StatusCreated, estoque.ToMap())
}

func updateEstoque(c *gin.Context) {
    var estoque models.Estoque
    id := c.Param("id")
    if err := db.DB.First(& estoque, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Estoque não encontrado"})
        return
    }

    var data map[string]interface{}
    if err := c.ShouldBindJSON(&data); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Dados inválidos"})
        return
    }

    if err := db.DB.Model(&estoque).Updates(data).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao atualizar estoque"})
        return
    }

    c.JSON(http.StatusOK, estoque.ToMap())
}

func deleteEstoque(c *gin.Context) {
    var estoque models.Estoque
    id := c.Param("id")
    if err := db.DB.First(&estoque, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Estoque não encontrado"})
        return
    }

    if err := db.DB.Delete(&estoque).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao excluir estoque"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Estoque excluído"})
}

func estoquesToMap(estoques []models.Estoque) []map[string]interface{} {
    result := make([]map[string]interface{}, len(estoques))
    for i, estoque := range estoques {
        result[i] = estoque.ToMap()
    }
    return result
}
