import React from 'react';
import { FlatList, StatusBar } from 'react-native'
import { useTheme } from 'styled-components';
import { ButtonFloat } from '../../components/ButtonFloat';
import { Farms } from '../../components/Farms';
import { useCheckList } from '../../hooks/checklist';

import { Container, Title } from './styles';
const data = [
    {
        id: "1",
        type: "BPA", 
        amount_of_milk_produced: "300",
        number_of_cows_head: "17", 
        had_supervision: true, 
        name: "Fazenda São Rock",
        city: "São Rock",
        from: "Luciano Camargo",
        to: "Fernando Siqueira",
        created_at: "2022-02-01T10:10:21.748Z", 
        updated_at: "2022-02-01T10:10:21.748Z"
    },
    {
        id: "2",
        type: "BPA", 
        amount_of_milk_produced: "300",
        number_of_cows_head: "17", 
        had_supervision: false, 
        name: "Fazenda São Rock Dykson",
        city: "São Rock Soap",
        from: "Luciano camaro",
        to: "Fernando Santos",
        created_at: "2022-02-01T10:10:21.748Z", 
        updated_at: "2022-02-01T10:10:21.748Z"
    }
]
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