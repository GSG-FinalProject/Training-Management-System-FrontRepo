import React, { useContext, useEffect, useState } from 'react'
import '../Dashboard.css'
import axios from 'axios';
import Loading from '../../Shared/Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPenToSquare, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../Context/UserContext';
export default function Trainings() {
    let {userToken,setUserToken} = useContext(UserContext);
  let [trainings,setTrainings] = useState([]);
  const[loading,setLoading] = useState(true);
  const fetchTrainings = async ()  => {
    try{
    const { data } = await axios.get(`https://localhost:7107/api/TrainingField`);
    console.log(data)
    setTrainings(data.data);
    setLoading(false)
  }
    catch(error){
     console.log(error);
     setLoading(false)
    }
  };
  const deleteTraining = async (id) => {
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
          await axios.delete(`https://localhost:7107/api/TrainingField/${id}`, {
            headers: {
              'Authorization': `Bearer ${userToken}`, // Include Bearer token in headers
            },
          });
          // Remove the deleted trainer from the trainers array
          setTrainings((prevTraining) => prevTraining.filter((training) => training.id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Training has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting training:", error);
          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting the training.",
            icon: "error",
          });
        }
      }
    });
  };
  useEffect(() => {
    fetchTrainings();
  }, []);
  // fetchTrainers();
  return (
    <>
   <h1 className='ps-4 py-3'>Trainings</h1>
   <div className="table-container ps-3">
   {loading ? (
          <Loading/> 
        ) : (
    <table className="table table-hover bg-transparent ">
  <thead>
    <tr className='bg-transparent '>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {trainings.length?(trainings.map((training,index) => (
      <tr key={training.id}>
        <th scope="row">{++index}</th>
        <td>{training.name}</td>
        <td>{training.description}</td>

        <td>
        <div className="dropdown">
  <button className="border-0 bg-transparent dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  <FontAwesomeIcon icon={faEllipsisVertical} />
  </button>
  <ul className="dropdown-menu">
  <li className='d-flex justify-content-center align-items-center'><Link className="dropdown-item text-warning" to={`/dashboard/editTraining/${training.id}`}><FontAwesomeIcon icon={faPenToSquare} className='px-1' />Update</Link></li>    <li className='d-flex justify-content-center align-items-center'> <button
                              className="dropdown-item text-danger"
                              onClick={() => deleteTraining(training.id)}
                            ><FontAwesomeIcon icon={faUserXmark} className='px-1'/>Delete</button></li>
  </ul>
</div>

        </td>
      </tr>
    ))):<tr>
              <td colSpan="7">No Trainings</td>
            </tr>}
  </tbody>
</table>)}
   </div>
    
 </>
  )
}
