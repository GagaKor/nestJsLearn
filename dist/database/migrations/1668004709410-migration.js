"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migration1668004709410 = void 0;
class migration1668004709410 {
    async up(queryRunner) {
        await queryRunner.query(`
                CREATE TABLE user (
                username varchar(255) NOT NULL,
                password varchar(255) NOT NULL,
                role varchar(255) NOT NULL,
                refreshToken varchar(255) DEFAULT NULL,
                createdAt timestamp(6) NOT NULL DEFAULT current_timestamp(6),
                updatedAt timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
                id varchar(255) NOT NULL,
                PRIMARY KEY (id),
                UNIQUE KEY UNIQUE_USER_username (username)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
        await queryRunner.query(`
                CREATE TABLE movie (
                id varchar(255) NOT NULL,
                title varchar(255) NOT NULL,
                year int(11) NOT NULL,
                genres varchar(255) NOT NULL,
                PRIMARY KEY (id)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4    
                `);
        await queryRunner.query(`
                CREATE TABLE category (
                categoryName varchar(255) NOT NULL,
                createdAt timestamp(6) NOT NULL DEFAULT current_timestamp(6),
                updatedAt timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
                id varchar(255) NOT NULL,
                PRIMARY KEY (id),
                UNIQUE KEY UNIQUE_CATEGORY_categoryName (categoryName)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
            `);
        await queryRunner.query(`
                CREATE TABLE lotto (
                id varchar(255) NOT NULL,
                myLotto text NOT NULL,
                createdAt timestamp(6) NOT NULL DEFAULT current_timestamp(6),
                updatedAt timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
                userId varchar(255) DEFAULT NULL,
                PRIMARY KEY (id),
                key FK_lotto_userId (userId),
                constraint FK_lotto_userId FOREIGN KEY (userId) references user (id) ON DELETE CASCADE ON UPDATE NO ACTION
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
            `);
        await queryRunner.query(`
                CREATE TABLE board (
                title varchar(255) NOT NULL,
                content varchar(255) NOT NULL,
                status varchar(255) NOT NULL,
                createdAt timestamp(6) NOT NULL DEFAULT current_timestamp(6),
                updatedAt timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
                id varchar(255) NOT NULL,
                categoryId varchar(255) DEFAULT NULL,
                userId varchar(255) DEFAULT NULL,
                PRIMARY KEY (id),
                KEY FK_board_categoryId (categoryId),
                KEY FK_board_userId (userId),
                CONSTRAINT FK_board_categoryId FOREIGN KEY (categoryId) REFERENCES category (id) ON DELETE CASCADE ON UPDATE NO ACTION,
                CONSTRAINT FK_board_userId FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE ON UPDATE NO ACTION
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
            `);
        await queryRunner.query(`
                CREATE TABLE comment (
                comment varchar(255) NOT NULL,
                username varchar(255) NOT NULL,
                createdAt timestamp(6) NOT NULL DEFAULT current_timestamp(6),
                updatedAt timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
                id varchar(255) NOT NULL,
                userId varchar(255) DEFAULT NULL,
                boardId varchar(255) DEFAULT NULL,
                PRIMARY KEY (id),
                KEY FK_comment_userId (userId),
                KEY FK_comment_boardId (boardId),
                CONSTRAINT FK_comment_boardid FOREIGN KEY (boardId) REFERENCES board (id) ON DELETE CASCADE ON UPDATE NO ACTION,
                CONSTRAINT FK_comment_userid FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE ON UPDATE NO ACTION
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4     
            `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE user (
            username varchar(255) NOT NULL,
            password varchar(255) NOT NULL,
            role varchar(255) NOT NULL,
            refreshToken varchar(255) DEFAULT NULL,
            createdAt timestamp(6) NOT NULL DEFAULT current_timestamp(6),
            updatedAt timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
            id varchar(255) NOT NULL,
            PRIMARY KEY (id),
            UNIQUE KEY UNIQUE_USER_username (username)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
        await queryRunner.query(`
            CREATE TABLE movie (
                id varchar(255) NOT NULL,
                title varchar(255) NOT NULL,
                year int(11) NOT NULL,
                genres varchar(255) NOT NULL,
                PRIMARY KEY (id)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4    
                `);
        await queryRunner.query(`
                    CREATE TABLE category (
                    categoryName varchar(255) NOT NULL,
                    createdAt timestamp(6) NOT NULL DEFAULT current_timestamp(6),
                    updatedAt timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
                    id varchar(255) NOT NULL,
                    PRIMARY KEY (id),
                    UNIQUE KEY UNIQUE_CATEGORY_categoryName (categoryName)
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
            `);
        await queryRunner.query(`
                    CREATE TABLE lotto (
                    id varchar(255) NOT NULL,
                    myLotto text NOT NULL,
                    createdAt timestamp(6) NOT NULL DEFAULT current_timestamp(6),
                    updatedAt timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
                    userId varchar(255) DEFAULT NULL,
                    PRIMARY KEY (id),
                    key FK_lotto_userId (userId),
                    constraint FK_lotto_userId FOREIGN KEY (userId) references user (id) ON DELETE CASCADE ON UPDATE NO ACTION
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
            `);
        await queryRunner.query(`
                    CREATE TABLE board (
                    title varchar(255) NOT NULL,
                    content varchar(255) NOT NULL,
                    status varchar(255) NOT NULL,
                    createdAt timestamp(6) NOT NULL DEFAULT current_timestamp(6),
                    updatedAt timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
                    id varchar(255) NOT NULL,
                    categoryId varchar(255) DEFAULT NULL,
                    userId varchar(255) DEFAULT NULL,
                    PRIMARY KEY (id),
                    KEY FK_board_categoryId (categoryId),
                    KEY FK_board_userId (userId),
                    CONSTRAINT FK_board_categoryId FOREIGN KEY (categoryId) REFERENCES category (id) ON DELETE CASCADE ON UPDATE NO ACTION,
                    CONSTRAINT FK_board_userId FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE ON UPDATE NO ACTION
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
            `);
        await queryRunner.query(`
                    CREATE TABLE comment (
                    comment varchar(255) NOT NULL,
                    username varchar(255) NOT NULL,
                    createdAt timestamp(6) NOT NULL DEFAULT current_timestamp(6),
                    updatedAt timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
                    id varchar(255) NOT NULL,
                    userId varchar(255) DEFAULT NULL,
                    boardId varchar(255) DEFAULT NULL,
                    PRIMARY KEY (id),
                    KEY FK_comment_userId (userId),
                    KEY FK_comment_boardId (boardId),
                    CONSTRAINT FK_comment_boardid FOREIGN KEY (boardId) REFERENCES board (id) ON DELETE CASCADE ON UPDATE NO ACTION,
                    CONSTRAINT FK_comment_userid FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE ON UPDATE NO ACTION
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4     
            `);
    }
}
exports.migration1668004709410 = migration1668004709410;
//# sourceMappingURL=1668004709410-migration.js.map