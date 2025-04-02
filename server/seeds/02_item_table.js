/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('item').del()
  await knex('item').insert([
    {userid: '2', itemname: 'Footballs', quantity: '200', description: 'The ball is oval-shaped, made of leather or synthetic material, and designed for gripping and accurate throws. It is about 11 inches long and features laces for control.' },
    {userid: '3', itemname: 'Notebooks', quantity: '500', description: 'Collection of pages bound together, typically used for writing, drawing, or note-taking.' },
    {userid: '4', itemname: 'Chemistry Equipment', quantity: '150', description: 'The tools and instruments used in laboratories for conducting experiments, measurements, and chemical reactions.' },
  ]);
};
