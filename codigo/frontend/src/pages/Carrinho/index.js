import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../../components/Header";
import { Container, TitleShoppingContent } from "./styles.js";
import CartItem from "./CartItem";
import CONFIG from "../../config/config.js"; // Importa a URL do backend


// Função para buscar itens do carrinho
const fetchCartItems = async () => {
    try {
        const response = await fetch(`${CONFIG.backendUrl}/produtos_carrinho`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Houve um problema com a requisição:', error);
        return [];
    }
};

// Função para buscar detalhes de um produto pelo ID
const fetchProductById = async (productId) => {
    try {
        const response = await fetch(`${CONFIG.backendUrl}/produtos/${productId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Houve um problema com a requisição:', error);
        return null;
    }
};

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

export default function Carrinho() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate(); 

    // Carrega os itens do carrinho e detalhes dos produtos
    const loadCartItems = async () => {
        const cartData = await fetchCartItems();
        const itemsWithDetails = await Promise.all(
            cartData.map(async (item) => {
                const product = await fetchProductById(item.produto_id);
                return {
                    ...item,
                    product
                };
            })
        );
        setCartItems(itemsWithDetails);
    };

    useEffect(() => {
        loadCartItems();
    }, []);

    // Atualiza a quantidade do item no carrinho
    const handleQuantityChange = async (updatedItem) => {
        const updatedCartItems = cartItems.map(item => 
            item.carrinho_id === updatedItem.carrinho_id ? updatedItem : item
        );
        setCartItems(updatedCartItems);
    };

    // Finaliza o pedido e redireciona para a página de pedidos
    const handleFinalizeOrder = async () => {
        const pedidos = await fetchPedidos();
        const maxId = pedidos.length > 0 ? Math.max(...pedidos.map(p => p.id)) : 0;
        const novoId = maxId + 1;

        const novoPedido = {
            id: novoId,
            loja_id: 1,
            produto_id: cartItems[0]?.product?.id,
            status: "Pendente",
            vendedor_id: 1
        };

        try {
            const response = await fetch(`${CONFIG.backendUrl}/pedidos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoPedido),
            });

            if (response.ok) {
                navigate('/pedidos');
            } else {
                console.error('Falha ao criar o pedido');
            }
        } catch (error) {
            console.error('Houve um problema ao criar o pedido:', error);
        }
    };

    const [subtotal, setSubtotal] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    // Calcula subtotal e total de itens sempre que o carrinho muda
    useEffect(() => {
        const newSubtotal = cartItems.reduce((total, item) => total + (item.product?.preco * item.quantidade || 0), 0);
        const newTotalItems = cartItems.reduce((total, item) => total + item.quantidade, 0);
        setSubtotal(newSubtotal);
        setTotalItems(newTotalItems);
    }, [cartItems]);

    return (
        <Container>
            <Header />
            <TitleShoppingContent>Carrinho</TitleShoppingContent>
            <div>
                <div>
                    {/* Exibe cada item do carrinho */}
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.carrinho_id}
                            item={item}
                            onQuantityChange={handleQuantityChange}
                        />
                    ))}
                </div>
                <div>
                    <p>Subtotal ({totalItems} produtos)</p>
                    <p>{subtotal.toFixed(2)} reais</p>
                    <div>
                        <button onClick={handleFinalizeOrder}>Finalizar pedido</button>
                    </div>
                </div>
            </div>
        </Container>
    );
}
