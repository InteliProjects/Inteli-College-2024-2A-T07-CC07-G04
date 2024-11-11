import React, { useState } from 'react';
import { Modal, Button, Input } from 'reactstrap';
import styled from 'styled-components';
import CONFIG from "../../config/config.js";

const StyledModal = styled(Modal)`
    .modal-dialog {
        z-index: 1050; /* Valor alto para garantir que esteja à frente */
        position: absolute;
        top: 0; /* Centraliza verticalmente */
        left: 0; /* Centraliza horizontalmente */
        max-width: 500px; /* Define a largura máxima do modal */
        width: 100%; /* Largura responsiva */
    }

    .modal-header {
        background-color: #007bff;
        color: white;
    }

    .modal-body {
        padding: 20px;
    }

    .modal-title {
        font-size: 1.5rem;
        font-weight: bold;
    }

    button.close {
        color: white;
    }
`;

const AddLojaModal = ({ isOpen, toggle, onAdd }) => {
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newLoja = { nome, endereco };

        try {
            const response = await fetch(`${CONFIG.backendUrl}/lojas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newLoja),
            });
            if (!response.ok) {
                throw new Error('Erro ao adicionar loja');
            }
            const data = await response.json();
            onAdd(data); 
            toggle(); 
            setNome(''); 
            setEndereco('');
        } catch (error) {
            console.error('Erro ao adicionar loja:', error);
        }
    };

    return (
        <StyledModal isOpen={isOpen} toggle={toggle}>
            <div className="modal-header">
                <h5 className="modal-title">Adicionar Loja</h5>
                <button type="button" className="close" onClick={toggle}>
                    <span>&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Nome da Loja"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        style={{ marginBottom: '10px' }}
                    />
                    <Input
                        type="text"
                        placeholder="Endereço da Loja"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        required
                        style={{ marginBottom: '20px' }}
                    />
                    <Button type="submit" color="primary">Adicionar</Button>
                </form>
            </div>
        </StyledModal>
    );
};

export default AddLojaModal;
