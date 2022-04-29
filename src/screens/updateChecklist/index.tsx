import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import moment from "moment";
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useCheckList } from '../../hooks/checklist';
import { AppStackRoutesParamList } from '../../routes/app.routes';

import { Container, DataCreated } from './styles';

type RouteUpdate = RouteProp<AppStackRoutesParamList, 'updatechecklist'>;

export function UpdateChecklist() {
    const theme = useTheme();
    const route = useRoute<RouteUpdate>();

    const [nameFarmer, setNameFarmer] = useState(route.params.checklistItem.from);
    const [farm, setFarm] = useState(route.params.checklistItem.name)
    const [city, setCity] = useState(route.params.checklistItem.city);
    const [supervisor, setSupervisor] = useState(route.params.checklistItem.to);
    const [qtdMilk, setQtdMilk] = useState(route.params.checklistItem.amount_of_milk_produced.toString());
    const [qtdGado, setQtdGado] = useState(route.params.checklistItem.number_of_cows_head.toString());

    const { handleUpdateChecklist } = useCheckList();

    const navigation = useNavigation();
    
    useEffect(() => {
        navigation.setOptions({ title: route.params.checklistItem.name});
    }, [])

    function handleCreateCheckList() {
        const data = {
            amount_of_milk_produced: Number(qtdMilk),
            number_of_cows_head: Number(qtdGado),
            name: farm,
            city: city,
            from: nameFarmer,
            to: supervisor,
            updated_at: moment().format()
        }

        handleUpdateChecklist(route.params.checklistItem, data);

        alert('Atualizado com sucesso');

        navigation.goBack();
    }
    
    return (
        <Container
            showsVerticalScrollIndicator={false}
        >
            <StatusBar barStyle='light-content' backgroundColor={theme.colors.darkblue} translucent />
            <Input 
                placeholder='Nome do Fazendeiro'
                value={nameFarmer}
                onChangeText={setNameFarmer}
            />

            <Input 
                placeholder='Nome da Fazenda'
                value={farm}
                onChangeText={setFarm}
            />

            <Input 
                placeholder='Nome da Cidade'
                value={city}
                onChangeText={setCity}
            />

            <Input 
                placeholder='Nome do Supervisor'
                value={supervisor}
                onChangeText={setSupervisor}
            />

            <Input 
                placeholder='Quantidade de leite'
                keyboardType='numeric'
                value={qtdMilk}
                onChangeText={setQtdMilk}
            />

            <Input 
                placeholder='Quantidade cabeça de gado'
                keyboardType='numeric'
                value={qtdGado}
                onChangeText={setQtdGado}
            />

            <DataCreated>Data da criação: {moment(route.params.checklistItem.created_at).format('DD/MM/YYYY')}</DataCreated>

            <Button title='Atualizar' onPress={handleCreateCheckList} />
        </Container>
    )
}