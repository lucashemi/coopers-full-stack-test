import { Knex } from "knex";

export const up = (knex: Knex) =>
  knex.schema.createTable("contacts", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("email").notNullable();
    table.string("telephone").notNullable();
    table.text("message").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

export const down = (knex: Knex) => knex.schema.dropTableIfExists("tasks");
