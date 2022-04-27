import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.white};
    margin: 13px;
    padding: 10px;
    border-radius: 8px;
    elevation: 2;
`;

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.sizeFonts.subtitle};
    color: ${({ theme }) => theme.colors.darkblue};
    font-weight: bold;
`;

export const Farmer = styled.Text`
    margin-top: 4px;
    margin-left: 5px;
`;

export const NameFarm = styled.Text`
    margin-bottom: 8px;
    font-size: ${({ theme }) => theme.sizeFonts.subHeading};
    text-align: center;
`;

export const City = styled.Text`
    margin-top: 4px;
    margin-left: 5px;
`;

export const Date = styled.Text`
    margin-top: 4px;
    margin-left: 5px;
`;

export const ContentRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ContentInfos = styled.View``;

export const ContentDelete = styled.TouchableOpacity`
    padding-right: 13px;
`;

