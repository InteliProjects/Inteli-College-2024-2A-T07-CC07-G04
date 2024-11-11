package models
import "fmt"


type Loja struct {
    ID       uint   `gorm:"primaryKey"`
    Nome     string `gorm:"size:255;not null"`
    Endereco string `gorm:"size:255;not null"`
}


func (Loja) TableName() string {
    return "lojas" // Nome da tabela no banco de dados
}

func (l *Loja) ToMap() map[string]interface{} {
    return map[string]interface{}{
        "id":       l.ID,
        "nome":     l.Nome,
        "endereco": l.Endereco,
    }
}

func (l *Loja) String() string {
    return fmt.Sprintf("<Loja %s>", l.Nome)
}
