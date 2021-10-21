class UserDto {
  id;
  phone;
  name;
  avatar;
  activated;
  createdAt;
  constructor(user) {
    this.id = user._id;
    this.phone = user.phone;
    this.name = user.name;
    this.activated = user.activated;
    this.avatar = user.avatar ? `${process.env.BASE_URL}${user.avatar}` : null;
    this.createdAt = user.createdAt;
  }
}

module.exports = UserDto;
