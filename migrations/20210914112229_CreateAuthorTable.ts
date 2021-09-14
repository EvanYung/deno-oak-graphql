// deno-lint-ignore-file no-explicit-any
import { Schema } from 'https://deno.land/x/cotton@v0.7.5/mod.ts'

export async function up(schema: Schema) {
  // Do something...
  await schema.createTable('users', (table) => {
    table.id()
    table.varchar('name')
  })
  ;(schema as any).adapter.disconnect()
}

export async function down(schema: Schema) {
  // Do something...
  await schema.dropTable('users')
  ;(schema as any).adapter.disconnect()
}
