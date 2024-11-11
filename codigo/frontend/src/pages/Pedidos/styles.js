import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > div:last-child{
        width: 90dvw;
        display: flex;
        flex-direction: column;
    }
`;

export const TitleShoppingContent = styled.h1`
    width: 90vw;
    margin-top: 5vh;
    text-align: start;
    font-size: 5vh;
    font-weight: 350;
`;

export const PedidoContainer = styled.div`
    margin-top: 5dvh;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const PedidoItem = styled.div`
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    
    p {
        margin: 5px 0;
    }
`;