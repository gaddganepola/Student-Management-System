import axios from "axios";
import { useEffect, useState } from "react";

function Student() {
  //Logic
  const [studentid, setId] = useState("");
  const [studentName, setName] = useState("");
  const [studentAddress, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [students, setUsers] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get(
      "http://localhost:8080/api/v1/student/getAll"
    );
    setUsers(result.data);
    console.log(result.data);
  }

  async function save(event) {
    event.preventDefault();

    // Validate inputs
    if (!studentName || !studentAddress || !mobile) {
      alert("Please fill out all fields.");
      return;
    }

    if (mobile.length !== 10 || isNaN(mobile)) {
      alert("Mobile number should be a 10-digit number.");
      return;
    }

    try {
      // Check if mobile number already exists
      const response = await axios.get(
        `http://localhost:8080/api/v1/student/check/${mobile}`
      );

      // Ensure response.data.exists is correctly handled
      if (response.data == true) {
        alert("Mobile number already registered.");
        return;
      }

      // If mobile number doesn't exist, proceed with registration
      await axios.post("http://localhost:8080/api/v1/student/save", {
        studentName: studentName,
        studentAddress: studentAddress,
        mobile: mobile,
      });

      alert("Student Registration Successfully");

      // Clear form fields
      setId("");
      setName("");
      setAddress("");
      setMobile("");

      // Reload data (assuming Load() function handles this)
      Load();
    } catch (err) {
      console.error("Error checking mobile number or saving student:", err);
      alert("User Registration Failed");
    }
  }

  async function editStudent(students) {
    setName(students.studentName);
    setAddress(students.studentAddress);
    setMobile(students.mobile);
    setId(students.id);
  }

  async function DeleteStudent(studentid) {
    try {
      const studentDetails = await axios.get(
        "http://localhost:8080/api/v1/student/search/" + studentid
      );

      // Display confirmation dialog
      const confirmed = window.confirm(
        "Are you sure you want to delete this student " +
          studentDetails.data.studentName +
          " ?"
      );

      if (confirmed) {
        // Proceed with deletion
        await axios.delete(
          "http://localhost:8080/api/v1/student/delete/" + studentid
        );

        alert("Student deleted Successfully");

        // Reload data (assuming Load() function handles this)
        Load();
      }
    } catch (err) {
      alert("Failed to delete student");
    }
  }

  async function update(event) {
    event.preventDefault();

    // Validate inputs
    if (!studentName || !studentAddress || !mobile) {
      alert("Please fill out all fields.");
      return;
    }

    if (mobile.length !== 10 || isNaN(mobile)) {
      alert("Mobile number should be a 10-digit number.");
      return;
    }

    try {
      await axios.put(
        "http://localhost:8080/api/v1/student/edit/" + studentid,
        {
          studentName: studentName,
          studentAddress: studentAddress,
          mobile: mobile,
        }
      );
      alert("Student Details Updated");
      setId("");
      setName("");
      setAddress("");
      setMobile("");
      Load();
    } catch (err) {
      alert("Student Update Failed");
    }
  }

  //Design
  return (
    <div>
      <h1>Student Details</h1>
      <div class="container mt-4">
        <form>
          <div class="form-group">
            <label>
              <b>Student Name</b>
            </label>
            <input
              type="text"
              class="form-control"
              id="studentName"
              placeholder="Type your name here....."
              value={studentName}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>

          <div class="form-group">
            <label>
              <b>Student Address</b>
            </label>
            <input
              type="text"
              class="form-control"
              id="studentAddress"
              placeholder="Type your addresss here....."
              value={studentAddress}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>
              <b>Mobile Number</b>
            </label>
            <input
              type="text"
              placeholder="0718366241"
              className="form-control"
              id="mobile"
              value={mobile}
              onChange={(event) => {
                const { value } = event.target;
                // Allow only numbers
                const numericValue = value.replace(/[^0-9]/g, "");
                setMobile(numericValue);
              }}
              required
            />
          </div>

          <div>
            <button class="btn btn-primary mt-4" onClick={save}>
              Register
            </button>

            <button class="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br />
      <table class="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Student Name</th>
            <th scope="col">Student Address</th>
            <th scope="col">Student Mobile</th>

            <th scope="col">Option</th>
          </tr>
        </thead>
        {students.map(function fn(student) {
          return (
            <tbody>
              <tr>
                <td>{student.studentName}</td>
                <td>{student.studentAddress}</td>
                <td>{student.mobile}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editStudent(student)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
export default Student;
