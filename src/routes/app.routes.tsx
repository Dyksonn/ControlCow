import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Checklist } from '../screens/checklist';
import { CreatedChecklist } from '../screens/createdChecklist';
import { UpdateChecklist } from '../screens/updateChecklist';
import { Checklist as ChecklistItem } from '../models/CheckList';
import { useTheme } from 'styled-components';

export type AppStackRoutesParamList = {
    checklist: undefined;
    createchecklist: undefined;
    updatechecklist: { checklistItem: ChecklistItem }
}

const Stack = createNativeStackNavigator<AppStackRoutesParamList>();

export default function AppRoutes() {
    const theme = useTheme();
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.darkblue
                },
                headerTintColor: theme.colors.white,
                headerTitleAlign: 'center'
            }}
        >
            <Stack.Screen name="checklist" component={Checklist} options={{title: 'Lista de Fazendas'}} />

            <Stack.Screen name="createchecklist" component={CreatedChecklist} options={{ title: 'Criar Fazenda'}} />

            <Stack.Screen name="updatechecklist" component={UpdateChecklist} />
        </Stack.Navigator>
    )
}