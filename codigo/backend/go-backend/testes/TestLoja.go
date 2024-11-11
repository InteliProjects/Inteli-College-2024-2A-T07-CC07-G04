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

func TestCreateLoja(t *testing.T) {
    // Configurando o Gin para testes
    router := gin.Default()
    RegisterLojaRoutes(router)

    // Dados da nova loja
    novaLoja := models.Loja{
        Nome:    "Loja Teste",
        Endereco: "Rua Teste, 123",
    }

    // Transformando os dados em JSON
    jsonData, _ := json.Marshal(novaLoja)

    // Criando a requisição POST
    req, _ := http.NewRequest("POST", "/lojas", bytes.NewBuffer(jsonData))
    req.Header.Set("Content-Type", "application/json")

    // Gravando a resposta
    recorder := httptest.NewRecorder()
    router.ServeHTTP(recorder, req)

    // Validando se a loja foi criada
    assert.Equal(t, http.StatusCreated, recorder.Code)
}

func TestDeleteLoja(t *testing.T) {
    // Configurando o Gin para testes
    router := gin.Default()
    RegisterLojaRoutes(router)

    // Inserindo uma loja no banco para ser deletada
    loja := models.Loja{
        Nome:    "Loja a Deletar",
        Endereco: "Rua Excluir, 123",
    }
    db.DB.Create(&loja)

    // Criando a requisição DELETE
    req, _ := http.NewRequest("DELETE", "/lojas/"+string(loja.ID), nil)

    // Gravando a resposta
    recorder := httptest.NewRecorder()
    router.ServeHTTP(recorder, req)

    // Validando se a loja foi deletada
    assert.Equal(t, http.StatusOK, recorder.Code)
}

func TestGetLojas(t *testing.T) {
    // Configurando o Gin para testes
    router := gin.Default()
    RegisterLojaRoutes(router)

    // Criando a requisição GET
    req, _ := http.NewRequest("GET", "/lojas", nil)

    // Gravando a resposta
    recorder := httptest.NewRecorder()
    router.ServeHTTP(recorder, req)

    // Validando se retorna a lista de lojas
    assert.Equal(t, http.StatusOK, recorder.Code)
    assert.Contains(t, recorder.Body.String(), "Loja")
}
