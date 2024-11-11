import { useEffect, useState } from "react";
import { Container, TitleShoppingContent, PedidoContainer, PedidoItem } from "./styles.js";
import Header from "../../components/Header";
import CONFIG from "../../config/config.js"; // Importa a URL do backend

// Função para buscar pedidos
const fetchPedidos = async () => {
    try {
        const response = await fetch(`${CONFIG.backendUrl}/pedidos`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Houve um problema com a requisição:', error);
        return [];
    }
};

// Função para buscar detalhes da loja por ID
const fetchLojaById = async (lojaId) => {
    try {
        const response = await fetch(`${CONFIG.backendUrl}/lojas/${lojaId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Houve um problema com a requisição:', error);
        return null;
    }
};

// Função para buscar detalhes do produto por ID
const fetchProdutoById = async (produtoId) => {
    try {
        const response = await fetch(`${CONFIG.backendUrl}/produtos/${produtoId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Houve um problema com a requisição:', error);
        return null;
    }
};

export default function Pedidos() {
    // Estado para armazenar a lista de pedidos
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        // Função para carregar pedidos e detalhes associados
        const loadPedidos = async () => {
            const pedidosData = await fetchPedidos();

            // Para cada pedido, buscar detalhes da loja e do produto
            const pedidosComDetalhes = await Promise.all(
                pedidosData.map(async (pedido) => {
                    const loja = await fetchLojaById(pedido.loja_id);
                    const produto = await fetchProdutoById(pedido.produto_id);
                    return {
                        ...pedido,
                        lojaNome: loja ? loja.nome : 'Loja não encontrada',
                        lojaCep: loja ? loja.cep : 'CEP não encontrado',
                        produtoDescricao: produto ? produto.descricao : 'Produto não encontrado',
                        produtoPreco: produto ? produto.preco : 'Preço não encontrado',
                    };
                })
            );

            setPedidos(pedidosComDetalhes);
        };

        loadPedidos();
    }, []);

    return (
        <Container>
            <Header />
            <TitleShoppingContent>Seus Pedidos</TitleShoppingContent>
            <div>
                <PedidoContainer>
                    {pedidos.length > 0 ? (
                        pedidos.map(pedido => (
                            <PedidoItem key={pedido.id}>
                                <p>Pedido ID: {pedido.id}</p>
                                <p>Loja: {pedido.lojaNome}</p>
                                <p>CEP da Loja: {pedido.lojaCep}</p>
                                <p>Produto: {pedido.produtoDescricao}</p>
                                <p>Valor: {pedido.produtoPreco} reais</p>
                                <p>Status: {pedido.status}</p>
                                <p>Vendedor ID: {pedido.vendedor_id}</p>
                            </PedidoItem>
                        ))
                    ) : (
                        <p>Você ainda não fez nenhum pedido.</p>
                    )}
                </PedidoContainer>
            </div>
        </Container>
    );
}
