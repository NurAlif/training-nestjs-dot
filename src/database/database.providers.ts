import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'dot',
        password: 'dot',
        database: 'dot_train_nest',
        entities: [
            User, Role,
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];