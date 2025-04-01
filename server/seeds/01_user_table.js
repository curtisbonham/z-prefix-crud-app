/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('user').insert([
    {firstName: 'John', lastName: 'Madden', userName: 'john.madden', password: 'madden01'},
    {firstName: 'Frank', lastName: 'Azar', userName: 'TheStrongArm', password: 'Lawyer02'},
    {firstName: 'Walter', lastName: 'White', userName: 'Heisenburg', password: 'Money03'},
  ]);
};
