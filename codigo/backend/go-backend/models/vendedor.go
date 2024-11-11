package models



type Vendedor struct {
    ID        uint   `gorm:"primaryKey"`
    Nome      string `gorm:"type:varchar(255);not null"`
    Afiliacao string `gorm:"type:varchar(255);not null"`
    LojaID    uint   `gorm:"not null"`
    Loja      Loja   `gorm:"foreignKey:LojaID"`
}

func (Vendedor) TableName() string {
    return "vendedor"
}

func (v *Vendedor) ToMap() map[string]interface{} {
    return map[string]interface{}{
        "id":        v.ID,
        "nome":      v.Nome,
        "afiliacao": v.Afiliacao,
        "loja_id":   v.LojaID,
    }
}

func (v *Vendedor) String() string {
    return "<Vendedor " + v.Nome + ">"
}
