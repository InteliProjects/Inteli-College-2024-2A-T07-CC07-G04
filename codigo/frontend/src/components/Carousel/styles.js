import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const StyledCarousel = styled(Carousel)`
    width: 100dvw;
    .carousel .control-dots {
        display: none;
    }

    .carousel.carousel-slider {
        height: 100%;
    }

    .slider-wrapper,
    .slider {
        height: 100%;
        display: flex;
        align-items: center;
    }

    .control-prev,
    .control-next {
        width: 5dvw;
        background-color: #660099 !important;
        height: 5dvw;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #660099; 
        color: #fff;
        border-radius: 50%;
        position: absolute;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .control-prev{
        transform: translate(2vw, 27dvh);
    }

    .control-next{
        transform: translate(-2vw, 27dvh);
    }

    .control-prev:hover,
    .control-next:hover {
        background-color: #50126F !important; 
    }
    
    .control-prev {
        left: 20px;
    }

    .control-next {
        right: 20px;
    }
`;

export const ProductCard = styled.div`
    width: 20dvw;
    height: 70dvh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 2dvh;
    border-radius: 2dvh;
    background-color: #fff;

    > div:last-child {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 35%;
        width: 80%;
        align-items: start;
    }

    img {
        height: 60%;
        object-fit: contain;
    }

    h2 {
        font-size: 4dvh;
        color: #000;
    }

    p {
        font-size: 2dvh;
        margin-bottom: 0.5dvh;
        color: #333;
        overflow: hidden;
        text-align: start;
        display: -webkit-box;
        -webkit-line-clamp: 2; 
        -webkit-box-orient: vertical;
        text-overflow: ellipsis; 
    }

    button {
        width: 100%;
        height: 6dvh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        font-weight: 600;
        color: #fff;
        background-color: #660099;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color ease-in-out 0.5s;
    }

    button:hover{
        background-color: #50126F;
    }
`;
