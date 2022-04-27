import styled from "styled-components/native";

export const DataCreated = styled.Text`
    margin-top: 14px;
    margin-bottom: 10px;
    text-align: center;
`;

export const Container = styled.ScrollView.attrs(() => ({
    contentContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50
    }
}))`
    flex: 1;
    margin-top: 20px;
    background-color: ${({ theme }) => theme.colors.primary};

    padding: 22px;
`;