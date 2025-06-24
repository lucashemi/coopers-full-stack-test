import { Knex } from "knex";

export const up = (knex: Knex) =>
  knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable().unique();
    table.string("password").notNullable();
  });

export const down = (knex: Knex) => knex.schema.dropTableIfExists("users");
