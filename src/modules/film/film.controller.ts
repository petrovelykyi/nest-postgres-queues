import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Film } from '../../entities/film.entity';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { FilmService } from './film.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('film')
@Controller({ path: 'film' })
@UseGuards(JwtAuthGuard)
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Post()
  @ApiOperation({ summary: 'Create Film' })
  @ApiResponse({ status: 201, description: 'Film created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 409, description: 'Film already exists!' })
  async createFilm(@Body() createFilmDto: CreateFilmDto): Promise<Film> {
    return await this.filmService.createFilm(createFilmDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get Films' })
  @ApiResponse({ status: 200, description: 'Get all Films' })
  async getFilms(): Promise<Film[]> {
    return await this.filmService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Film' })
  @ApiResponse({ status: 200, description: 'Get a Film' })
  @ApiResponse({ status: 404, description: 'Film is not found!' })
  async getFilm(@Param('id', ParseIntPipe) id: Film['id']): Promise<Film> {
    return await this.filmService.getOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Film' })
  @ApiResponse({ status: 200, description: 'Update a Film' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Film is not found!' })
  async updateFilm(
    @Param('id', ParseIntPipe) id: Film['id'],
    @Body() updateFilmDto: UpdateFilmDto,
  ): Promise<UpdateResult> {
    return await this.filmService.update(id, updateFilmDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Get Film' })
  @ApiResponse({ status: 200, description: 'Get a Film' })
  @ApiResponse({ status: 404, description: 'Film is not found!' })
  async deleteFilm(@Param('id', ParseIntPipe) id: Film['id']): Promise<Film> {
    return await this.filmService.delete(id);
  }
}
