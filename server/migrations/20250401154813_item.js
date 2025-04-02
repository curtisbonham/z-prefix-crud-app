/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('item', table => {
    table.increments('id').primary();
    table.integer('userid');
    table.foreign('userid').references('id').inTable('user').onDelete('CASCADE');
    table.string('itemname');
    table.string('description');
    table.integer('quantity');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('item', table => {
    table.dropForeign('userid');
  }).then(() => {
    return knex.schema.dropTable('item');
  });

};
