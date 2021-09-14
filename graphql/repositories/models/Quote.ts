import { Primary, Model, Column, BaseModel } from 'deps'

@Model('quote')
class Quote extends BaseModel {
  @Primary()
  id!: number

  @Column()
  authorId!: number

  @Column()
  text!: string

  @Column({ default: () => new Date() })
  createdAt!: Date
}

export default Quote
