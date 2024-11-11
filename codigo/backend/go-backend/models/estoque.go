package models

import "fmt"


type Estoque struct {
    LojaID    uint    `gorm:"primaryKey"`
    ProdutoID uint    `gorm:"primaryKey"`
    Quantidade int     `gorm:"not null"`
    Preco     float64 `gorm:"type:decimal(10,2);not null"`
    Loja      Loja    `gorm:"foreignKey:LojaID;references:ID"`
    Produto   Produto `gorm:"foreignKey:ProdutoID;references:ID"`
}


func (Estoque) TableName() string {
    return "estoques" // Nome da tabela no banco de dados
}

func (e *Estoque) ToMap() map[string]interface{} {
    return map[string]interface{}{
        "loja_id":    e.LojaID,
        "produto_id": e.ProdutoID,
        "quantidade": e.Quantidade,
        "preco":      e.Preco,
    }
}

func (e *Estoque) String() string {
    return fmt.Sprintf("<Estoque %d-%d>", e.LojaID, e.ProdutoID)
}
