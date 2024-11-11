import { Container, ShoppingContent, TitleShoppingContent } from "./styles";
import Header from "../../components/Header";
import Carousel from "../../components/Carousel";

export default function Home() {
    return (
        <Container>
            <Header /> 
            <ShoppingContent>
                <TitleShoppingContent>Cliente Vivo tem + benefícios</TitleShoppingContent>
                <Carousel />
                <TitleShoppingContent>Ofertas pra você</TitleShoppingContent>
                <Carousel /> 
            </ShoppingContent>
        </Container>
    );
}
