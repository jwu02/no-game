import { Realm } from '@realm/react'

export class Streak extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  startDate!: Date;
  endDate?: Date;
  relapseNotes?: string;
  dailyReports?: Realm.List<DailyReport>;

  // A new streak is created everytime the user relapses
  static generate(startDate: Date = new Date()) { 
    return {
      _id: new Realm.BSON.ObjectId(),
      startDate: startDate,
    };
  }

  static schema = {
    name: 'Streak',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      startDate: 'date',
      endDate: 'date?',
      relapseNotes: 'string?',
      dailyReports: 'DailyReport[]',
    },
  };
}
