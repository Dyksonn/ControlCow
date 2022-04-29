import React, {
    createContext,
    useContext,
    ReactNode,
    useMemo,
    useCallback,
    useEffect,
    useState
} from 'react';
import moment from "moment";
import { Realm } from '@realm/react';
import { useNetInfo } from '@react-native-community/netinfo';

import CheckListContextRealm, { Checklist } from "../models/CheckList";
import api from '../service/api';

interface CheckListProviderProps {
    children: ReactNode;
}

interface CheckListSend {
    type: string;
    amount_of_milk_produced: number;
    number_of_cows_head: number;
    had_supervision: boolean;
    name: string;
    city: string;
    from: string;
    to: string;
}[]

interface CheckListUpdate {
    amount_of_milk_produced: number;
    number_of_cows_head: number;
    name: string;
    city: string;
    from: string;
    to: string;
    updated_at: string;
}

interface CheckListContextData {
    checklist: Realm.Results<Checklist> | [];
    handleDeleteChecklist: (task: Checklist) => void;
    handleAddChecklist: (task: CheckListSend) => void;
    handleUpdateChecklist: (task: Checklist, update: CheckListUpdate) => void;
}

const CheckListContext = createContext<CheckListContextData>({} as CheckListContextData);

const { useRealm, useQuery } = CheckListContextRealm;

function CheckListProvider({ children }: CheckListProviderProps) {
    const [checklist, setCheckList] = useState<Realm.Results<Checklist> | []>();

    const realm = useRealm();
    const result = useQuery(Checklist);
    const netInfo = useNetInfo();

    const checklistDb: Realm.Results<Checklist> | [] = useMemo(() => result.sorted("created_at"), [result]);
    
    const handleAddChecklist = useCallback((checklist: CheckListSend): void => {
        realm.write(() => {
            let data = realm.create("Checklist", Checklist.generate(checklist.type, checklist.amount_of_milk_produced, checklist.number_of_cows_head, checklist.had_supervision, checklist.name, checklist.city, checklist.from, checklist.to));
            saveApiNewFarm(data as any);
        });
    }, [realm]);

    async function saveApiNewFarm(data: Checklist) {
        const send = {
            id: data.id,
            type: data.type,
            amount_of_milk_produced: data.amount_of_milk_produced,
            number_of_cows_head: data.number_of_cows_head,
            had_supervision: data.had_supervision,
            farmer: {
                name: data.name,
                city: data.city
            },
            from: {
                name: data.from
            },
            to: {
                name: data.to
            },
            created_at: data.created_at,
            updated_at: data.updated_at
        }
        try {
            const response = await api.post('checklists', send);

            console.log('Criado com sucesso');
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateChecklist = useCallback(
        (checklist: Checklist, update: CheckListUpdate): void => {
            const data = {
                id: checklist.id,
                type: checklist.type,
                from: {
                    name: update.from
                },
                farmer: {
                    name: update.name,
                    city: update.city
                },
                to: {
                    name: update.to
                },
                amount_of_milk_produced: update.amount_of_milk_produced,
                number_of_cows_head: update.number_of_cows_head,
                had_supervision: checklist.had_supervision,
                created_at: checklist.created_at,
                updated_at: update.updated_at
            }
            
            realm.write(() => {
                checklist.from = update.from;
                checklist.name = update.name;
                checklist.city = update.city;
                checklist.to = update.to;
                checklist.amount_of_milk_produced = update.amount_of_milk_produced;
                checklist.number_of_cows_head = update.number_of_cows_head;
                checklist.updated_at = update.updated_at;
                
                updateApiFarm(checklist, data)
            });
        },
        [realm],
    );

    async function updateApiFarm(checklist, data) {
        try {
            const response = await api.put(`checklists/${checklist.id}`, data);

            console.log('Atualizado com sucesso')
        } catch (error) {
            console.log(error);
        }
    }
    

    const handleDeleteChecklist = useCallback((
        checklist: Checklist
    ): void => {
        deleteApiFarm(checklist);
        realm.write(() => {
            realm.delete(realm.objectForPrimaryKey('Checklist', checklist.id));
        });
    }, [realm]);

    async function deleteApiFarm(checklist: Checklist) {
        try {
            const response = await api.delete(`checklists/${checklist.id}`);

            console.log('Deletado com sucesso')

        } catch (error) {
            console.log(error)
        }
    }

    async function apiService() {
        let data: any = [];

        checklistDb.forEach(i => data.push(i))
        try {
            const response = await api.get<any>('checklists');
            
            for (let i = 0;i < response.data.length; i++) {
                const insert = {
                    id: response.data[i].id,
                    type: response.data[i].type,
                    amount_of_milk_produced: Number(response.data[i].amount_of_milk_produced),
                    number_of_cows_head: Number(response.data[i].number_of_cows_head),
                    had_supervision: response.data[i].had_supervision,
                    name: response.data[i].farmer.name,
                    city: response.data[i].farmer.city,
                    from: response.data[i].from.name,
                    to: response.data[i].to.name,
                    created_at: response.data[i].created_at,
                    updated_at: response.data[i].updated_at,
                }
                
                
                data.push(insert);
            }

            // Cria no banco a FAZENDA que foi criada pela api
            if (data.length > checklistDb.length) {
                data.forEach((item) => {
                    var duplicated  = checklistDb.findIndex(redItem => {
                        return item.id == redItem.id;
                    }) > -1;

                    if(!duplicated) {
                        realm.write(() => {
                            realm.create('Checklist', item)
                        })
                    }
                });
            }

            
            // Cria na Api a FAZENDA que foi criada offline
            checklistDb.forEach((item) => {
                var duplicated  = data.findIndex(redItem => {
                    return item.created_at == redItem.created_at;
                }) > -1;

            
                if(!duplicated) {
                    if (response.data.findIndex(i => i.id == item.id) > -1) return;
                    saveApiNewFarm(item)
                }
            });

            // Verificar atualizacao do banco local
            data.forEach((item) => {
                var duplicated  = checklistDb.findIndex(redItem => {
                    return moment(redItem.updated_at).format('HH:mm:ss') === moment(item.updated_at).format('HH:mm:ss');
                }) > -1;

                if(!duplicated) {
                    checklistDb.forEach((itemUpdate) => {
                        if (itemUpdate.id == item.id) handleUpdateChecklist(item, itemUpdate);
                    })
                }
            });

            
        } catch(error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        setCheckList(checklistDb)

        if (netInfo.isConnected) apiService()
    }, [result, netInfo.isConnected])

    
    

    return (
        <CheckListContext.Provider
            value={{
                checklist: checklist,
                handleDeleteChecklist,
                handleAddChecklist,
                handleUpdateChecklist
            }}
        >
            {children}
        </CheckListContext.Provider>
    );
}

function useCheckList(): CheckListContextData {
    const context = useContext(CheckListContext);

    return context;
}

export { CheckListProvider, useCheckList };