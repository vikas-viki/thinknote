import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NoteDataDTO, UpdateNoteDataDTO } from './dtos/note.dto';
import { NoteService } from './note.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NoteController {
  constructor(private noteService: NoteService) { }

  @Get()
  getAllNotes() {
    return this.noteService.getAllNotes();
  }

  @Post()
  addNewNote(@Body() data: NoteDataDTO) {
    return this.noteService.addNewNote(data);
  }

  @Get(':id')
  getNote(@Param('id') id: string) {
    return this.noteService.getNote(id);
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
