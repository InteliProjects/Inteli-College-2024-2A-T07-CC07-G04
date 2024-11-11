import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    > div:nth-child(3) {
        display: flex;
        width: 90dvw;
        justify-content: space-between;
        > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: start;
            margin-top: 5vh;
            gap: 5vh;
        }

        > div:last-child{
            width: 25vw;
            margin-top: 5vh;
            height: 40vh;
            padding: 2vw;
            border-radius: 0.2vw;
            border: 1px solid #B3B3B3;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            gap: 3vw;

            & p{
                text-align: center;
                font-size: 4dvh;
                font-weight: 350;
            }

            > div:nth-child(3) {
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
        }
    }
`;

export const TitleShoppingContent = styled.h1`
    width: 90vw;
    margin-top: 5vh;
    text-align: start;
    font-size: 5vh;
    font-weight: 350;
`;

export const ItemCarrinho = styled.div`
    width: 55vw;
    height: 30vh;
    padding: 2vw;
    border-radius: 0.2vw;
    border: 1px solid #B3B3B3;
    display: flex;
    align-items: center;
    gap: 3vw;

    > div:nth-child(2){
        width: 80%;
        height: 80%;
        font-weight: 300;
        font-size: 1.2vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        > div:nth-child(2){
            display: flex;
            justify-content: space-between;
            & span:last-child{
                font-weight: 500;
                font-size: 1.3vw;
            }
        }
    }
`;

export const ProductImage = styled.div`
    width: 8vw;
    height: 8vw;
    border-radius: 0.2vw;
    overflow: hidden;
    img {
        height: 100%;
        object-fit: cover;
    }
`;

export const QuantityControls = styled.div`
    width: 10dvw;
    height: 5dvh;
    border-radius: 0.2vw;
    border: 1px solid #B3B3B3;
    display: flex;
    align-items: center;

    button {
        width: 3dvw;
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 1.3dvw;
        color: #B3B3B3;
        display: flex;
        align-items: center;
        justify-content: center;
        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }

    span {
        width: 5dvw;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3dvw;
        border-left: 1px solid #B3B3B3;
        border-right: 1px solid #B3B3B3;
}
`;
