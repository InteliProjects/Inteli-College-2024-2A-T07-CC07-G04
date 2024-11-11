package routes

import (
    "net/http"
    "go-backend/models"
    "go-backend/db"
    "github.com/gin-gonic/gin"
)

func RegisterProdutoCarrinhoRoutes(router *gin.Engine) {
    router.GET("/produtos_carrinho", getProdutosCarrinho)
    router.GET("/produtos_carrinho/:carrinho_id/:produto_id", getProdutoCarrinho)
    router.POST("/produtos_carrinho", createProdutoCarrinho)
    router.PATCH("/produtos_carrinho/:carrinho_id/:produto_id", updateProdutoCarrinho)
    router.DELETE("/produtos_carrinho/:carrinho_id/:produto_id", deleteProdutoCarrinho)
}

func getProdutosCarrinho(c *gin.Context) {
    var produtosCarrinho []models.ProdutoCarrinho
    if err := db.DB.Find(&produtosCarrinho).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao buscar produtos no carrinho"})
        return
    }
    c.JSON(http.StatusOK, produtosCarrinhoToMap(produtosCarrinho))
}

func getProdutoCarrinho(c *gin.Context) {
    var produtoCarrinho models.ProdutoCarrinho
    carrinhoID := c.Param("carrinho_id")
    produtoID := c.Param("produto_id")
    if err := db.DB.Where("carrinho_id = ? AND produto_id = ?", carrinhoID, produtoID).First(&produtoCarrinho).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Produto no carrinho não encontrado"})
        return
    }
    c.JSON(http.StatusOK, produtoCarrinho.ToMap())
}

func createProdutoCarrinho(c *gin.Context) {
    var produtoCarrinho models.ProdutoCarrinho
    if err := c.ShouldBindJSON(&produtoCarrinho); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Dados inválidos"})
        return
    }
    if err := db.DB.Create(&produtoCarrinho).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao criar produto no carrinho"})
        return
    }
    c.JSON(http.StatusCreated, produtoCarrinho.ToMap())
}

func updateProdutoCarrinho(c *gin.Context) {
    var produtoCarrinho models.ProdutoCarrinho
    carrinhoID := c.Param("carrinho_id")
    produtoID := c.Param("produto_id")
    if err := db.DB.Where("carrinho_id = ? AND produto_id = ?", carrinhoID, produtoID).First(&produtoCarrinho).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Produto no carrinho não encontrado"})
        return
    }

    var data map[string]interface{}
    if err := c.ShouldBindJSON(&data); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Dados inválidos"})
        return
    }

    if err := db.DB.Model(&produtoCarrinho).Updates(data).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao atualizar produto no carrinho"})
        return
    }

    c.JSON(http.StatusOK, produtoCarrinho.ToMap())
}

func deleteProdutoCarrinho(c *gin.Context) {
    var produtoCarrinho models.ProdutoCarrinho
    carrinhoID := c.Param("carrinho_id")
    produtoID := c.Param("produto_id")
    if err := db.DB.Where("carrinho_id = ? AND produto_id = ?", carrinhoID, produtoID).First(&produtoCarrinho).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Produto no carrinho não encontrado"})
        return
    }

    if err := db.DB.Delete(&produtoCarrinho).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao excluir produto no carrinho"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Produto no carrinho excluído"})
}

func produtosCarrinhoToMap(produtosCarrinho []models.ProdutoCarrinho) []map[string]interface{} {
    result := make([]map[string]interface{}, len(produtosCarrinho))
    for i, produtoCarrinho := range produtosCarrinho {
        result[i] = produtoCarrinho.ToMap()
    }
    return result
}
