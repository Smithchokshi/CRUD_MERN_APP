import React, {useState,useEffect} from 'react';
import axios from 'axios';
import team from '../team.png';

export default function Inputstudent() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [place, setPlace] = useState('');

    const handleFirstName = (e) => {
        e.preventDefault();
        setFirstname(e.target.value);
    }

    const handleLastName = (e) => {
        e.preventDefault();
        setLastname(e.target.value);
    }

    const handlePlace = (e) => {
        e.preventDefault();
        setPlace(e.target.value);
    }

    const handleSubmit = () => {
        if(firstname!=='' && lastname!=='' && place!==''){
            axios.post('http://localhost:5000/students',{firstname,lastname,place})
            .then(res=>{
                console.log('successfully posted');
                setFirstname('');
                setLastname('');
                setPlace('');               
            });
            window.location = '/';
        }
    }

    return (
        <div className="row text-center">
           <div className="col-md-4">
               <form onSubmit={handleSubmit}>
                   <input required name='firstname' value={firstname} style={{marginLeft:'50px',marginTop:'20px',borderRadius:'10px',fontFamily:'Cursive,sans-serif,Gugi',fontSize:'19px'}} placeholder="First Name" className="form-control" onChange={(e)=>handleFirstName(e)
                   } />
                   <input required name="lastname" value={lastname} placeholder="Last Name" className="form-control" style={{marginLeft:'50px',marginTop:'20px',borderRadius:'10px',fontFamily:'Cursive,sans-serif,Gugi',fontSize:'19px'}} onChange={handleLastName}/>
                   <input required name='place' value={place} placeholder="Place" className="form-control" style={{marginLeft:'50px',marginTop:'20px',borderRadius:'10px',fontFamily:'Cursive,sans-serif,Gugi',fontSize:'19px'}} onChange={handlePlace}/>
                   <button style={{width:'435px',marginLeft:'50px',marginTop:'20px',backgroundColor:'#000066', color:'white', fontFamily:'Cursive,sans-serif,Gugi',outline:'none',borderRadius:'10px',fontSize:'19px'}} className="btn">CREATE</button>
               </form>
           </div>
           <div className="col-md-8">
               <img src={team} />
           </div>
        </div>
    )
}
