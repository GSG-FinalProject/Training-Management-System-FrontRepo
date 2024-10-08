import React, { useEffect, useState } from 'react'
import '../Dashboard.css'
import axios from 'axios';
import Loading from '../../Shared/Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPenToSquare, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
export default function Trainees() {
  let [trainees,setTrainees] = useState([]);
  const[loading,setLoading] = useState(true);
  const [trainers, setTrainers] = useState([]);

  const fetchTrainer = async () => {
      try {
        const { data } = await axios.get(`https://localhost:7107/api/Trainer`);
        setTrainers(data.data);
      } catch (error) {
        console.log(error);
      }
    };
  const fetchTrainees = async ()  => {
    try{
    const { data } = await axios.get(`https://localhost:7107/api/Trainee`);
    console.log(data)
    setTrainees(data.data);
    setLoading(false)
  }
    catch(error){
     console.log(error);
     setLoading(false)
    }
  };
  const deleteTrainee = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://localhost:7107/api/Trainee/${id}`);
          // Remove the deleted trainer from the trainers array
          setTrainees((prevTrainees) => prevTrainees.filter((trainee) => trainee.id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Trainee has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting trainee:", error);
          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting the trainee.",
            icon: "error",
          });
        }
      }
    });
  };
  useEffect(() => {
    fetchTrainees();
    fetchTrainer();
  }, []);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const filteredTrainees = trainees.filter((trainee) => {
      return (
        trainee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trainee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trainee.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  // fetchTrainers();
  return (
    <>
  <div className="d-flex mt-3 mb-2 justify-content-between border-bottom py-3">
        <h1 className='ps-4 main-col'>Trainees</h1>
        <form className="me-3" role="search">
          <input
            className="form-control me-5"
            type="search"
            placeholder="Search by name/email"
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </form>
      </div>
   <div className="table-container ps-3">
   {loading ? (
          <Loading/> 
        ) : (
    <table className="table table-hover bg-transparent ">
  <thead>
    <tr className='bg-transparent '>
      <th scope="col">#</th>
      <th scope="col">First name</th>
      <th scope="col">Last name</th>
      <th scope="col">Email</th>
      <th scope='col'>Trainer Name</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {filteredTrainees.length?(filteredTrainees.map((trainee,index) => {
      const trainer = trainers.find(trainer => trainer.id === trainee.trainerId);
      return(
      <tr key={trainee.id}>
        <th scope="row">{++index}</th>
        <td>{trainee.firstName}</td>
        <td>{trainee.lastName}</td>
        <td>{trainee.email}</td>
        <td>{trainer ? `${trainer.firstName} ${trainer.lastName}` : 'No Training Field'}</td>
        <td>
        <div className="dropdown">
  <button className="border-0 bg-transparent dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  <FontAwesomeIcon icon={faEllipsisVertical} />
  </button>
  <ul className="dropdown-menu">
  <li className='d-flex justify-content-center align-items-center'><Link className="dropdown-item text-warning" to={`/dashboard/editTrainee/${trainee.id}`}><FontAwesomeIcon icon={faPenToSquare} className='px-1' />Update</Link></li>    <li className='d-flex justify-content-center align-items-center'> <button
                              className="dropdown-item text-danger"
                              onClick={() => deleteTrainee(trainee.id)}
                            ><FontAwesomeIcon icon={faUserXmark} className='px-1'/>Delete</button></li>
  </ul>
</div>

        </td>
      </tr>
    )})):<tr>
              <td colSpan="7">No Trainees</td>
            </tr>}
  </tbody>
</table>)}
   </div>
    
 </>
  )
}
