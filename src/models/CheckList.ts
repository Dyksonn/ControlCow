import { Realm, createRealmContext } from "@realm/react";
import moment from "moment";

export class Checklist extends Realm.Object {
    id!: Realm.BSON.ObjectId;
    type!: string;
    amount_of_milk_produced!: number;
    number_of_cows_head!: number;
    had_supervision!: boolean;
    name!: string;
    city!: string;
    from!: string;
    to!: string;
    created_at!: string;
    updated_at!: string;


    static generate(type: string, amount_of_milk_produced: number, number_of_cows_head: number, had_supervision: boolean, name: string, city: string, from: string, to: string) {
        return {
          id: new Realm.BSON.ObjectId(),
          type,
          amount_of_milk_produced,
          number_of_cows_head,
          had_supervision,
          name,
          city,
          from,
          to,
          created_at: moment().format(),
          updated_at: moment().format(),
        };
    }

    static schema = {
        name: 'Checklist',
        primaryKey: 'id',
        properties: {
            id: 'objectId',
            type: 'string',
            amount_of_milk_produced: 'int',
            number_of_cows_head: 'int',
            had_supervision: { type: "bool", default: false },
            name: 'string',
            city: 'string',
            from: 'string',
            to: 'string',
            created_at: 'date',
            updated_at: 'date'
        },
    };
}

export default createRealmContext({
    schema: [Checklist],
    deleteRealmIfMigrationNeeded: true,
});