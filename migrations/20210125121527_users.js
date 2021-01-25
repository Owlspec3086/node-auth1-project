exports.up = async function(knex) {
  await knew.schema.createTable("users", (table) => {
      table.increments()
      table.text("username").notNull().unquie()
      table.text("password").notnull()
  })
};

exports.down = function(knex) {
  await knex.schema.dropTableIfExists("users")
};
