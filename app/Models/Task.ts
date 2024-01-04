import { DateTime } from 'luxon'
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title:string

  @column()
  public priority:"low" | "medium" | "high"

  @column()
  public user_Id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
