import React, { useState } from "react";
import { IoCartOutline, IoPersonOutline } from "react-icons/io5";
import { GrHistory } from "react-icons/gr";
import { LuWarehouse } from "react-icons/lu"; // Ícone para o admin
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import { StyledHeader, HeaderControls, IconsContainer } from "./styles";
import PerfilPopup from "../Popup/PerfilPopup.js";

// Componente para exibir o logotipo da empresa
const LogoImg = () => (
    <Link to="/">
        <img
            src="https://api.store.vivo.com.br/medias/Vivo-Vivinho-RGB-H-2020V1.png?context=bWFzdGVyfHJvb3R8MTM1Njh8aW1hZ2UvcG5nfGFEY3dMMmcyWlM4NE9UTTNNekl6T0RnNE5qY3dMMVpwZG04clZtbDJhVzVvYjE5U1IwSmZTRjh5TURJd1ZqRXVjRzVufDZjMzJlYTNhMGU1NjgyYTIxZDU0ZDVlZWQ3N2U3ZGY4MjY5NjdjN2NjNDdmYjg0NGY2MjE3MTFmYTE2MTQ3YzI"
            width="100dvw" 
            alt="Logo"     
        />
    </Link>
);

export default function Header() {
    // Estado para controlar a visibilidade do popup de perfil
    const [isPopupVisible, setPopupVisible] = useState(false);

    // Obtém o tipo de usuário armazenado no localStorage
    const userType = localStorage.getItem('userType');

    // Função para alternar a visibilidade do popup
    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    // Lógica para escolher o ícone baseado no tipo de usuário
    const renderCartIcon = () => {
        if (userType == 'loja') {
            return (
                <Link to="/loja/produtos">
                    <GoPlus size={"4.5dvh"} color="#1f1f1f" />
                </Link>
            );
        } else if (userType == 'admin') {
            return (
                <Link to="/lojas">
                    <LuWarehouse size={"4.5dvh"} color="#1f1f1f" />
                </Link>
            );
        } else {
            return (
                <Link to="/carrinho">
                    <IoCartOutline size={"4.5dvh"} color="#1f1f1f" />
                </Link>
            );
        }
    };

    return (
        <StyledHeader>
            {/* Exibe o logotipo no cabeçalho */}
            <LogoImg />
            <HeaderControls>
                <IconsContainer>
                    {/* Link para a página de pedidos */}
                    <Link to="/pedidos">
                        <GrHistory size={"3.5dvh"} color="#1f1f1f" />
                    </Link>
                    {/* Renderiza o ícone com base no tipo de usuário */}
                    {renderCartIcon()}
                    {/* Ícone de perfil que abre o popup de perfil */}
                    <div>
                        <IoPersonOutline 
                            size={"4dvh"} 
                            color="#1f1f1f" 
                            onClick={togglePopup}
                            style={{ cursor: "pointer" }}
                        />
                        {/* Componente de popup de perfil que é exibido com base no estado de visibilidade */}
                        <PerfilPopup 
                            isVisible={isPopupVisible} 
                            onClose={togglePopup} 
                        />
                    </div>
                </IconsContainer>
            </HeaderControls>
        </StyledHeader>
    );
}
