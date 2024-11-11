import Modal from "react-modal";
import styled from "styled-components";
import { useState } from "react";
import UploadCSV from "./UploadCSV";
import AddProductModal from "./AddProductPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
    width: 100%;
    top: 100px;
    border-radius: 36px;
    background-color: #fff;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center; 

    > h1 {
        color: #676767;
        text-align: center;
        margin-bottom: 15px;
    }
`


const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
`

const Title = styled.h1`
    font-size: 1.5em;
    padding: 5px 10px;
    display: flex
    justify-content: center;
    align-self: center;
`

const CloseIcon = styled(FontAwesomeIcon)`
    font-size: 2em;
    color: #FF0000;
    position: absolute;
    right: 0.5em;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: all 0.3s ease-out;
    &:hover {
        color: #FFA5A5
    }
`

const Text = styled.p`
    padding: 5px 10px;
    padding-bottom: 1.5em;
    font-size: 1em;
`

const OptionsContainer = styled.div`
    align-items: center;
    justify-content: center; 
    display: flex;
    width: 80%;
    border: 2px solid #660099;
    border-radius: 10px;
`

const Options = styled.ul`
    display: flex;
    height: 100%;
    color: #660099;
    align-items: center;
    text-align: center;
    justify-content: center;
    width: 100%;
    flex-shrink: 0;
`

const LeftTab = styled.li`
    width: 70%;
    height: 100%;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px 0 0 5px;
    transition: all 0.3s ease;
`

const RightTab = styled.li`
    width: 70%;
    height: 100%;
    padding: 10px;
    cursor: pointer;
    border-radius: 0 5px 5px 0;
    transition: all 0.3s ease;
`

const AddContainer = styled.div`
    width: 100%;
    padding: 5px;
`

export default function ProductPopup({ 
    modalIsOpen,
    setModalOpen,
}) {
    const [option, setOption] = useState("upload");

    const handleClick = (value) => {
        setOption(value);
    }
    
    return(
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalOpen(false)}
            overlayClassName="modal-overlay"
            className="modal-content create-produto-modal"
        >
            <Container>
                <TitleContainer>
                    <Title>Adicionar produtos</Title>
                    <CloseIcon icon={faTimes} onClick={() => {setModalOpen(false)}}></CloseIcon> 
                </TitleContainer>
                
                
                <Text>Registre um produto individualmente ou suba um arquivo contendo as informações de vários produtos</Text>
                <OptionsContainer>
                    <Options>
                        <LeftTab className={option === "upload" ? "selected" : ""} onClick={() => handleClick("upload")}>Subir um arquivo CSV</LeftTab>
                        <RightTab className={option === "single" ? "selected" : ""} onClick={() => handleClick("single")}>Registrar um produto</RightTab>
                    </Options>
                </OptionsContainer>
                <AddContainer>
                    {option == "upload" ? <UploadCSV /> : <AddProductModal />}
                </AddContainer>
            </Container>
        </Modal>
    )
}