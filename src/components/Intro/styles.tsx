import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.primary};

    padding: 60px;

    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.sizeFonts.subHeading};
    color: ${({ theme }) => theme.colors.darkblue};
    line-height: 30px;
    text-align: center;
`;