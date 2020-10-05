import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@admin.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Jonathan Joestar",
    email: "jonathan@joestar.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Giorno",
    email: "giorno@giovanna.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Abbacio",
    email: "abbacio @abac.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
