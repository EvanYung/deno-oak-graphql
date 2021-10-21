import { Model, DataTypes } from 'deps'
import Quote from './Quote.ts'

class Author extends Model {
  static table = 'author'
  static timestamps = true
  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }

  static quotes() {
    return this.hasMany(Quote)
  }
}

export default Author
