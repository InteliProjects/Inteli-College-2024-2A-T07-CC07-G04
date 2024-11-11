package routes

import (
    "github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {

    // Registrar rotas de Estoque
    RegisterEstoqueRoutes(router)

    // Registrar rotas de Loja
    RegisterLojaRoutes(router)

    // Registrar rotas de Pedido

    RegisterPedidoRoutes(router)

	// Registrar rotas de produtos

    RegisterProdutoRoutes(router)

	//Resistrar rotas de Carrinho

	RegisterProdutoCarrinhoRoutes(router)

	//Registrar rotas de usuarios

	RegisterUsuarioRoutes(router)

	//Registrar rotas de Vendedores

	RegisterVendedorRoutes(router)

}
