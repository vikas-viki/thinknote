import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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

  @Get()
  getAllNotes(@Request() req: HttpRequest) {
    return this.noteService.getAllNotes(req);
  }

  @Post()
  addNewNote(@Body() data: NoteDataDTO, @Request() req: HttpRequest) {
    return this.noteService.addNewNote(data, req);
  }

  @Delete(':id')
  deleteNote(@Param('id') id: string) {
    return this.noteService.deleteNote(id);
  }

  @Patch('')
  updateNote(@Body() data: UpdateNoteDataDTO) {
    return this.noteService.updateNote(data);
  }
}
