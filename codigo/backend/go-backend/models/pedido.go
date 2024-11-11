package models

import "fmt"


type Pedido struct {
    ID         uint    `gorm:"primaryKey"`
    ProdutoID  uint    `gorm:"not null"`
    LojaID     uint    `gorm:"not null"`
    Status     string  `gorm:"size:50;not null"`
    VendedorID uint    `gorm:"not null"`

    Produto  Produto  `gorm:"foreignKey:ProdutoID;references:ID"`
    Loja     Loja     `gorm:"foreignKey:LojaID;references:ID"`
    Vendedor Vendedor `gorm:"foreignKey:VendedorID;references:ID"`
}

func (Pedido) TableName() string {
    return "pedidos"
}

func (p *Pedido) ToMap() map[string]interface{} {
    return map[string]interface{}{
        "id":          p.ID,
        "produto_id":  p.ProdutoID,
        "loja_id":     p.LojaID,
        "status":      p.Status,
        "vendedor_id": p.VendedorID,
    }
}

func (p *Pedido) String() string {
    return fmt.Sprintf("<Pedido %d>", p.ID)
}
