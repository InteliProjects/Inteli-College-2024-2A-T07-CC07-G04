import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const PopupContainer = styled.div`
    width: 20dvw;
    height: 25dvh;
    position: absolute;
    top: 60px;
    right: 10px;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    z-index: 1000;
    padding: 1dvw;
    display: ${(props) => (props.isVisible ? "block" : "none")};
`;

const Button = styled.button`
    height: 8dvh;
    background-color: #DC2972;
    color: white;
    border: none;
    padding: 0.5dvw 1dvw;
    margin: 10px 0;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    font-size: 16px;

    &:hover {
        background-color: #FE1473;
    }
`;

export default function PerfilPopup({ isVisible, onClose }) {
    const navigate = useNavigate();

    // Função para lidar com o logout
    const handleLogout = () => {
        // Remove as informações de autenticação
        localStorage.removeItem('authenticated');
        localStorage.removeItem('userType');

        // Redireciona para a página de login
        navigate('/login');
    };

    return (
        <PopupContainer isVisible={isVisible}>
            <Button>
                <Link to="/perfil" style={{ color: "white", textDecoration: "none" }}>Perfil</Link>
            </Button>
            <Button onClick={handleLogout}>Sair</Button>
        </PopupContainer>
    );
}
