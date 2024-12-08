// student-memory.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from '../src/modules/student/student.service';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentService],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve adicionar um estudante', () => {
    const student = service.addStudent('Alice', 20, 'Matemática');
    expect(student).toEqual(expect.objectContaining({ name: 'Alice', age: 20, course: 'Matemática' }));
  });

  it('deve retornar todos os estudantes', () => {
    service.addStudent('Bob', 22, 'Física');
    service.addStudent('Carol', 19, 'Química');
    const students = service.getStudents();
    expect(students.length).toBe(2);
  });

  it('deve retornar um estudante pelo ID', () => {
    const student = service.addStudent('Dan', 21, 'História');
    const foundStudent = service.getStudentById(student.id);
    expect(foundStudent).toEqual(student);
  });

  it('deve atualizar um estudante pelo ID', () => {
    const student = service.addStudent('Eve', 23, 'Biologia');
    const updatedStudent = service.updateStudent(student.id, { age: 24 });
    expect(updatedStudent).toEqual(expect.objectContaining({ id: student.id, age: 24 }));
  });

  it('deve deletar um estudante pelo ID', () => {
    const student = service.addStudent('Frank', 25, 'Geografia');
    const deleteResult = service.deleteStudent(student.id);
    expect(deleteResult).toBe(true);
    expect(service.getStudentById(student.id)).toBeUndefined();
  });
});
