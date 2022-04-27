import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Container } from './styles';

export function ButtonFloat() {
    const theme = useTheme();
    const navigation = useNavigation();

    function handleToCreatedChecklist() {
        navigation.navigate("createchecklist");
    }

    return (
        <Container onPress={handleToCreatedChecklist}>
            <AntDesign name="plus" color={theme.colors.white} size={RFValue(40)} />
        </Container>
    )
}