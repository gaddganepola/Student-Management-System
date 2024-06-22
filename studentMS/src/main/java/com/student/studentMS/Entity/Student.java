package com.student.studentMS.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "students")
public class Student {

    @Id
    private String id;
    private String studentName;
    private String studentAddress;
    private String mobile;


    public Student(String id, String studentName, String studentAddress, String mobile) {
        this.id = id;
        this.studentName = studentName;
        this.studentAddress = studentAddress;
        this.mobile = mobile;
    }

    //black constructor
    public Student() {
    }

    //getter setter methods
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getStudentName() {
        return studentName;
    }
    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }
    public String getStudentAddress() {
        return studentAddress;
    }
    public void setStudentAddress(String studentAddress) {
        this.studentAddress = studentAddress;
    }
    public String getMobile() {
        return mobile;
    }
    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    //toString
    @Override
    public String toString() {
        return "Student{" +
                "id='" + id + '\'' +
                ", studentName='" + studentName + '\'' +
                ", studentAddress='" + studentAddress + '\'' +
                ", mobile='" + mobile + '\'' +
                '}';
    }


}
