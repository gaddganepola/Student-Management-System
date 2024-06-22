package com.student.studentMS.Service;

import com.student.studentMS.Entity.Student;
import com.student.studentMS.Repo.studentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class studentService {

    @Autowired
    private studentRepo repo;


    public void saveorUpdate(Student students){

        repo.save(students);

    }


    public Iterable<Student> listAll() {

        return this.repo.findAll();
    }

    public void deleteStudent(String id) {

        repo.deleteById(id);
    }

    public Student getStudentById(String id) {

        return repo.findById(id).get();
    }
}
