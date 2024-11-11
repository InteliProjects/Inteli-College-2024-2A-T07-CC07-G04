import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard, StyledCarousel } from "./styles";
import CONFIG from "../../config/config.js"; // Importa a URL do backend
import SkeletonCard from "../Cards/Skeleton/SkeletonCard.js"; // Importa o esqueleto

export default function CarouselComponent() {
    // Estado para armazenar a lista de produtos
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para gerenciar o carregamento
    const navigate = useNavigate();

    useEffect(() => {
        // Função para buscar os produtos da API
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${CONFIG.backendUrl}/produtos`); // Usa a URL do backend
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setProducts(data); // Atualiza o estado com os produtos recebidos
                setLoading(false); // Define o carregamento como concluído
            } catch (error) {
                console.error("Houve um problema com a requisição:", error);
                setLoading(false); // Define o carregamento como concluído, mesmo em caso de erro
            }
        };

        fetchProducts(); // Chama a função para buscar os produtos
    }, []); // O array vazio indica que o efeito será executado apenas uma vez, após a montagem do componente

    // Função para navegar para a página de detalhes do produto
    const handleBuyClick = (id) => {
        navigate(`/produto/${id}`);
    };

    return (
        <StyledCarousel
            showArrows={true} // Exibe as setas de navegação
            showThumbs={false} // Oculta as miniaturas dos slides
            infiniteLoop={true} // Permite rotação infinita dos slides
            autoPlay={false} // Desativa a reprodução automática
            interval={3000} // Intervalo de tempo para transição entre slides
            showStatus={false} // Oculta o status do carrossel
            centerMode={true} // Ativa o modo centralizado
            centerSlidePercentage={23} // Percentual da largura do slide centralizado
            selectedItem={0.45} // Item selecionado (deve ser um índice inteiro)
        >
            {loading ? (
                // Exibe o esqueleto enquanto os dados estão sendo carregados
                Array.from({ length: 5 }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))
            ) : (
                // Exibe os produtos após o carregamento
                products.map((product, index) => (
                    <ProductCard key={index}>
                        <img src={product.url} alt={product.descricao} />
                        <div>
                            <sep></sep>
                            <h2>
                                {/* Formata o preço do produto para o formato de moeda BRL */}
                                {parseFloat(product.preco).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </h2>
                            <p>{product.descricao}</p>
                            <button onClick={() => handleBuyClick(product.id)}>
                                COMPRAR
                            </button>
                        </div>
                    </ProductCard>
                ))
            )}
        </StyledCarousel>
    );
}
