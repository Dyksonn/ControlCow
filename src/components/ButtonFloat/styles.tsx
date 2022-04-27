import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background-color: ${({ theme }) => theme.colors.blue};
    justify-content: center;
    align-items: center;
    elevation: 3;

    position: absolute;
    bottom: 30px;
    right: 20px;
`;