import { Primary, Model, Column, BaseModel } from 'deps'

@Model('author')
class Author extends BaseModel {
  @Primary()
  id!: number

  @Column()
  firstName!: string

  @Column()
  lastName!: string

  @Column({ default: () => new Date() })
  createdAt!: Date
}

export default Author
