import React from 'react';
import moment from "moment";
import { AntDesign } from '@expo/vector-icons';

import { Container, Title, Farmer, NameFarm, City, Date, ContentRow,
    ContentInfos,
    ContentDelete } from './styles';
import { useCheckList } from '../../hooks/checklist';
import { Checklist } from '../../models/CheckList';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackRoutesParamList } from '../../routes/app.routes';

interface PropsCheckList {
    data: Checklist
} 

type FarmsNavigationUpdate = NativeStackNavigationProp<AppStackRoutesParamList, 'updatechecklist'>;

export function Farms({ data } : PropsCheckList) {
    const theme = useTheme();
    const { handleDeleteChecklist } = useCheckList();

    const navigation = useNavigation<FarmsNavigationUpdate>();

    function handleDeleteCheckListSelected() {
        handleDeleteChecklist(data)
    }

    function handleUpdateInfosCheckList() {
        navigation.navigate('updatechecklist', { checklistItem: data });
    }

    return (
        <Container onPress={handleUpdateInfosCheckList}>
            <NameFarm>{data.name}</NameFarm>

            <ContentRow>
                <ContentInfos>
                    <City><Title>Local:</Title> {data.city}</City>
                    <Farmer><Title>Nome:</Title> {data.from}</Farmer>

                    <Date><Title>Atualização:</Title> {moment(data.updated_at).format('DD/MM/YYYY')}</Date>
                    <Date><Title>Hora atualização:</Title> {moment(data.updated_at).format('HH:mm')}</Date>
                </ContentInfos>

                <ContentDelete onPress={handleDeleteCheckListSelected}>
                    <AntDesign name="delete" color={theme.colors.redDark} size={RFValue(30)} />
                </ContentDelete>
            </ContentRow>
            
        </Container>
    )
}