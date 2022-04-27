import styled from "styled-components/native";

export const TitleSwitch = styled.Text`
    margin-top: 20px;
    font-size: ${({ theme }) => theme.sizeFonts.medium};
    color: ${({ theme }) => theme.colors.darkblue};
`;

export const Switch = styled.Switch`
    margin-top: 8px;
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