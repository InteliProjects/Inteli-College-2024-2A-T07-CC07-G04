package routes

import (
    "net/http"
    "go-backend/models"
    "go-backend/db"
    "github.com/gin-gonic/gin"
)

func RegisterUsuarioRoutes(router *gin.Engine) {
    router.GET("/usuarios", getUsuarios)
    router.GET("/usuarios/:id", getUsuario)
    router.POST("/usuarios", createUsuario)
    router.PATCH("/usuarios/:id", updateUsuario)
    router.DELETE("/usuarios/:id", deleteUsuario)
}

func getUsuarios(c *gin.Context) {
    var usuarios []models.Usuario
    if err := db.DB.Find(&usuarios).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao buscar usuários"})
        return
    }
    c.JSON(http.StatusOK, usuariosToMap(usuarios))
}

func getUsuario(c *gin.Context) {
    var usuario models.Usuario
    id := c.Param("id")
    if err := db.DB.First(&usuario, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Usuário não encontrado"})
        return
    }
    c.JSON(http.StatusOK, usuario.ToMap())
}

func createUsuario(c *gin.Context) {
    var usuario models.Usuario
    if err := c.ShouldBindJSON(&usuario); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Dados inválidos"})
        return
    }
    if err := db.DB.Create(&usuario).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao criar usuário"})
        return
    }
    c.JSON(http.StatusCreated, usuario.ToMap())
}

func updateUsuario(c *gin.Context) {
    var usuario models.Usuario
    id := c.Param("id")
    if err := db.DB.First(&usuario, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Usuário não encontrado"})
        return
    }

    var data map[string]interface{}
    if err := c.ShouldBindJSON(&data); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Dados inválidos"})
        return
    }

    if err := db.DB.Model(&usuario).Updates(data).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao atualizar usuário"})
        return
    }

    c.JSON(http.StatusOK, usuario.ToMap())
}

func deleteUsuario(c *gin.Context) {
    var usuario models.Usuario
    id := c.Param("id")
    if err := db.DB.First(&usuario, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"message": "Usuário não encontrado"})
        return
    }

    if err := db.DB.Delete(&usuario).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao excluir usuário"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Usuário excluído"})
}

func usuariosToMap(usuarios []models.Usuario) []map[string]interface{} {
    result := make([]map[string]interface{}, len(usuarios))
    for i, usuario := range usuarios {
        result[i] = usuario.ToMap()
    }
    return result
}
