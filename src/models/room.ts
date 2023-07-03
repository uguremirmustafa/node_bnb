import { Hotel } from './hotel';

export interface Room {
  id: number;
  no: string;
  hotel_id: Hotel['id'];
}
