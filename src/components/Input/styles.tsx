import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    margin: 8px 0;
`;

export const InputText = styled.TextInput`
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.darkblue};
    border-radius: 8px;
    padding: 7px;
`;