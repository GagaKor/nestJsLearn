"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Movie_entity_1 = require("./entities/Movie.entity");
const uuid_1 = require("uuid");
let MoviesService = class MoviesService {
    constructor(movieRepository) {
        this.movieRepository = movieRepository;
    }
    findAll() {
        return this.movieRepository.find();
    }
    findOne(id) {
        return this.movieRepository.findOne({
            where: { id },
        });
    }
    async deleteOne(id) {
        await this.movieRepository.delete(id);
    }
    async create(Movie) {
        const data = this.movieRepository.create({
            id: (0, uuid_1.v4)(),
            genres: Movie.genres,
            title: Movie.title,
            year: Movie.year,
        });
        await this.movieRepository.save(data);
    }
    async update(id, updateData) {
        await this.movieRepository.update(id, updateData);
    }
};
MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Movie_entity_1.Movie)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MoviesService);
exports.MoviesService = MoviesService;
//# sourceMappingURL=movies.service.js.map