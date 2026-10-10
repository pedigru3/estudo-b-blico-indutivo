exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable(
    "daily_readings",
    {
      id: {
        type: "serial",
        primaryKey: true,
      },
      day_number: {
        type: "integer",
        notNull: true,
        unique: true,
      },
      book: {
        type: "varchar(50)",
        notNull: true,
      },
      passage: {
        type: "varchar(100)",
        notNull: true,
      },
      is_completed: {
        type: "boolean",
        notNull: true,
        default: false,
      },
      completed_at: {
        type: "timestamptz",
      },
      created_at: {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
      updated_at: {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    },
    { ifNotExists: true },
  )

  pgm.createTable(
    "reading_plan_settings",
    {
      key: {
        type: "varchar(50)",
        primaryKey: true,
      },
      value: {
        type: "text",
        notNull: true,
      },
      updated_at: {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    },
    { ifNotExists: true },
  )
}

exports.down = (pgm) => {
  pgm.dropTable("daily_readings", { ifExists: true })
  pgm.dropTable("reading_plan_settings", { ifExists: true })
}
