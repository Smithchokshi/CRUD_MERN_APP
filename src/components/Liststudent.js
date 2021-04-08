import React, {useState,useEffect} from 'react'
import axios from 'axios';

export default function Liststudent() {

    const [students, setStudents] = useState([]);
    const [ufirstname,setUfirstname] = useState('');
    const [ulastname,setUlastname] = useState('');
    const [uplace,setUplace] = useState('');
    const [uid,setUID] = useState('');

    const getStudents = () => {
        axios.get('http://localhost:5000/')
        .then(res=>{
            console.log(res);
            setStudents(res.data);
        })
    }

    useEffect(()=>{
        getStudents();
    },[])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/student/${id}`)
        .then(res=>{
            console.log(res);
            window.location='/';
        })
    }

    const handleModalUpdate = (e) => {
        axios.put(`http://localhost:5000/student/${uid}`,{firstname:ufirstname,lastname:ulastname,place:uplace})
        .then(res=>{
            console.log(res);
            setUfirstname('');
            setUlastname('');
            setUplace('');
            setUID('');
            window.location='/';
        })

    }

    return (
        <div>
           {
               students && students.map(row=>(
                   <div key={row._id} className="card" style={{marginLeft:'15px',marginTop:'10px',display:'inline-block',backgroundColor:'whitesmoke',padding:'15px',borderRadius:'10px'}}>
                       <div className="card-body">
                           <h2>First Name: {row.firstname}</h2>
                           <h2>Last Name: {row.lastname}</h2>
                           <h3>Place: {row.place}</h3>
                           <div className="container" style={{display:'inline'}}>
                                <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#myModal" onClick={()=>{
                                setUfirstname(row.firstname);
                                setUlastname(row.lastname);
                                setUplace(row.place);
                                setUID(row._id);
                                }}>UPDATE</button>
                                <button style={{marginLeft:'20px'}} onClick={()=>handleDelete(row._id)} className="btn btn-danger">DELETE</button>
                                <div className="modal fade" id="myModal" role="dialog">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                                            <h4 className="modal-title" >UPDATE </h4>
                                            </div>
                                            <div className="modal-body">
                                                <input 
                                                onChange={(e) => setUfirstname(e.target.value)}
                                                value={ufirstname}
                                                style={{marginBottom:'10px',
                                                fontFamily:'cursive',
                                                fontSize:'15px'}}
                                                className="form-control"
                                                placeholder="First Name"/>
                                                <input
                                                 onChange={(e)=> setUlastname(e.target.value)}
                                                 value={ulastname}
                                                 style={{marginBottom:'10px',
                                                fontFamily:'cursive',
                                                fontSize:'15px'}}
                                                 className="form-control"
                                                 placeholder="Last Name" />
                                                <input 
                                                onChange={(e) => setUplace(e.target.value)}
                                                value={uplace}
                                                style={{marginBottom:'10px',
                                                fontFamily:'cursive',
                                                fontSize:'15px'}}
                                                className="form-control"
                                                placeholder="Place" />
                                            </div>
                                            <div className="modal-footer">
                                            <button className="btn btn-warning" onClick={(e)=>{
                                               handleModalUpdate(e)
                                            }}>UPDATE</button>
                                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={()=>{
                                                setUfirstname('');
                                                setUID('');
                                                setUplace('');
                                                setUlastname('');
                                            }}>Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                       </div>
                   </div>
               ))
           } 
        </div>
    )
}
