import React, {useState} from "react";
import { v4 } from 'uuid';
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { formatDistanceToNow } from 'date-fns';



function NewTicketForm(props){

  function handleNewTicketFormSubmission(event) {
    event.preventDefault();
    props.onNewTicketCreation({
      names: event.target.names.value, 
      location: event.target.location.value, 
      issue: event.target.issue.value, 
      image: event.target.image.value,
    });
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleNewTicketFormSubmission}
        buttonText="Help!" />
    </React.Fragment>
  );
}

// function NewTicketForm(){

//   const initialFormState = { names: ' ', location: ' ', issue: ' '}
//   const [formData, setFormData] = useState(initialFormState);
//   // function handleNewTicketFormSubmission(event) {
//   //   event.preventDefault();
//   //   props.onNewTicketCreation({
      
//   //   });
    
//   }
  
//   return (
//     <React.Fragment>
//       <input onChange={event => setFormData({...formData, 'names': event.target.value})}
//         placeholder = 'names'
//         value = {formData.names} />
//         <input onChange={event => setFormData({...formData, 'location': event.target.value})}
//           placeholder='location'
//           value = {formData.location} />
          
//         <input onChange={event => setFormData({...formData, 'issue': event.target.value})}
//           placeholder='issue'
//           value={formData.issue} />
          
//     </React.Fragment>
//   )
  // return (
  //   <React.Fragment>
  //     <ReusableForm 
  //       formSubmissionHandler={handleNewTicketFormSubmission}
  //       buttonText="Help!" />
  //   </React.Fragment>
  // );
// }

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};


export default NewTicketForm;