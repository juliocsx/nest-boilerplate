import {
    Column,
    DataType,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Sequelize,
    Table,
  } from 'sequelize-typescript';
import { Student } from '../student/student.schema';
  
  @Table({ tableName: 'auth' })
  export class Auth extends Model<Auth> {
    @PrimaryKey
    @Column({
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      allowNull: false,
    })
    id: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    token: string;
  
    @Default(true)
    @Column({
      type: DataType.BOOLEAN,
      allowNull: false,
    })
    active: boolean;
  
    @ForeignKey(() => Student)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    student_id: string;
  }
  