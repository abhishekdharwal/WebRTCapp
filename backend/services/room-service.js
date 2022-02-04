const roomModel = require("../models/room-model");
class RoomService {
  async create(payload) {
    // console.log(payload.topic);
    const { topic, roomType, ownerId } = payload;
    const room = await roomModel.create({
      topic,
      roomType,
      ownerId,
      speakers: [ownerId],
    });
    return room;
  }
  async getAllRooms(types) {
    const rooms = await roomModel
      .find({ roomType: { $in: types } })
      .populate("speakers")
      .populate("ownerId")
      .exec();
    return rooms;
  }
}
module.exports = new RoomService();
