// import React, { useEffect, useState } from 'react'
// import '../Dashboard.css'
// import axios from 'axios';
// import Loading from '../../Shared/Loading/Loading';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEllipsisVertical, faPenToSquare, faUserXmark } from '@fortawesome/free-solid-svg-icons';
// import Swal from 'sweetalert2';
// import { Link } from 'react-router-dom';
// export default function Trainers() {
//   let [trainers,setTrainers] = useState([]);
//   const[loading,setLoading] = useState(true);
//   const [trainings,setTrainings] = useState([]);

//     const fetchTrainings = async ()  => {
//         try{
//         const { data } = await axios.get(`https://localhost:7107/api/TrainingField`);
//         console.log(data)
//         setTrainings(data.data);
//       }
//         catch(error){
//          console.log(error);
//         }
//       };
//   const fetchTrainers = async ()  => {
    
//     try{
//     const { data } = await axios.get(`https://localhost:7107/api/Trainer`);
//     console.log(data)
//     setTrainers(data.data);
//     setLoading(false)
//   }
//     catch(error){
//      console.log(error);
//      setLoading(false)
//     }
//   };
//   const deleteTrainer = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`https://localhost:7107/api/Trainer/${id}`);
//           // Remove the deleted trainer from the trainers array
//           setTrainers((prevTrainers) => prevTrainers.filter((trainer) => trainer.id !== id));
//           Swal.fire({
//             title: "Deleted!",
//             text: "Your file has been deleted.",
//             icon: "success",
//           });
//         } catch (error) {
//           console.error("Error deleting trainer:", error);
//           Swal.fire({
//             title: "Error!",
//             text: "There was a problem deleting the trainer.",
//             icon: "error",
//           });
//         }
//       }
//     });
//   };
//   useEffect(() => {
//     fetchTrainers();
//     fetchTrainings();
//   }, []);
//   // fetchTrainers();

//   const [searchTerm, setSearchTerm] = useState('');
  
//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredTrainers = trainers.filter((event) => {
// const matchesSearchTerm =
//   Object.values(event).some(
//     (value) =>
//       typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
//   );
// return matchesSearchTerm ;
// });

//   return (
//     <>
//     <div className="d-flex mt-5 mb-2 justify-content-between">
//       <h1 className='ps-4 main-col'>Trainers</h1>
//                 {/* <input
//                     className="form-control w-25 col-md-4"
//                     type="search"
//                     placeholder="Search"
//                     aria-label="Search"
//                     value={searchTerm}
//                     onChange={handleSearch}
//                 /> */}
//                           <form className="d-flex" role="search"><input className="form-control me-5" type="search" placeholder="Search" aria-label="Search" /></form> 

//     </div>
   
//    <div className="table-container ps-3">
//    {loading ? (
//           <Loading/> // Display loading message
//         ) : (
//     <table className="table table-hover bg-transparent ">
//   <thead>
//     <tr className='bg-transparent '>
//       <th scope="col">#</th>
//       <th scope="col">First name</th>
//       <th scope="col">Last name</th>
//       <th scope="col">Email</th>
//       <th scope='col'>Trainig field</th>
//       <th scope='col'>Action</th>
//     </tr>
//   </thead>
//   <tbody>
//     {filteredTrainers.length?(filteredTrainers.map((trainer,index) => {
//       const trainingField = trainings.find(field => field.id === trainer.trainingFieldId);
//       return(
//       <tr key={trainer.id}>
//         <th scope="row">{++index}</th>
//         <td>{trainer.firstName}</td>
//         <td>{trainer.lastName}</td>
//         <td>{trainer.email}</td>
//         <td>{trainingField ? trainingField.name : 'No Training Field'}</td>
//         <td>
//         <td>
//         <div className="dropdown">
//   <button className="border-0 bg-transparent dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//   <FontAwesomeIcon icon={faEllipsisVertical} />
//   </button>
//   <ul className="dropdown-menu">
//     <li className='d-flex justify-content-center align-items-center'><Link className="dropdown-item text-warning" to={`/dashboard/editTrainer/${trainer.id}`}><FontAwesomeIcon icon={faPenToSquare} className='px-1' />Update</Link></li>
//     <li className='d-flex justify-content-center align-items-center'> <button
//                               className="dropdown-item text-danger"
//                               onClick={() => deleteTrainer(trainer.id)}
//                             ><FontAwesomeIcon icon={faUserXmark} className='px-1'/>Delete</button></li>
//   </ul>
// </div>

//         </td>
//         </td>
//       </tr>
//     )}
//     )):<tr>
//               <td colSpan="7">No Trainers</td>
//             </tr>}
//   </tbody>
// </table>)}
//    </div>
    
//  </>
//   )
// }


import React, { useEffect, useState } from 'react'
import '../Dashboard.css'
import axios from 'axios';
import Loading from '../../Shared/Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPenToSquare, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trainings, setTrainings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTrainings = async () => {
    try {
      const { data } = await axios.get(`https://localhost:7107/api/TrainingField`);
      console.log(data);
      setTrainings(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTrainers = async () => {
    try {
      const { data } = await axios.get(`https://localhost:7107/api/Trainer`);
      console.log(data);
      setTrainers(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteTrainer = async (id) => {
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
          await axios.delete(`https://localhost:7107/api/Trainer/${id}`);
          setTrainers((prevTrainers) => prevTrainers.filter((trainer) => trainer.id !== id));
          Swal.fire("Deleted!", "The trainer has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting trainer:", error);
          Swal.fire("Error!", "There was a problem deleting the trainer.", "error");
        }
      }
    });
  };

  useEffect(() => {
    fetchTrainers();
    fetchTrainings()
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTrainers = trainers.filter((trainer) => {
    return (
      trainer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
          <Loading /> // Display loading message
        ) : (
          <table className="table table-hover bg-transparent">
            <thead>
              <tr className='bg-transparent '>
                <th scope="col">#</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Email</th>
                <th scope='col'>Training field</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrainers.length ? (
                filteredTrainers.map((trainer, index) => {
                  const trainingField = trainings.find(field => field.id === trainer.trainingFieldId);
                  return (
                    <tr key={trainer.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{trainer.firstName}</td>
                      <td>{trainer.lastName}</td>
                      <td>{trainer.email}</td>
                      <td>{trainingField ? trainingField.name : 'No Training Field'}</td>
                      <td>
                        <div className="dropdown">
                          <button className="border-0 bg-transparent dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                          </button>
                          <ul className="dropdown-menu">
                            <li className='d-flex justify-content-center align-items-center'>
                              <Link className="dropdown-item text-warning" to={`/dashboard/editTrainer/${trainer.id}`}>
                                <FontAwesomeIcon icon={faPenToSquare} className='px-1' />Update
                              </Link>
                            </li>
                            <li className='d-flex justify-content-center align-items-center'>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => deleteTrainer(trainer.id)}
                              >
                                <FontAwesomeIcon icon={faUserXmark} className='px-1' />Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7">No Trainers</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
