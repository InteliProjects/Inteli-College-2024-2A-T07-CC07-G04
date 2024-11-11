package models

import "fmt"


type ProdutoCarrinho struct {
    CarrinhoID uint   `gorm:"primaryKey"`
    ProdutoID  uint   `gorm:"primaryKey"`
    Quantidade int    `gorm:"not null"`
    Produto    Produto `gorm:"foreignKey:ProdutoID"`
}


func (ProdutoCarrinho) TableName() string {
    return "produtoscarrinhos"
}

func (pc *ProdutoCarrinho) ToMap() map[string]interface{} {
    return map[string]interface{}{
        "carrinho_id": pc.CarrinhoID,
        "produto_id":  pc.ProdutoID,
        "quantidade":  pc.Quantidade,
    }
}

func (pc *ProdutoCarrinho) String() string {
    return "<ProdutoCarrinho " + fmt.Sprintf("%d-%d", pc.CarrinhoID, pc.ProdutoID) + ">"
}
