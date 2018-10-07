import { Injectable } from '@nestjs/common';
import * as dbConfig from "../config/config.json"
import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
	database: dbConfig.development.database,
	dialect: dbConfig.development.dialect,
	username: dbConfig.development.username,
	password: dbConfig.development.password,
	storage: ':memory:',
	// modelPaths: [__dirname + '/**/*.model.ts']
});

@Injectable()
export class AppService {
	root(): string {
		return 'Hello World!';
	}

	conn_test() {
		sequelize
			.authenticate()
			.then(() => {
				console.log('Connection has been established successfully.');
			})
			.catch(err => {
				console.error('Unable to connect to the database:', err);
			});
	}
}
