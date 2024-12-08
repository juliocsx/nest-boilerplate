import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { StudentModule } from "./modules/student/student.module";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./modules/auth/auth.module";
import { TracingMiddleware } from "./common/middlewares/tracing.middleware";


@Module({
  imports: [
    DatabaseModule,
    StudentModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TracingMiddleware)
      .forRoutes('*')
  }
}
