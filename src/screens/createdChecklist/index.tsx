import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useCheckList } from '../../hooks/checklist';

import { Container, TitleSwitch, Switch } from './styles';

export function CreatedChecklist() {
    const theme = useTheme();
    const [nameFarmer, setNameFarmer] = useState('');
    const [farm, setFarm] = useState('')
    const [city, setCity] = useState('');
    const [supervisor, setSupervisor] = useState('');
    const [type, setType] = useState('');
    const [qtdMilk, setQtdMilk] = useState('');
    const [qtdGado, setQtdGado] = useState('');

    const [hadSupervision, setHadSupervision] = useState(false);

    const { handleAddChecklist } = useCheckList();

    const navigation = useNavigation();

    function handleCreateCheckList() {
        const data = {
            type: type,
            amount_of_milk_produced: Number(qtdMilk),
            number_of_cows_head: Number(qtdGado),
            had_supervision: hadSupervision,
            name: farm,
            city: city,
            from: nameFarmer,
            to: supervisor,
        }

        handleAddChecklist(data);

        alert('Criado com sucesso');

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
                placeholder='Tipo'
                value={type}
                onChangeText={setType}
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

            <TitleSwitch>Teve supervição no mês em curso?</TitleSwitch>

            <Switch 
                trackColor={{ false: "#767577", true: theme.colors.darkblue }}
                thumbColor={hadSupervision ? theme.colors.blue : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setHadSupervision(!hadSupervision)}
                value={hadSupervision}
            />

            <Button title='Criar' onPress={handleCreateCheckList} />
        </Container>
    )
}