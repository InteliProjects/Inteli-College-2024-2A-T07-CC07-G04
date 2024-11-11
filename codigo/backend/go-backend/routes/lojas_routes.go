package routes

import (
    "net/http"
    "go-backend/models"
    "go-backend/db"
    "github.com/gin-gonic/gin"
)

func RegisterLojaRoutes(router *gin.Engine) {
    router.GET("/lojas", getLojas)
    router.GET("/lojas/:id", getLoja)
    router.POST("/lojas", createLoja)
    router.PATCH("/lojas/:id", updateLoja)
    router.DELETE("/lojas/:id", deleteLoja)
}

func getLojas(c *gin.Context) {
    var lojas []models.Loja
    if err := db.DB.Find(&lojas).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao buscar lojas"})
        return
    }
    c.JSON(http.StatusOK, lojasToMap(lojas))
}

func getLoja(c *gin.Context) {
    var loja models.Loja
    id := c.Param("id")
    if err := db.DB.First(&loja, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Loja não encontrada"})
        return
    }
    c.JSON(http.StatusOK, loja.ToMap())
}

func createLoja(c *gin.Context) {
    var loja models.Loja
    if err := c.ShouldBindJSON(&loja); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Dados inválidos"})
        return
    }
    if err := db.DB.Create(&loja).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao criar loja"})
        return
    }
    c.JSON(http.StatusCreated, loja.ToMap())
}

func updateLoja(c *gin.Context) {
    var loja models.Loja
    id := c.Param("id")
    if err := db.DB.First(&loja, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Loja não encontrada"})
        return
    }

    var data map[string]interface{}
    if err := c.ShouldBindJSON(&data); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Dados inválidos"})
        return
    }

    if err := db.DB.Model(&loja).Updates(data).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao atualizar loja"})
        return
    }

    c.JSON(http.StatusOK, loja.ToMap())
}

func deleteLoja(c *gin.Context) {
    var loja models.Loja
    id := c.Param("id")
    if err := db.DB.First(&loja, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Loja não encontrada"})
        return
    }

    if err := db.DB.Delete(&loja).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao excluir loja"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Loja excluída"})
}

func lojasToMap(lojas []models.Loja) []map[string]interface{} {
    result := make([]map[string]interface{}, len(lojas))
    for i, loja := range lojas {
        result[i] = loja.ToMap()
    }
    return result
}
