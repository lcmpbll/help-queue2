import React, {useEffect, useState } from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { formatDistanceToNow } from 'date-fns';
import { API, Storage } from 'aws-amplify';
import { listTickets } from '../graphql/queries';
import { createTicket as createTicketMutation, deleteTicket as deleteTicketMutation } from '../graphql/mutations';
import { StorageGateway } from 'aws-sdk';



// class TicketControl extends React.Component

// constructor(props) {
  //   super(props);
  //   this.state = {
    //     selectedTicket: null,
    //     editing: false
    //   };
    // }
function TicketControl() {
  
  const [mainTicketList, setMainTicketList] = useState([]);
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [selectedTicket, setSeletectedTicket] = useState(null);
  const [editing, setEditing] = useState(false);
  // const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchTickets();
  }, []);
  
  async function fetchTickets() {
    const apiData = await API.graphql({ query: listTickets });
    const apiTickets = apiData.data.listTickets.items;
    await Promise.all(apiTickets.map(async(ticket) => {
      if(ticket.image){
        const url = await Storage.get(ticket.names);
        ticket.image = url;
      }
      console.log(ticket);
      return ticket;
     })
    );
    console.log(apiTickets);
    setMainTicketList(apiTickets);
  }
  
  // const updateTicketElapsedWaitTime = () => {
  //   const { dispatch } = this.props;
  //   Object.values(this.props.mainTicketList).forEach(ticket => {
  //     const newFormattedWaitTime = formatDistanceToNow(ticket.timeOpen, {addSuffix: true});
    
  //     const action = a.updateTime(ticket.id, newFormattedWaitTime);
  //     dispatch(action);
  //   });
  // }

  const handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const action = a.addTicket(ticketToEdit);
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleDeletingTicket = async (ticketToDelete) => {
    console.log(ticketToDelete.names);
    let id = ticketToDelete.id;
    const newMainTicketList = mainTicketList.filter((ticket) => ticket.id !== ticketToDelete.id);
    setMainTicketList(newMainTicketList);
    await Storage.remove(ticketToDelete.names);
    await API.graphql({query : deleteTicketMutation, variables: { input: { id }},
    });
    setSeletectedTicket(null);
  }

  const handleChangingSelectedTicket = (id) => {
    const selection = mainTicketList.filter((ticket) => ticket.id === id)[0];
    setSeletectedTicket(selection);
  }

  const handleAddingNewTicketToList = async (newTicket) => {
    console.log(newTicket);
    if(!!newTicket.image) await Storage.put(newTicket.names, newTicket.image);
    await API.graphql({ query : createTicketMutation, variables : {input: newTicket}});
    // setMainTicketList([...mainTicketList, newTicket]);
    // console.log(mainTicketList);
    fetchTickets();
    
    setFormVisibleOnPage(false);
  }

  const handleClick = () => {
  if (selectedTicket != null) {
      setFormVisibleOnPage(false);
      setSeletectedTicket(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  };

  
    let currentlyVisibleState = null;
    let buttonText = null;
    if (editing) {      
      currentlyVisibleState = <EditTicketForm ticket = {selectedTicket} 
      onEditTicket = {handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    } else if (selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket = {selectedTicket} 
      onClickingDelete = {handleDeletingTicket}
      onClickingEdit = {handleEditClick} />
      buttonText = "Return to Ticket List";
    } else if (formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={handleAddingNewTicketToList} />
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={mainTicketList}
      onTicketSelection={handleChangingSelectedTicket} />;
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }


TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

// const mapStateToProps = state => {
//   return {
//     mainTicketList: state.mainTicketList,
//     formVisibleOnPage: state.formVisibleOnPage
//   }
// }

// TicketControl = connect(mapStateToProps)(TicketControl);
export default TicketControl;



