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

    const checklistDb: any = useMemo(() => result.sorted("created_at"), [result]);
    
    const handleAddChecklist = useCallback((checklist: CheckListSend): void => {
        realm.write(() => {
            realm.create("Checklist", Checklist.generate(checklist.type, checklist.amount_of_milk_produced, checklist.number_of_cows_head, checklist.had_supervision, checklist.name, checklist.city, checklist.from, checklist.to));
        });
    }, [realm]);
    

    const handleDeleteChecklist = useCallback((
        checklist: Checklist
    ): void => {
        realm.write(() => {
            realm.delete(realm?.objectForPrimaryKey('Checklist', checklist.id));
        });
    }, [realm]);

    // async function apiService() {
    //     const {data} = await api.get('checklists');

    //     setCheckList(checklistDb);
    // }

    useEffect(() => {
        setCheckList(checklistDb);
    }, [result])

    const handleUpdateChecklist = useCallback(
        (checklist: Checklist, update: CheckListUpdate): void => {
          realm.write(() => {
            checklist.from = update.from;
            checklist.name = update.name;
            checklist.city = update.city;
            checklist.to = update.to;
            checklist.amount_of_milk_produced = update.amount_of_milk_produced;
            checklist.number_of_cows_head = update.number_of_cows_head;
            checklist.updated_at = moment().format();
          });
        },
        [realm],
      );
    

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