import { Knex } from "knex";

export const up = (knex: Knex) =>
  knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.boolean("done").defaultTo(false);
    table.integer("position").notNullable();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });

export const down = (knex: Knex) => knex.schema.dropTableIfExists("tasks");
