package models

import "fmt"


type Produto struct {
    ID           uint    `gorm:"primaryKey"`
    URL          string  `gorm:"type:varchar(255)"`
    Descricao    string  `gorm:"type:text"`
    Especificacao string `gorm:"type:text"`
    Preco        float64 `gorm:"type:numeric(10,2)"`
}


func (Produto) TableName() string {
    return "produtos" // Nome da tabela no banco de dados
}

func (p *Produto) ToMap() map[string]interface{} {
    return map[string]interface{}{
        "id":           p.ID,
        "url":          p.URL,
        "descricao":    p.Descricao,
        "especificacao": p.Especificacao,
        "preco":        fmt.Sprintf("%.2f", p.Preco),  // Convert to string for JSON serialization
    }
}

func (p *Produto) String() string {
    return fmt.Sprintf("<Produto %d>", p.ID)
}
