import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { RegistrationModule } from './registration/registration.module';
import { User } from './user/entity/user.entity';
import { Event } from './event/entity/event.entity';
import { AuthenticationModule } from './authentication/authentication.module';
import { EventModule } from './event/event.module';
import { SeatManagementModule } from './seat_management/seat_management.module';
import { Seat } from './seat_management/entity/seat.entity';
import { ReservationModule } from './reservation/reservation.module';
import { Reservation } from './reservation/entity/reservation.entity';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
@Module({
    controllers: [AppController],
    imports: [
        RegistrationModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'admin',
            password: '205205',
            database: 'tpop_testdb',
            entities: [
                User,
                Event,
                Seat,
                Reservation,
            ],
            synchronize: false,
            logging: true,
        }),
        CacheModule.register({
            isGlobal: true,
            store: redisStore,
            host: 'localhost',
            port: 6379,
        }),
        AuthenticationModule,
        EventModule,
        SeatManagementModule,
        ReservationModule,
    ]
})
export class AppModule { }
