package models

type Usuario struct {
    ID        uint   `gorm:"primaryKey"`
    Endereco  string `gorm:"type:varchar(255);not null"`
    TipoUser  string `gorm:"type:varchar(50);not null"`
    Email     string `gorm:"type:varchar(255);not null"`
    Senha     string `gorm:"type:varchar(255);not null"`
}


func (Usuario) TableName() string {
    return "usuarios" // Nome da tabela no banco de dados
}

func (u *Usuario) ToMap() map[string]interface{} {
    return map[string]interface{}{
        "id":       u.ID,
        "endereco": u.Endereco,
        "tipouser": u.TipoUser,
        "email":    u.Email,
        "senha":    u.Senha,
    }
}

func (u *Usuario) String() string {
    return "<Usuario " + u.Email + ">"
}
