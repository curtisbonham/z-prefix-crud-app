/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  await knex('user').del();

  const hashedPassword = await bcrypt.hash('Guest', 10);
  const hashedPassword2 = await bcrypt.hash('madden01', 10);
  const hashedPassword3 = await bcrypt.hash('Lawyer02', 10);
  const hashedPassword4 = await bcrypt.hash('Money03', 10);

  await knex('user').insert([
    {firstname: 'Guest', lastname: 'User', username: 'Guest', password: hashedPassword},
    {firstname: 'John', lastname: 'Madden', username: 'john.madden', password: hashedPassword2},
    {firstname: 'Frank', lastname: 'Azar', username: 'TheStrongArm', password: hashedPassword3},
    {firstname: 'Walter', lastname: 'White', username: 'Heisenburg', password: hashedPassword4},
  ]);
};
