import styled from "styled-components";

export const Container = styled.div`
    width: 100dvw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Loading = styled.div`
    width: 100dvw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 2dvw;
`;

export const HeadBack = styled.div`
    width: 80dvw;
    height: 3dvh;
    margin-top: 2dvh;
    gap: 1dvw;
    display: flex;
    align-items: center;
    color: #6D6D6D;
    justify-content: start;
    font-weight: 350;
    text-decoration: underline;
    cursor: pointer; 

    &:hover {
        color: #660099;
    }

    svg {
        transition: color 0.3s ease-in-out;
    }
    
    p {
        margin: 0;
        transition: color 0.3s ease-in-out;
    }

    &:hover svg,
    &:hover p {
        color: #660099;
    }
`;

export const Content = styled.div`
    margin-top: 5dvh;
    width: 80dvw;
    display: flex;
    justify-content: space-between;
`;

export const PhotoContainer = styled.div`
    width: 32dvw;
    height: 30dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const DescriptionContainer = styled.div`
    width: 45dvw;
    display: flex;
    flex-direction: column;
    gap: 5dvh;

    & p{
        font-size: 2dvw;
        font-weight: 300;
    }
`;

export const Especificacoes = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const PhotoComponent = styled.div`
    width: 100%;
`;

export const AddCarrinho = styled.div`
    width: 45dvw;
    height: 20dvh;
    padding: 2dvw;
    border-radius: 0.2dvw;
    border: 1px solid #B3B3B3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div:first-child{
        width: 20dvw;
        height: 12dvh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        & p{
            font-size: 1dvw;
        }
        & h2{
            font-size: 2dvw;
            font-weight: 500;
        }
    }
    
    > div:last-child {
        background-color: #DC2972;
        color: white;
        width: 18dvw;
        height: 7dvh;
        padding: 1dvw;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.2dvw;
        font-weight: 300;
        font-size: 1.2dvw;
        transition: all 0.3s ease-in-out;

        &:hover {
            background-color: #FE1473;
            cursor: pointer;
        }

        & button{
            background-color: transparent;
            border: none;
            color: white;
        }
}
`;

export const CepCalcular = styled.div`
    width: 45dvw;
    height: 25dvh;
    padding: 2dvw;
    border-radius: 0.2dvw;
    border: 1px solid #B3B3B3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;

    & p{
        font-size: 1.1dvw;
        font-weight: 300;
    }

    > div:nth-child(2){
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: end;

        & input {
        width: 25dvw;
        height: 7dvh;
        padding: 2dvw;
        border-radius: 0.2dvw;
        border: 1px solid #B3B3B3;
        color: gray;
        outline: none; 

        &:focus {
            border: 1px solid #DC2972;
        }
    }
        & input::placeholder{
            color: #B3B3B3;
        }
        & button {
        width: 12dvw;
        height: 6dvh;
        text-align: center;
        align-items: center;
        border-radius: 0.2dvw;
        border: 1px solid ${props => props.isCepConfirmed ? '#4CAF50' : '#B3B3B3'};
        background-color: transparent;
        color: #B3B3B3;
        cursor: ${props => props.isCepValid ? 'pointer' : 'not-allowed'};
        transition: border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;

        &:hover {
            color: ${props => props.isCepValid ? '#D6D6D6' : '#B3B3B3'};
        }
    }
    }

    & pl{
        font-size: 1.1dvw;
        font-weight: 300;
        text-decoration: underline;
        color: #660099;
        cursor: pointer;
    }
`;