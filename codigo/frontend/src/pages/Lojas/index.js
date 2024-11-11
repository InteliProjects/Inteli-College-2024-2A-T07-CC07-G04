import React, { useState, useEffect } from "react";
import CardLoja from "./CardLoja";
import Header from "../../components/Header/index";
import AddLojaModal from "./AddLojaModal"; 
import { Card, Container, TitleLojas, GridContainer, SearchBar, SearchContainer, SearchIcon, TitleSearchContainer, AddIcon } from "./styles";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import CONFIG from "../../config/config.js";

export default function Lojas() {
    const [loading, setLoading] = useState(true);
    const [lojas, setLojas] = useState([]);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false); // Estado do modal

    const fetchLojas = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${CONFIG.backendUrl}/lojas`);
            if (!response.ok) {
                throw new Error('Could not fetch store information');
            }
            const data = await response.json();
            setLojas(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLojas();
    }, []);

    const handleAddLoja = (newLoja) => {
        setLojas((prev) => [...prev, newLoja]); // Adiciona nova loja à lista
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Container>
            <Header />
            <TitleSearchContainer>
                <TitleLojas>Lojas Cadastradas</TitleLojas>
                <SearchContainer>
                    <SearchBar placeholder="Pesquisar loja" />
                    <SearchIcon icon={faMagnifyingGlass} />
                </SearchContainer>
            </TitleSearchContainer>
            <GridContainer>
                <Card onClick={() => setModalOpen(true)}>
                    <AddIcon icon={faPlus} />
                </Card>
                {lojas.map((loja) => (
                    <CardLoja
                        key={loja.id}
                        title={loja.nome}
                        id={loja.id}
                        endereco={loja.endereco}
                    />
                ))}
            </GridContainer>
            <AddLojaModal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} onAdd={handleAddLoja} />
        </Container>
    );
}
