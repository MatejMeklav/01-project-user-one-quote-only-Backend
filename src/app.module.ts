import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './users/auth/auth.module';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CacheModule.register({ ttl: 300, isGlobal: true }),
    QuotesModule,
    QuotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
