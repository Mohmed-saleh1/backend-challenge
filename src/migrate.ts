import dotenv from "dotenv";
dotenv.config();

import {
  up as upCreateDb,
  down as downCreateDb,
} from "./migrations/1646754589136-create-database";
import {
  up as upCreateUsersTable,
  down as downCreateUsersTable,
} from "./migrations/1646754589135-create-users-table";

const runMigration = async () => {
  try {
    await upCreateDb();
    await upCreateUsersTable();
    console.log("Migration applied successfully!");
  } catch (err) {
    console.error("Error applying migration:", err);
  }
};

const revertMigration = async () => {
  try {
    await downCreateUsersTable();
    await downCreateDb();
    console.log("Migration reverted successfully!");
  } catch (err) {
    console.error("Error reverting migration:", err);
  }
};

const action = process.argv[2];

if (action === "up") {
  runMigration();
} else if (action === "down") {
  revertMigration();
} else {
  console.log('Please specify "up" or "down"');
}
