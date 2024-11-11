package routes

import (
    "net/http"
    "go-backend/models"
    "go-backend/db"
    "github.com/gin-gonic/gin"
)

func RegisterPedidoRoutes(router *gin.Engine) {
    router.GET("/pedidos", getPedidos)
    router.GET("/pedidos/:id", getPedido)
    router.POST("/pedidos", createPedido)
    router.PATCH("/pedidos/:id", updatePedido)
    router.DELETE("/pedidos/:id", deletePedido)
}

func getPedidos(c *gin.Context) {
    var pedidos []models.Pedido
    if err := db.DB.Find(&pedidos).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao buscar pedidos"})
        return
    }
    c.JSON(http.StatusOK, pedidosToMap(pedidos))
}

func getPedido(c *gin.Context) {
    var pedido models.Pedido
    id := c.Param("id")
    if err := db.DB.First(&pedido, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Pedido não encontrado"})
        return
    }
    c.JSON(http.StatusOK, pedido.ToMap())
}

func createPedido(c *gin.Context) {
    var pedido models.Pedido
    if err := c.ShouldBindJSON(&pedido); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Dados inválidos"})
        return
    }
    if err := db.DB.Create(&pedido).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao criar pedido"})
        return
    }
    c.JSON(http.StatusCreated, pedido.ToMap())
}

func updatePedido(c *gin.Context) {
    var pedido models.Pedido
    id := c.Param("id")
    if err := db.DB.First(&pedido, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Pedido não encontrado"})
        return
    }

    var data map[string]interface{}
    if err := c.ShouldBindJSON(&data); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Dados inválidos"})
        return
    }

    if err := db.DB.Model(&pedido).Updates(data).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao atualizar pedido"})
        return
    }

    c.JSON(http.StatusOK, pedido.ToMap())
}

func deletePedido(c *gin.Context) {
    var pedido models.Pedido
    id := c.Param("id")
    if err := db.DB.First(&pedido, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Pedido não encontrado"})
        return
    }

    if err := db.DB.Delete(&pedido).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao excluir pedido"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Pedido excluído"})
}

func pedidosToMap(pedidos []models.Pedido) []map[string]interface{} {
    result := make([]map[string]interface{}, len(pedidos))
    for i, pedido := range pedidos {
        result[i] = pedido.ToMap()
    }
    return result
}
