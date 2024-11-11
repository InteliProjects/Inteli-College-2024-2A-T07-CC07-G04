import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Loading, HeadBack, Content, PhotoContainer, DescriptionContainer, PhotoComponent, Especificacoes, AddCarrinho, CepCalcular } from "./styles.js";
import Header from "../../components/Header";
import { IoIosArrowBack } from "react-icons/io";
import SelectionGroup from "../../components/Cards/SelectionGroup/index.js";
import CONFIG from "../../config/config.js";

// Função para calcular a distância entre dois CEPs
const calculateDistance = (cep1, cep2) => {
    const prefix1 = parseInt(cep1.replace("-", "").slice(0, 5));
    const prefix2 = parseInt(cep2.replace("-", "").slice(0, 5));
    return Math.abs(prefix1 - prefix2) * 0.1;
};

// Função para encontrar a loja mais próxima com base no CEP do cliente
const findClosestStore = (cep, stores) => {
    if (!cep || !stores.length) return null;

    let closestStore = null;
    let minDistance = Infinity;

    const customerPrefix = parseInt(cep.replace("-", "").slice(0, 5));

    stores.forEach(store => {
        const storePrefix = parseInt(store.endereco.replace("-", "").slice(0, 5));
        const distance = Math.abs(customerPrefix - storePrefix);

        if (distance < minDistance) {
            minDistance = distance;
            closestStore = store;
        }
    });

    return closestStore;
};

// Função para calcular o frete e o tempo de entrega com base na distância
const calculateFreteAndDeliveryTime = (distance) => {
    const FRETE_PER_100KM = 20.40;
    const DELIVERY_TIME_PER_100KM = 5;

    const freight = FRETE_PER_100KM * (distance / 100);
    const deliveryTime = DELIVERY_TIME_PER_100KM * (distance / 100);

    return {
        freight: freight.toFixed(2),
        deliveryTime: Math.ceil(deliveryTime)
    };
};

