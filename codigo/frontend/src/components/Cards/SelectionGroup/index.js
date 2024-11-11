import { useState, useEffect, useRef } from "react";
import { Container, Textos, Menu, MenuItem } from "./styles.js";
import { FaChevronDown } from "react-icons/fa";

export default function SelectionGroup({ titulo, valor }) {
    // Estado para controlar se o menu está aberto ou fechado
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Referência para o container do componente
    const containerRef = useRef(null);

    // Função para alternar o estado do menu (abrir ou fechar)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Função para fechar o menu quando clicar fora do componente
    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    // Adiciona e remove o event listener para cliques fora do componente
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Container ref={containerRef} onClick={toggleMenu}>
            {/* Exibe o título e o valor */}
            <Textos>
                <pt>
                    {titulo}
                </pt>
                <pp>
                    {valor}
                </pp>
            </Textos>
            {/* Ícone de seta para baixo */}
            <FaChevronDown color="#B3B3B3"/>
            {/* Condicionalmente exibe o menu quando isMenuOpen é true */}
            {isMenuOpen && (
                <Menu>
                    <MenuItem>Opção 1</MenuItem>
                    <MenuItem>Opção 2</MenuItem>
                    <MenuItem>Opção 3</MenuItem>
                </Menu>
            )}
        </Container>
    );
}
