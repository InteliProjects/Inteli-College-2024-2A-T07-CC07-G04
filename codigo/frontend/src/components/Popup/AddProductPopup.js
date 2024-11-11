import { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import CONFIG from "../../config/config.js"; // Importa a URL do backend

const Container = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 36px;
    background-color: #fff;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > h1 {
        color: #676767;
        text-align: center;
        font-size: 1.5em;
        font-weight: 700;
        margin-bottom: 32px;
    }
`;

const InputWrapper = styled.div`
    width: 80%;
    margin-bottom: 16px;

    label {
        font-size: 1em;
        color: #333;
        margin-bottom: 8px;
        display: block; /* Isso garante que o label fique em uma linha separada */
        text-align: left;
    }

    input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 0.8em;
    }
`;

const CommandDiv = styled.div`
    width: 200px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #dc2972;
    color: #dc2972;
    cursor: pointer;
    transition: all 0.3s ease-out;
    &:hover {
        background-color: #dc2972;
        color: #fff;
    }
`;

export default function AddProductModal({
    modalIsOpen,
    setModalIsOpen,
    setTriggerReload,
}) {
    const [formData, setFormData] = useState({
        url: "",
        descricao: "",
        especificacao: "",
        preco: "",
    });

    async function registerProduct(product) {
        try {
            const response = await fetch(`${CONFIG.backendUrl}/produtos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error("Failed to register product");
            }

            return response.json();
        } catch (err) {
            console.error(err);
            alert("Ocorreu um erro ao adicionar o produto.");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: name === "preco" ? parseFloat(value) : value,
        });
    };

    const handleSubmit = async () => {
        if (
            !formData.url ||
            !formData.descricao ||
            !formData.especificacao ||
            !formData.preco
        ) {
            alert("Todos os campos são obrigatórios.");
            return;
        }

        // Envia os dados para o servidor
        const result = await registerProduct(formData);

        // Se o envio for bem-sucedido, fecha o modal
        if (result) {
            alert("Produto adicionado com sucesso!");
            setFormData((prev) => {
                return {
                    ...prev,
                    url: "",
                    descricao: "",
                    especificacao: "",
                    preco: "",
                };
            });
            setModalIsOpen(false);
            setTriggerReload((prev) => !prev);
        }
    };

    return (
        <Container>
            <InputWrapper>
                <label htmlFor="url">URL</label>
                <input
                    name="url"
                    placeholder="URL do produto"
                    value={formData.url}
                    onChange={handleChange}
                />
            </InputWrapper>

            <InputWrapper>
                <label htmlFor="descricao">Descrição</label>
                <input
                    name="descricao"
                    placeholder="Descrição do produto"
                    value={formData.descricao}
                    onChange={handleChange}
                />
            </InputWrapper>

            <InputWrapper>
                <label htmlFor="especificacao">Especificação</label>
                <input
                    name="especificacao"
                    placeholder="Especificação do produto"
                    value={formData.especificacao}
                    onChange={handleChange}
                />
            </InputWrapper>

            <InputWrapper>
                <label htmlFor="preco">Preço</label>
                <input
                    name="preco"
                    type="number"
                    placeholder="Preço do produto"
                    value={formData.preco}
                    onChange={handleChange}
                />
            </InputWrapper>

            <CommandDiv onClick={handleSubmit}>Adicionar</CommandDiv>
        </Container>
    );
}
