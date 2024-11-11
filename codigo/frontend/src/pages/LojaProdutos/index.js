import { useEffect, useState } from "react";
import {
    Container,
    Title,
    Controls,
    ProductsTable,
    CommandDiv,
    NestedInput,
} from "./styles.js";
import { IoSearchOutline } from "react-icons/io5";
import Header from "../../components/Header";
import AddProductPopup from "../../components/Popup/AddProductPopup";
import UploadCSV from "../../components/Popup/UploadCSV.js";
import CONFIG from "../../config/config.js"; // Importa a URL do backend
import { modal } from "@nextui-org/react";
import ProductPopup from "../../components/Popup/ProductPopup.js";

async function getProducts() {
    try {
        const response = await fetch(`${CONFIG.backendUrl}/produtos`);
        const data = await response.json();

        return data;
    } catch (err) {
        console.error(err);
        return [
            {
                id: "398394921", // Tratar como string
                url: "http://exemplo.com/produto",
                descricao: "Descrição do produto",
                especificacao: "Especificação detalhada do produto",
                preco: 99.99,
            },
        ];
    }
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`${CONFIG.backendUrl}/produtos/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Erro ao excluir o produto");
        }

        return response.json();
    } catch (err) {
        console.error(err);
        alert("Erro ao excluir o produto.");
    }
}

function handleCheckboxChange(id, setSelectedProduct) {
    setSelectedProduct(id);
}

export default function LojaPedidos() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([...products]);
    const [selectedProduct, setSelectedProduct] = useState(null); // Um único produto selecionado
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [triggerReload, setTriggerReload] = useState(false);

    useEffect(() => {
        getProducts().then((response) => {
            setProducts(response);
            setFilteredProducts(response);
        });
    }, [triggerReload]);

    useEffect(() => {
        const filteredProducts = products.filter(
            (product) =>
                product.id.toString().includes(search) || // Convertendo o ID para string
                product.descricao.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredProducts([...filteredProducts]);
    }, [search, products]);

    const handleDelete = async () => {
        if (!selectedProduct) {
            alert("Nenhum produto selecionado.");
            return;
        }

        await deleteProduct(selectedProduct);
        alert("Produto excluído com sucesso!");
        setTriggerReload((prev) => !prev);
    };

    return (
        <>
            <Container>
                <Header />
                <Title>Gerenciar produtos</Title>
                <Controls>
                    <CommandDiv onClick={() => setModalIsOpen(true)}>
                        Adicionar produto
                    </CommandDiv>
                    <NestedInput>
                        <input
                            type="text"
                            placeholder="Buscar produto"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <IoSearchOutline />
                    </NestedInput>
                </Controls>
                <ProductsTable>
                    <thead>
                        <tr>
                            <th></th>
                            <th>id</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedProduct === product.id}
                                        onChange={() =>
                                            handleCheckboxChange(
                                                product.id,
                                                setSelectedProduct
                                            )
                                        }
                                    />
                                </td>
                                <td>{product.id.toString()}</td>
                                <td>{product.descricao}</td>
                                <td>{product.preco}</td>
                            </tr>
                        ))}
                    </tbody>
                </ProductsTable>
                <Controls width="60%">
                    <div></div>
                    <CommandDiv onClick={handleDelete}>
                        Excluir registro
                    </CommandDiv>
                </Controls>
            </Container>

            <ProductPopup
                modalIsOpen={modalIsOpen}
                setModalOpen={setModalIsOpen}
            />
        </>
    );
}
