import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 0 5%;
`;

export const Title = styled.h1`
    width: 100%;
    margin-top: 5vh;
    text-align: start;
    font-size: 5vh;
    font-weight: 350;
`;

export const Controls = styled.div`
    width: ${(props) => props.width || "100%"};
    height: 50px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 5vh;
`;

export const ProductsTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    margin-top: 5vh;

    th {
        font-size: 1.7em;
        color: #000;
        font-weight: 400;
    }

    td {
        font-size: 1em;
        color: #000;
        font-weight: 300;
    }

    th,
    td {
        height: 40px;

        text-align: center;
        padding: 8px;
        border: 1px solid #ddd;
    }

    th:nth-child(1),
    td:nth-child(1) {
        width: 5%; /* Select checkbox column */
        border-right: none;
    }

    th:nth-child(2),
    td:nth-child(2) {
        width: 15%; /* SKU column */
        border-left: none;
    }

    th:nth-child(3),
    td:nth-child(3) {
        width: 60%; /* Description column */
    }

    th:nth-child(4),
    td:nth-child(4) {
        width: 15%; /* Price column */
    }

    thead {
        background-color: #fff;
    }

    tbody tr:nth-child(odd) {
        background-color: #d9d9d9;
    }

    tbody tr:nth-child(even) {
        background-color: #fff;
    }

    & input{
        width: 1dvw;
        height: 1dvw;
    }
`;

export const CommandDiv = styled.div`
    width: 200px;
    height: 5dvh;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0 10px;
    background-color: #fff;
    border-radius: 0.5dvw;
    border: 1px solid #dc2972;

    color: #dc2972;

    cursor: pointer;

    transition: all 0.3s ease-out;
    &:hover {
        background-color: #dc2972;
        color: #fff;
    }
`;

export const NestedInput = styled.div`
    width: 300px;
    height: 5dvh;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #fff;
    border-radius: 0.5dvw;
    border: 1px solid #b3b3b3;

    > input {
        width: 80%;
        height: 100%;
        padding: 0 10px;
        border: none;
        border-radius: 5px;
        font-size: 1.3dvw;
    }

    > input:focus {
        outline: none;
    }

    > svg {
        font-size: 1.5dvw;
        color: #660099;
        cursor: pointer;
    }
`;
