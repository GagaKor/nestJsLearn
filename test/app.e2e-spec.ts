import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { AppModule } from "src/app.module";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { UsersRepository } from "src/auth/users.repository";
import { typeORMConfig } from "src/configs/typeorm.config";
import * as request from "supertest";
class MockTypeOrmConfigServer implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      database: "testData",
      synchronize: true,
      dropSchema: true,
      entities: ["src/**/*.entity.ts"],
    };
  }
}

const mockTypeOrmConfigServer = new MockTypeOrmConfigServer();

describe("authController (e2e)", () => {
  let app: INestApplication;
  let usersRepository: UsersRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })

      .overrideProvider(typeORMConfig)
      .useValue(mockTypeOrmConfigServer)
      .compile();

    app = moduleFixture.createNestApplication();
    usersRepository = moduleFixture.get<UsersRepository>(UsersRepository);
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    const id = await usersRepository.createQueryBuilder("user").select("user.id").getMany();
    await usersRepository.createQueryBuilder("user").delete().where(id).execute();
  });

  describe("POST /auth", () => {
    it("201(OK) 유저 생성", async () => {
      const username = "test";
      const password = "test";
      const res = await request(app.getHttpServer()).post("/auth/signup").send({
        username,
        password,
      });

      expect(res.status).toBe(201);
    });
    it("201(OK) 로그인", async () => {
      const username = "test";
      const password = "test";
      const res = await request(app.getHttpServer()).post("/auth/signin").send({
        username,
        password,
      });
      expect(res.status).toBe(201);
    });
  });
});
