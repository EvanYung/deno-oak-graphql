import { Model, DataTypes } from 'deps'
import Author from './Author.ts'

class Quote extends Model {
  static table = 'quote'
  static timestamps = true
  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    text: DataTypes.STRING
  }
  static author() {
    return this.hasOne(Author)
  }
}

export default Quote
