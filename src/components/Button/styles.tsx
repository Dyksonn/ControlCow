import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    width: 200px;
    height: 56px;
    justify-content: center;
    align-items: center;

    border-radius: 10px;

    background-color: ${({ theme }) => theme.colors.blue};

    margin-top: 20px;
    margin-bottom: 20px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.sizeFonts.heading};
    font-weight: 700;
`;