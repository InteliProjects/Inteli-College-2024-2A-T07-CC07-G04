import styled from "styled-components";

export const Container = styled.div`
    width: 20dvw;
    height: 10dvh;
    padding: 1dvw;
    border-radius: 0.2dvw;
    border: 1px solid #B3B3B3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    cursor: pointer;

    &:hover {
        border-color: #660099;
    }
`;

export const Textos = styled.div`
    width: 60%;
    height: 6dvh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & pp{
        font-size: 1.1dvw;
        font-weight: 300;
    }

    & pt{
        font-size: 1.2dvw;
        font-weight: 400;
    }
`;

export const Menu = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    border: 1px solid #B3B3B3;
    border-radius: 0.2dvw;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    z-index: 10; 
`;

export const MenuItem = styled.div`
    height: 10dvh;
    padding: 0.5dvw;
    border-bottom: 1px solid #B3B3B3;
    display: flex;
    padding: 1dvw;
    align-items: center;
    cursor: pointer;
    font-size: 1.1dvw;
    font-weight: 300;

    &:hover {
        background: #f0f0f0;
    }

    &:last-child {
        border-bottom: none;
    }
`;