export default function Produto() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null); // Estado para armazenar o produto
    const [cep, setCep] = useState(""); // Estado para armazenar o CEP
    const [isCepValid, setIsCepValid] = useState(false); // Estado para verificar validade do CEP
    const [isCepConfirmed, setIsCepConfirmed] = useState(false); // Estado para confirmar o CEP
    const [frete, setFrete] = useState(null); // Estado para armazenar o frete
    const [deliveryTime, setDeliveryTime] = useState(null); // Estado para armazenar o tempo de entrega
    const [lastCartId, setLastCartId] = useState(null); // Estado para armazenar o último id do carrinho

    useEffect(() => {
        const fetchLastCartId = async () => {
            try {
                const response = await fetch(`${CONFIG.backendUrl}/produtos_carrinho`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const newLastCartId = data.length ? data[data.length - 1].carrinho_id + 1 : 1;
                setLastCartId(newLastCartId);
                console.log('Último id do carrinho:', newLastCartId); // Atualizado para mostrar o valor correto
            } catch (error) {
                console.error('Houve um problema com a requisição:', error);
            }
        };
    
        fetchLastCartId();
    }, []);        

    useEffect(() => {
        // Função para buscar o produto com base no ID
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${CONFIG.backendUrl}/produtos/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Houve um problema com a requisição:', error);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        // Função para buscar as lojas e calcular o frete e tempo de entrega
        const fetchStores = async () => {
            try {
                const response = await fetch(`${CONFIG.backendUrl}/lojas`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const stores = await response.json();
                const closestStore = findClosestStore(cep, stores);
                if (closestStore) {
                    const distance = calculateDistance(cep, closestStore.endereco);
                    const { freight, deliveryTime } = calculateFreteAndDeliveryTime(distance);
                    setFrete(freight);
                    setDeliveryTime(deliveryTime);
                }
            } catch (error) {
                console.error('Houve um problema com a requisição:', error);
            }
        };

        if (isCepConfirmed) {
            fetchStores();
        }
    }, [cep, isCepConfirmed]);

    // Função para voltar à página anterior
    const handleBackClick = () => {
        navigate("/");
    };

    // Função para validar o formato do CEP
    const validateCep = (value) => {
        const cepRegex = /^[0-9]{5}-[0-9]{3}$/;
        return cepRegex.test(value);
    };

    // Função para tratar a mudança no campo de CEP
    const handleCepChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 5) {
            value = value.replace(/^(\d{5})(\d)/, "$1-$2");
        }
        setCep(value);
        setIsCepValid(validateCep(value));
        setIsCepConfirmed(false);
    };

    // Função para confirmar o CEP
    const handleConfirmClick = () => {
        if (isCepValid) {
            setIsCepConfirmed(true);
        }
    };

    // Função para abrir a página de busca de CEP
    const handleNaoSeiMeuCepClick = () => {
        window.open("https://buscacepinter.correios.com.br/app/endereco/index.php", "_blank");
    };

    // ver o ultimo id do produtos carrinho e adicionar +1


    // Função para adicionar o produto ao carrinho
    const handleAddToCart = async () => {
        const produtoCarrinho = {
            CarrinhoID: lastCartId, 
            ProdutoID: Number(id),
            Quantidade: 1
        };
    
        console.log('Dados enviados:', produtoCarrinho);
    
        try {
            const response = await fetch(`${CONFIG.backendUrl}/produtos_carrinho`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produtoCarrinho),
            });
    
            if (!response.ok) {
                console.log('Erro na resposta da requisição:');
                console.log('CarrinhoID:', lastCartId);
                console.log('ProdutoID:', id);
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log('Produto adicionado ao carrinho:', data);
            navigate('/carrinho');
            
        } catch (error) {
            console.error('Houve um problema com a requisição:', error.message);
        }
    };
    
    

    // Se o produto não estiver carregado, exibe uma mensagem de carregamento
    if (!product) {
        return <Loading>Carregando...</Loading>;
    }

    const precoOriginal = parseFloat(product.preco);
    const precoFormatado = precoOriginal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    const precoComAdicional = precoOriginal + 500;
    const precoComAdicionalFormatado = precoComAdicional.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    const precoParcelado = (precoOriginal / 12).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return (
        <Container>
            <Header />
            <HeadBack onClick={handleBackClick}>
                <IoIosArrowBack />
                <p>Voltar</p>
            </HeadBack>
            <Content>
                <PhotoContainer>
                    <PhotoComponent>
                        <img src={product.url} alt={product.descricao} width={'100%'} />
                    </PhotoComponent>
                </PhotoContainer>
                <DescriptionContainer>
                    <p>{product.descricao}</p>
                    <Especificacoes>
                        <SelectionGroup titulo={'Capacidade'} valor={'258 GB'} />
                        <SelectionGroup titulo={'Cor'} valor={'Azul'} />
                    </Especificacoes>
                    <AddCarrinho>
                        <div>
                            <p>
                                De {precoComAdicionalFormatado}
                            </p>
                            <h2>
                                {precoFormatado}
                            </h2>
                            <p>
                                À vista ou até 12x de {precoParcelado} por mês
                            </p>
                        </div>
                        <div>
                            <button onClick={handleAddToCart}>Adicionar ao carrinho</button>
                        </div>
                    </AddCarrinho>
                    <CepCalcular isCepConfirmed={isCepConfirmed} isCepValid={isCepValid}>
                        <p>
                            Prazo de entrega
                        </p>
                        {!isCepConfirmed ? (
                            <>
                                <div>
                                    <input
                                        placeholder={"CEP"}
                                        value={cep}
                                        onChange={handleCepChange}
                                        maxLength="9"
                                    />
                                    <button
                                        onClick={handleConfirmClick}
                                        disabled={!isCepValid}
                                    >
                                        Confirmar
                                    </button>
                                </div>
                                <p onClick={handleNaoSeiMeuCepClick}>
                                    Não sei meu cep
                                </p>
                            </>
                        ) : (
                            <div>
                                <div>
                                    <p>
                                        {deliveryTime !== null ? `${deliveryTime} dias úteis para cep ${cep}` : ''}
                                    </p>
                                    <p>
                                        Valor: {frete !== null ? `R$ ${frete}` : ''}
                                    </p>
                                </div>
                                <p>
                                    Após confirmação do pagamento
                                </p>
                            </div>
                        )}
                    </CepCalcular>
                </DescriptionContainer>
            </Content>
        </Container>
    );
}
