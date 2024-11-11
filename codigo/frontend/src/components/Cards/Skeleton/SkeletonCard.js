import React from 'react';
import styled from 'styled-components';

const SkeletonContainer = styled.div`
    width: 20dvw;
    height: 70dvh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 2dvh;
    border-radius: 1dvh;
    background-color: #f0f0f0;
    animation: pulse 1.5s infinite ease-in-out;

    @keyframes pulse {
        0% {
            background-color: #f0f0f0;
        }
        50% {
            background-color: #e0e0e0;
        }
        100% {
            background-color: #f0f0f0;
        }
    }
`;

const SkeletonImage = styled.div`
    width: 100%;
    height: 60%;
    background-color: #e0e0e0;
    border-radius: 4px;
`;

const SkeletonText = styled.div`
    width: 80%;
    height: 2dvh;
    background-color: #e0e0e0;
    border-radius: 4px;
    margin: 1dvh 0;
`;

const SkeletonButton = styled.div`
    width: 100%;
    height: 6dvh;
    background-color: #e0e0e0;
    border-radius: 4px;
`;

const SkeletonCard = () => {
    return (
        <SkeletonContainer>
            <SkeletonImage />
            <SkeletonText style={{ width: '50%', height: '4dvh' }} />
            <SkeletonText />
            <SkeletonButton />
        </SkeletonContainer>
    );
};

export default SkeletonCard;
