import db from '@/initializers/db';
import { Hotel } from '@/models/hotel';
import { Room } from '@/models/room';

export async function getHotels(): Promise<Hotel[]> {
  return db.any('SELECT * FROM hotels');
}

export async function createHotel(data: { name: string }): Promise<Hotel | null> {
  try {
    const res = await db.one<Hotel>('INSERT INTO hotels (name) VALUES ($1) RETURNING *', [
      data.name,
    ]);
    if (res.id) return res;
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getRoomsOfHotel(data: { hotelId: number }): Promise<Room[] | null> {
  try {
    const res = await db.manyOrNone<Room>('SELECT * from rooms as r where r.hotel_id = $1', [
      data.hotelId,
    ]);
    if (res.length > 0) return res;
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createRoomOfHotel(data: {
  hotelId: number;
  roomNo: string;
}): Promise<Room | null> {
  try {
    const res = await db.one<Room>('INSERT INTO rooms (no, hotel_id) VALUES ($1, $2) RETURNING *', [
      data.roomNo,
      data.hotelId,
    ]);
    if (res.id) return res;
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
