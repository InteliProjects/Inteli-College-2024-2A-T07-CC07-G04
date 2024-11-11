import { useState } from "react";
import { ProductImage, ItemCarrinho, QuantityControls } from "./styles.js";
import CONFIG from "../../config/config.js"; // Importa a URL do backend

const updateCartItem = async (carrinho_id, produto_id, quantidade) => {
    try {
        if (quantidade > 0) {
            const response = await fetch(`${CONFIG.backendUrl}/produtos_carrinho/${carrinho_id}/${produto_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantidade }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } else {
            const response = await fetch(`${CONFIG.backendUrl}/produtos_carrinho/${carrinho_id}/${produto_id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return { quantidade: 0 };
        }
    } catch (error) {
        console.error('Houve um problema com a requisição:', error);
        return { quantidade: 0 }; 
    }
};

export default function CartItem({ item, onQuantityChange }) {
    const [quantity, setQuantity] = useState(item?.quantidade || 0);

    // Incrementa a quantidade do item no carrinho
    const handleIncrement = async () => {
        try {
            const updatedItem = await updateCartItem(item.carrinho_id, item.produto_id, quantity + 1);
            setQuantity(updatedItem.quantidade || quantity); 
            onQuantityChange({ ...item, quantidade: updatedItem.quantidade || quantity });
        } catch (error) {
            console.error('Houve um problema com a atualização do item:', error);
        }
    };

    // Decrementa a quantidade do item no carrinho
    const handleDecrement = async () => {
        try {
            const newQuantity = quantity - 1;
            const updatedItem = await updateCartItem(item.carrinho_id, item.produto_id, newQuantity);
            if (newQuantity <= 0) {
                setQuantity(0);
            } else {
                setQuantity(updatedItem.quantidade || newQuantity); 
            }
            onQuantityChange({ ...item, quantidade: updatedItem.quantidade || newQuantity });
        } catch (error) {
            console.error('Houve um problema com a atualização do item:', error);
        }
    };

    if (!item) {
        return <div>Item não encontrado</div>; 
    }

    // Calcula o valor total do item no carrinho
    const totalValue = item.product?.preco * quantity;

    return (
        <ItemCarrinho>
            <ProductImage>
                <img src={item.product?.url} alt={item.product?.descricao} />
            </ProductImage>
            <div>
                <div>{item.product?.descricao}</div>
                <div>
                    <QuantityControls>
                        <button onClick={handleDecrement} disabled={quantity <= 0}>-</button>
                        <span>{quantity}</span>
                        <button onClick={handleIncrement}>+</button>
                    </QuantityControls>
                    <span>Preço unitário: {item.product?.preco}</span>
                    <span>Valor total: {totalValue.toFixed(2)}</span> 
                </div>
            </div>
        </ItemCarrinho>
    );
}
