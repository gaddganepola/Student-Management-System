package com.student.studentMS.Controller;

import com.student.studentMS.Entity.Student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.student.studentMS.Service.studentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/student")
public class StudentController {

    @Autowired
    private studentService studentService;
    @PostMapping(value = "/save")
    private String saveStudent(@RequestBody Student students) {

        studentService.saveorUpdate(students);

        return students.getId();

    }

    @GetMapping(value = "/getAll")
    private Iterable<Student> getStrudents() {

        return studentService.listAll();

    }

    @PutMapping(value = "/edit/{id}")
    private Student update(@RequestBody Student student, @PathVariable(name = "id") String id) {
        student.setId(id);
        studentService.saveorUpdate(student);
        return student;
    }

    @DeleteMapping(value = "/delete/{id}")
    private void deleteStudent (@PathVariable("id") String id) {

       studentService.deleteStudent(id);

    }

    @RequestMapping(value = "/search/{id}")
    private Student getStudentById(@PathVariable(name = "id") String id) {

        return studentService.getStudentById(id);

    }



}
