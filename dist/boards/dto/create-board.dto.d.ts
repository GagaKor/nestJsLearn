import { BoardStatus } from 'src/boards/board-status-enum';
export declare class CreateBaordDto {
    readonly title: string;
    readonly content: string;
    readonly status: BoardStatus;
    readonly categoryId: string;
}
