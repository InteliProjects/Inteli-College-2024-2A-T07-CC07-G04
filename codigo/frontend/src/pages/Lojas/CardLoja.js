import React from "react";
import { Card, Title, TitleIcon, TitleContainer, Text, TextContainer } from "./styles";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function CardLoja({ title, id, endereco }) {
    return (
        <Card>
            <TitleContainer>
                <Title>{title}</Title>
                <a href={`/loja/${id}`}>
                    <TitleIcon icon={faPenToSquare} />
                </a>
            </TitleContainer>
            <TextContainer>
                <Text><b>ID: {id}</b></Text>
                <Text>Endereço: {endereco}</Text>
            </TextContainer>
        </Card>
    );
}
