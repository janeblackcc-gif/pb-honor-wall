export type EventType = '1km' | '1500m' | '3km' | '5km' | '10km' | '半马' | '全马';

export interface RawRecord {
  Name: string;
  Avatar: string;
  Event: string;
  Time: string;
  Date: string;
  Note: string;
}

export interface PersonalBest {
  event: EventType;
  time: string;
  date: string;
  note: string;
}

export interface Runner {
  id: string;
  name: string;
  avatar: string;
  records: {
    [key in EventType]?: PersonalBest;
  };
  lastUpdated: string;
}
