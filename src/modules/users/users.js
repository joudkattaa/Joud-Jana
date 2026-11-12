const users = [
  { id: 1, name: "Lina" },
  { id: 2, name: "Omar" },
];

export function findUserById(id) {
  return users.find((user) => user.id === id);
}

export function listUsers() {
  return users;
}

export { users };
