/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('user').insert([
    {firstname: 'Guest', lastname: 'User', username: 'Guest', password: 'Guest'},
    {firstname: 'John', lastname: 'Madden', username: 'john.madden', password: 'madden01'},
    {firstname: 'Frank', lastname: 'Azar', username: 'TheStrongArm', password: 'Lawyer02'},
    {firstname: 'Walter', lastname: 'White', username: 'Heisenburg', password: 'Money03'},
  ]);
};
