import styled from 'styled-components';

export  const MainSection = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    // align-items: center;
    width: 100%; 
    overflow-y: scroll;
    align-content: start;
`;

export const FormContainer = styled.div`

    display: flex;
    width: 100%;
    justify-content: center;

`;

export const NavigationComponent = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    width: 100%;
    height: fit-content;
`;

export const BackNavigation = styled.div`
    font-family: Raleway;
    font-style: normal;
    font-weight: 500;
    color: #000000;
    display: flex;
    align-items: center;
    height: fit-content;
    :hover {
        cursor: pointer;
    }

`;
export const NextNavigation = styled.div`
    font-family: Raleway;
    font-style: normal;
    font-weight: 500;
    color: #000000;
    display: flex;
    align-items: center;
    height: fit-content;
    :hover {
        cursor: pointer;
    }
`;


export const CustomButton = styled.button`
    background: #000000;
    border-radius: 4px;
    color: white;
    font-family: Quicksand;
    font-style: normal;
    font-weight: bold;
    :hover {
        cursor: pointer;
    }

`;
