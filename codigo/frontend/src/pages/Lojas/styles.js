import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-wrap: wrap; 
    justify-content: center;
    gap: 20px;        
    padding: 20px;
    box-sizing: border-box;
`;

export const SearchBar = styled.input`
    ::placeholder {
        color: green;
    }

    text-align: left;
    width: 300px;
    height: 2.5vw;
    padding: 10px;
    padding-right: 40px;
    margin-top: 1vw;
    margin-bottom: 1vw;
    font-size: 1vw;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 10px;
    
    &:focus {
        outline: none;
        border-color: #660099;
    }
`

export const AddIcon = styled(FontAwesomeIcon)`
    font-size: 6vw;
    color: #660099
`

export const SearchContainer = styled.div`
    margin-top:2vw; 
    justify-content: start;
    align-items: start;
    align-self: start;
    position: relative;
    width: fit-content;
`

export const SearchIcon = styled(FontAwesomeIcon)`
    position: absolute;
    right: 10px;
    align-self: flex-start;
    transform: translateY(-50%);
    font-size: 1vw;
    pointer-events: none; 
    top: 50%;
`

export const TitleSearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 90vw; 
    margin-top: 5vh; 
`

export const GridContainer = styled.div`
    display: grid;
    gap: 40px; 
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));  
    width: 100vw;
    padding: 2vw;
    box-sizing: border-box;
    justify-items: start;
`;

export const Card = styled.div`
    width: 100%;
    height: auto;
    max-width: 400px;    
    max-height: 400px;   
    position: relative;  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f8f8f8;  
    box-shadow: 0 0.4vw 0.8vw rgba(0, 0, 0, 0.1);  
    border-radius: 0.8vw;  
    box-sizing: border-box; 
    overflow: hidden;    
    padding: 2vw;
    cursor: pointer;
`

export const Title = styled.h1`
    margin: 0 0 0 1vw;
    font-size: 2vw;
    font-weight: 350;
    text-align: center;
`

export const TitleIcon = styled(FontAwesomeIcon)`
    height: 1.6dvw;
    cursor: pointer;
    color: #660099;

    &:hover {
        color: #D994FB
    }
`

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;   
    justify-content: space-between; 
    width: 100%;            
    margin: 0;
    padding-top: 2vw;
`   

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    text-align: start;
    position: relative; 
    margin-top: 5vw; 
`;

export const Text = styled.p`
    width: 100%;
    font-size: 1.2vw;
    margin: 1vw 0;      

    & b{
        font-weight: 600;
        font-size: 1.4vw;
    }
`;

export const TitleLojas = styled.h1`
    font-size: 2.2dvw;
    width: 90vw;
    text-align: start;
    font-weight: 350;
    margin: 0;  
`;