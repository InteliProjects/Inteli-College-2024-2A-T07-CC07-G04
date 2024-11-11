import styled from "styled-components";

export const StyledHeader = styled.div`
    width: 100dvw;
    padding: 0 5dvw;
    height: 12dvh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;
    svg {
        cursor: pointer;
    }
`;

export const HeaderControls = styled.div`
    margin-left: 24px;
    display: flex;
    align-items: center;
`;

export const IconsContainer = styled.div`
    width: 20dvw;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    svg {
        margin: 0 8px;
        cursor: pointer;
    }
`;
