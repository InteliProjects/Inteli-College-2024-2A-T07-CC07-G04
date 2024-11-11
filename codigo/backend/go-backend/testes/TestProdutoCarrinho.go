package tests

import (
    "bytes"
    "encoding/json"
    "net/http"
    "net/http/httptest"
    "testing"
    "go-backend/models"
    "go-backend/db"
    "github.com/gin-gonic/gin"
    "github.com/stretchr/testify/assert"
)

func TestCreateProdutoCarrinho(t *testing.T) {
    router := gin.Default()
    RegisterProdutoCarrinhoRoutes(router)

    novoProdutoCarrinho := models.ProdutoCarrinho{
        CarrinhoID: "1",
        ProdutoID:  "1",
        Quantidade: 2,
    }

    jsonData, _ := json.Marshal(novoProdutoCarrinho)

    req, _ := http.NewRequest("POST", "/produtos_carrinho", bytes.NewBuffer(jsonData))
    req.Header.Set("Content-Type", "application/json")

    recorder := httptest.NewRecorder()
    router.ServeHTTP(recorder, req)

    assert.Equal(t, http.StatusCreated, recorder.Code)
}

func TestDeleteProdutoCarrinho(t *testing.T) {
    router := gin.Default()
    RegisterProdutoCarrinhoRoutes(router)

    produtoCarrinho := models.ProdutoCarrinho{
        CarrinhoID: "1",
        ProdutoID:  "1",
        Quantidade: 1,
    }
    db.DB.Create(&produtoCarrinho)

    req, _ := http.NewRequest("DELETE", "/produtos_carrinho/1/1", nil)

    recorder := httptest.NewRecorder()
    router.ServeHTTP(recorder, req)

    assert.Equal(t, http.StatusOK, recorder.Code)
}

func TestGetProdutosCarrinho(t *testing.T) {
    router := gin.Default()
    RegisterProdutoCarrinhoRoutes(router)

    req, _ := http.NewRequest("GET", "/produtos_carrinho", nil)

    recorder := httptest.NewRecorder()
    router.ServeHTTP(recorder, req)

    assert.Equal(t, http.StatusOK, recorder.Code)
    assert.Contains(t, recorder.Body.String(), "CarrinhoID")
}

func TestUpdateProdutoCarrinho(t *testing.T) {
    router := gin.Default()
    RegisterProdutoCarrinhoRoutes(router)

    produtoCarrinho := models.ProdutoCarrinho{
        CarrinhoID: "1",
        ProdutoID:  "1",
        Quantidade: 2,
    }
    db.DB.Create(&produtoCarrinho)

    updates := map[string]interface{}{
        "Quantidade": 3,
    }
    jsonData, _ := json.Marshal(updates)

    req, _ := http.NewRequest("PATCH", "/produtos_carrinho/1/1", bytes.NewBuffer(jsonData))
    req.Header.Set("Content-Type", "application/json")

    recorder := httptest.NewRecorder()
    router.ServeHTTP(recorder, req)

    assert.Equal(t, http.StatusOK, recorder.Code)
    assert.Contains(t, recorder.Body.String(), `"Quantidade":3`)
}
