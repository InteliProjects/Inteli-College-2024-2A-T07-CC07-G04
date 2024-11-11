import { faFile, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useState } from "react";
import Modal from "react-modal";
import CONFIG from "../../config/config.js";

const UploadContainer = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 36px;
    background-color: #fff;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    > h1 {
        color: #676767;
        text-align: center;
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 32px;
    }
`;

const Form = styled.form`
    width: 80%;
    padding: 1.5em;
    border: 3px dashed #660099;
    border-radius: 10px;
    font-size:1em;
`

const DropContainer = styled.div`  
    width: 100%;
    font-size: 1em;
    font-weight: 700;
    display: flex;
    padding: 1.5em; 
    flex-direction: column;
`

const UploadIcon = styled(FontAwesomeIcon)`
    padding: 0.4em;
    font-size: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #660099;
`
const ChooseFileContainer = styled.div`
    width: 100%;
    font-size:1em;
`

const SubmitButton = styled.button`
    font-size:1em;
    font-align: center;
    padding: 7px;
    background: none;
    border-radius: 5px;
    width: 13dvw;
    height: 1d;
    cursor: pointer;
    &:hover {
        background-color: #dc2972;
        color: #fff;
    }
    background-color: #fff;
    color: #dc2972;
    border: 1px solid #dc2972; 
    transition: all 0.3s ease-out;
`

const ButtonContainer = styled.div`
    padding: 2em 1em 0 1em;
`

const UploadButton = styled.input`
    display: none;
`

const Info = styled.p`
    color: #6f6c78;
    font-size: 1em;
    padding: 1em;
    font-weight: 400;
`
const Alert = styled.p`
    color: red;
    width: 100%;
    font-size: 1em;
    padding: 1em;
    font-weight: 400;
`

const SelectedFileText = styled.p`
    color: green;
    width: 100%;
    font-size: 1em;
    padding: 1em;
    font-weight: 400;
`

export default function UploadCSV() {
    const [file, setFile] = useState({selectedFile: null})

    const[dragActive, setDragActive] = useState(false);
    const[msg, setMsg] = useState("");

    async function addProdutos(csv) {
        try {
            const response = await fetch(`${CONFIG.backendUrl}/estoques/2/upload`, {
                method: "POST",
                headers: {
                    "Content-Type": "text/csv",
                },
                body: csv,
            })

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || `Failed with status: ${response.status}`);
            }

            return response.json();
        } catch(err) {
            alert(`Não foi possível completar a requisição: ${err}`);
        }
    }

    const checkFileType = (e, eventType) => {
        let extension;

        if (eventType === "drop") {
            extension = e.dataTransfer.files[0].name.match(/\.([^.]+)$/)[1];
        } else {
            extension = e.target.value.match(/\.([^.]+)$/)[1];
        }

        switch (extension) {
            case "csv":
                eventType !== "drop"
                    ? setFile({ selectedFile: e.target.files[0] })
                    : setFile({ selectedFile: e.dataTransfer.files[0] });
                setMsg("");
                break;
            default:
                setFile({ selectedFile: null });
                setMsg(`O formato .${extension} não é aceito`);
        }
    };

    const checkSize = (e, eventType) => {
        let size;
        if (eventType === "drop") {
            size = e.dataTransfer.files[0].size / 8;
        } else {
            size = e.target.files[0].size / 8;
        }

        if (size <= 131072) {
            checkFileType(e, eventType);
        } else {
            setMsg("O tamanho deve ser menor do que 1MB")
        }
    };

    const handleClick = async() => {
        if (file.selectedFile != null) {
            await addProdutos(file.selectedFile);
        } else {
            alert("Nenhum arquivo foi carregado");
        }
    }

    const chooseFile = (e) => {
        console.log("chooseFile"); 

        if (e.target.files && e.target.files[0]) {
            checkSize(e);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            checkSize(e, "drop");
        }
    };
    
    return (
        <UploadContainer>
            <Form
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onSubmit={((e) => e.preventDefault())}
            >
            <DropContainer>
                {file.selectedFile !== null ? (
                    <SelectedFileText> {file.selectedFile.name} </SelectedFileText>
                    ) : msg !== "" ? (
                        <Alert>{msg}</Alert>
                    ) : (
                        <UploadIcon icon={faUpload}></UploadIcon>
                )}
                Solte o seu arquivo aqui ou {" "}
                <ChooseFileContainer>
                    <label
                        htmlFor="img"
                        className="file-label"
                        onClick={() => document.getElementById("getFile").click()}
                    >
                        Procure
                        <UploadButton
                            type="file"
                            data-max-size="2048"
                            id="getFile"

                            onChange={chooseFile}
                        />
                    </label>
                </ChooseFileContainer>
            </DropContainer>

            <Info>Arquivos suportados: csv</Info>

            </Form>
            <ButtonContainer>
                <SubmitButton onClick={handleClick}>Carregar</SubmitButton>
            </ButtonContainer>
        </UploadContainer>  
    )
}