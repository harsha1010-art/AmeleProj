import axios from "axios";
import { useEffect, useState } from "react";



export function Dashboard() {
 
  const [studentData, setStudentData] = useState([]);
  const [searchInput, setSearchInput] = useState({ fullname: '', mail: '' });
  const [foundStudent, setFoundStudent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3333/students`)
      .then((res) => setStudentData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const findStudent = () => {
    const { fullname, mail } = searchInput;
    const found = studentData.find(
      (student) => student.fullname === fullname && student.mail === mail
    );
    setFoundStudent(found);
    
  };


  return (
    <div className="dash">
      <h1>Student Search</h1>
      <div>
        <input
          type="text"
          placeholder="Full Name"
          value={searchInput.fullname}
          onChange={(e) =>
            setSearchInput({ ...searchInput, fullname: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Email"
          value={searchInput.mail}
          onChange={(e) =>
            setSearchInput({ ...searchInput, mail: e.target.value })
          }
        />
        <button onClick={findStudent}>Find Student</button>
      </div>
      {foundStudent ? (
        <div>
          <h1>{foundStudent.fullname}</h1>
          <p>Email: {foundStudent.mail}</p>
          <p>ID: {foundStudent.id}</p>
      
        </div>
      ) : (
        <p>No student found with the provided information.</p>
      )}
    </div>
  );
}

