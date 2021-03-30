exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (tbl) => {
      tbl.increments('user_id');
      tbl.string('name').notNullable();
      tbl.string('email').notNullable().unique();
      tbl.string('phone_number', 10).notNullable().unique();
      tbl.string('password').notNullable();
    })
    .createTable('water_schedule', (tbl) => {
      tbl.increments('water_id');
      tbl.string('water_schedule').notNullable();
    })
    .createTable('light', (tbl) => {
      tbl.increments('light_id');
      tbl.string('light_level').notNullable();
    })
    .createTable('plants', (tbl) => {
      tbl.increments('plant_id');
      tbl.string('plant_name').notNullable();
      tbl.string('species_name').notNullable();
      tbl
        .integer('water_id')
        .unsigned()
        .notNullable()
        .references('water_id')
        .inTable('water_schedule')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('light_id')
        .unsigned()
        .notNullable()
        .references('light_id')
        .inTable('light')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.string('plant_image').notNullable();
    })
    .createTable('week_days', (tbl) => {
      tbl.increments('week_day_id');
      tbl.string('week_day_name');
    })
    .createTable('my_plants', (tbl) => {
      tbl.increments('my_plant_id');
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('plant_id')
        .unsigned()
        .notNullable()
        .references('plant_id')
        .inTable('plants')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('week_day_id')
        .unsigned()
        .notNullable()
        .references('week_day_id')
        .inTable('week_days')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('my_plants')
    .dropTableIfExists('week_days')
    .dropTableIfExists('plants')
    .dropTableIfExists('light')
    .dropTableIfExists('water_schedule')
    .dropTableIfExists('users');
};
