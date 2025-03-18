import { Realm } from '@realm/react'

export class DailyReport extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  notes!: string;
  createdAt!: Date;

  static generate(notes: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      notes,
      createdAt: new Date(),
    };
  }

  static schema = {
    name: 'DailyReport',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      notes: 'string',
      createdAt: 'date',
    },
  };
}
