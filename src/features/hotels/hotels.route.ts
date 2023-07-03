import express from 'express';
import { createHotel, createRoomOfHotel, getHotels, getRoomsOfHotel } from './hotels.service';
import { Result } from '@/utils/types';
import { Hotel } from '@/models/hotel';
import { Room } from '@/models/room';

const router = express.Router();

router.get('/', async (req, res) => {
  const hotels = await getHotels();

  const result: Result<Hotel[]> = {
    code: 200,
    data: hotels,
    message: '',
  };

  res.status(200).json(result);
});
router.get('/:hotelId/rooms', async (req, res) => {
  const { hotelId } = req.params;

  if (!hotelId) {
    res.status(400).json({ message: 'missing query parameter: hotelId' });
    return;
  }
  const roomsRes = await getRoomsOfHotel({ hotelId: parseInt(hotelId) ?? 0 });

  const result: Result<any> = {
    code: 200,
    data: roomsRes,
    message: '',
  };

  res.status(200).json(result);
});
router.post('/:hotelId/rooms', async (req, res) => {
  const { hotelId } = req.params;
  const { roomNo } = req.body;

  if (!hotelId || !roomNo) {
    res.status(400).json({ message: 'missing parameter' });
    return;
  }
  const roomsRes = await createRoomOfHotel({ hotelId: parseInt(hotelId) ?? 0, roomNo });

  const result: Result<Room | null> = {
    code: 200,
    data: roomsRes,
    message: '',
  };

  res.status(200).json(result);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: 'missing parameter: name' });
    return;
  }

  const hotelRes = await createHotel({ name });

  const result: Result<Hotel | null> = {
    code: 201,
    data: hotelRes,
    message: 'hotel created successfully',
  };

  res.status(201).json(result);
});

export default router;
