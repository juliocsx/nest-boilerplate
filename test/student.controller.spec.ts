// student.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from '../src/modules/student/student.controller';
import { StudentService } from '../src/modules/student/student.service';

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [StudentService],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve criar um novo estudante', () => {
    const result = controller.createStudent({ name: 'George', age: 30, course: 'Engenharia' });
    expect(result).toEqual(expect.objectContaining({ name: 'George', age: 30, course: 'Engenharia' }));
  });

  it('deve retornar todos os estudantes', () => {
    controller.createStudent({ name: 'Harry', age: 27, course: 'Medicina' });
    controller.createStudent({ name: 'Ivy', age: 22, course: 'Direito' });
    const students = controller.getAllStudents();
    expect(students.length).toBe(2);
  });

  it('deve retornar um estudante pelo ID', () => {
    const student = controller.createStudent({ name: 'Jake', age: 18, course: 'Psicologia' });
    const foundStudent = controller.getStudentById(student.id);
    expect(foundStudent).toEqual(student);
  });

  it('deve atualizar um estudante pelo ID', () => {
    const student = controller.createStudent({ name: 'Kate', age: 24, course: 'Enfermagem' });
    const updatedStudent = controller.updateStudent(student.id, { age: 25 });
    expect(updatedStudent).toEqual(expect.objectContaining({ id: student.id, age: 25 }));
  });

  it('deve deletar um estudante pelo ID', () => {
    const student = controller.createStudent({ name: 'Leo', age: 21, course: 'Informática' });
    const deleteResult = controller.deleteStudent(student.id);
    expect(deleteResult).toBe(true);
    expect(controller.getStudentById(student.id)).toBeUndefined();
  });
});
