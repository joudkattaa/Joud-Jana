
import { users } from "../users/users.js";

const orders = [
  { id: 101, userId: 1, item: "Notebook" },
  { id: 102, userId: 2, item: "Pencil" },
];

export function listOrders() {
  return orders.map((order) => {
    const user = users.find((item) => item.id === order.userId);

    return {
      id: order.id,
      item: order.item,
      userName: user ? user.name : "Unknown",
    };
  });
}

export function addOrder(userId, productName) {
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return { success: false, message: "User not found." };
  }

  if (!productName.trim()) {
    return { success: false, message: "Product name is required." };
  }

  const newId = Math.max(100, ...orders.map((order) => order.id)) + 1;

  const newOrder = {
    id: newId,
    userId: userId,
    item: productName.trim(),
  };

  orders.push(newOrder);

  return {
    success: true,
    order: {
      id: newOrder.id,
      item: newOrder.item,
      userName: user.name,
    },
  };
}
