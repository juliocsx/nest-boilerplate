import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from 'src/modules/auth/auth.schema';
import { Student } from 'src/modules/student/student.schema';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'host',
      port: 5432,
      username: 'username',
      password: 'password',
      database: 'database',
      models: [Student, Auth],
      autoLoadModels: true,
    }),
  ],
  providers: [],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
