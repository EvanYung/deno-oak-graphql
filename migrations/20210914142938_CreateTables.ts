import { Schema } from 'https://deno.land/x/cotton@v0.7.5/mod.ts'

export async function up(schema: Schema) {
  // Do something...
  // 创建表
  await schema.createTable('author', (table) => {
    table.id()
    table.varchar('firstName')
    table.varchar('lastName')
    table.datetime('createdAt').default(new Date())
    table.timestamps()
  })

  await schema.createTable('quote', (table) => {
    table.id()
    table.integer('authorId')
    table.text('text')
    table.datetime('createdAt').default(new Date())
    table.timestamps()
  })
}

export async function down(schema: Schema) {
  // Do something...
  await schema.dropTable(['author', 'quote'])
}
