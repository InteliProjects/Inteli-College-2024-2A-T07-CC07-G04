package routes

import (
    "encoding/json"
    "fmt"
    "net/http"
    "go-backend/models"
    "go-backend/db"
    "github.com/gin-gonic/gin"
)

func RegisterVendedorRoutes(router *gin.Engine) {
    router.GET("/vendedores", getVendedores)
    router.GET("/vendedores/:id", getVendedor)
    router.POST("/vendedores", createVendedor)
    router.PATCH("/vendedores/:id", updateVendedor)
    router.DELETE("/vendedores/:id", deleteVendedor)
}

func getVendedores(c *gin.Context) {
    var vendedores []models.Vendedor
    if err := db.DB.Find(&vendedores).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao buscar vendedores"})
        return
    }
    c.JSON(http.StatusOK, vendedoresToMap(vendedores))
}

func getVendedor(c *gin.Context) {
    var vendedor models.Vendedor
    id := c.Param("id")
    if err := db.DB.First(&vendedor, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Vendedor não encontrado"})
        return
    }
    c.JSON(http.StatusOK, vendedor.ToMap())
}

func createVendedor(c *gin.Context) { var vendedor models.Vendedor
    
    // Recebe o JSON e faz o bind
    if err := c.ShouldBindJSON(&vendedor); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Dados inválidos"})
        return
    }

    // Converte o JSON recebido para uma string
    vendedorJSON, err := json.Marshal(vendedor)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao converter vendedor para JSON"})
        return
    }

    // Imprime o JSON recebido
    fmt.Printf("Recebido JSON: %s\n", vendedorJSON)

    // Tenta criar o vendedor no banco de dados
    if err := db.DB.Create(&vendedor).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao criar vendedor"})
        return
    }

    // Retorna o vendedor criado como resposta
    c.JSON(http.StatusCreated, vendedor.ToMap())
}

func updateVendedor(c *gin.Context) {
    var vendedor models.Vendedor
    id := c.Param("id")
    if err := db.DB.First(&vendedor, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Vendedor não encontrado"})
        return
    }

    var data map[string]interface{}
    if err := c.ShouldBindJSON(&data); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Dados inválidos"})
        return
    }

    if err := db.DB.Model(&vendedor).Updates(data).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao atualizar vendedor"})
        return
    }

    c.JSON(http.StatusOK, vendedor.ToMap())
}

func deleteVendedor(c *gin.Context) {
    var vendedor models.Vendedor
    id := c.Param("id")
    if err := db.DB.First(&vendedor, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Vendedor não encontrado"})
        return
    }

    if err := db.DB.Delete(&vendedor).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao excluir vendedor"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Vendedor excluído"})
}

func vendedoresToMap(vendedores []models.Vendedor) []map[string]interface{} {
    result := make([]map[string]interface{}, len(vendedores))
    for i, vendedor := range vendedores {
        result[i] = vendedor.ToMap()
    }
    return result
}
