import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NoteDataDTO, UpdateNoteDataDTO } from './dtos/note.dto';
import { NoteService } from './note.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import type { Request as HttpRequest } from 'express';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NoteController {
  constructor(private noteService: NoteService) { }

  @Get(':id')
  async getNote(@Param('id') id: string, @Request() req: HttpRequest) {
    return await this.noteService.getNote(id, req.user!.id);
  }

  @Get()
  async getAllNotes(@Query('page') page: string, @Request() req: HttpRequest) {
    const pageNumber = Number(page);
    return await this.noteService.getAllNotes(pageNumber, req.user!.id);
  }

  @Post()
  async addNewNote(@Body() data: NoteDataDTO, @Request() req: HttpRequest) {
    return await this.noteService.addNewNote(data, req);
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string) {
    return await this.noteService.deleteNote(id);
  }

  @Patch('')
  async updateNote(@Body() data: UpdateNoteDataDTO) {
    return await this.noteService.updateNote(data);
  }
}
