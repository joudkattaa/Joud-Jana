
import { listUsers } from "./modules/users/users.js";
import { listOrders, addOrder } from "./modules/orders/orders.js";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

console.log("Backend structure review");
console.log("");
console.log("Users:");

for (const user of listUsers()) {
  console.log(`- ${user.id}: ${user.name}`);
}

console.log("");
console.log("Orders:");

for (const order of listOrders()) {
  console.log(`- ${order.id}: ${order.item} for ${order.userName}`);
}

const rl = createInterface({ input, output });

try {
  const answer = await rl.question(
    "\nDo you want to add a new order? (yes/no): ",
  );

  if (answer.trim().toLowerCase() === "yes") {
    const userInput = await rl.question("Enter User ID: ");
    const productName = await rl.question("Enter Product Name: ");

    const result = addOrder(Number(userInput), productName);

    if (!result.success) {
      console.log(result.message);
    } else {
      console.log("\nOrder created successfully!");
      console.log(`Order ID: ${result.order.id}`);
      console.log(`Product: ${result.order.item}`);
      console.log(`Customer: ${result.order.userName}`);

      console.log("\nUpdated Orders:");

      for (const order of listOrders()) {
        console.log(
          `- ${order.id}: ${order.item} for ${order.userName}`,
        );
      }
    }
  }
} finally {
  rl.close();
}
