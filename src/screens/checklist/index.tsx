import React from 'react';
import { FlatList, StatusBar } from 'react-native'
import { useTheme } from 'styled-components';
import { ButtonFloat } from '../../components/ButtonFloat';
import { Farms } from '../../components/Farms';
import { useCheckList } from '../../hooks/checklist';

import { Container } from './styles';

export function Checklist() {
    const theme = useTheme();
    const { checklist } = useCheckList();

    return (
        <Container>
            <StatusBar barStyle='light-content' backgroundColor={theme.colors.darkblue} translucent />
            <FlatList 
                data={checklist}
                keyExtractor={item => String(item.id)}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 20,
                    paddingBottom: 120
                }}
                renderItem={({ item }) => <Farms data={item} />}
            />

            <ButtonFloat />
        </Container>
    )
}