import ticketListReducer from '../../reducers/ticket-list-reducer';
import * as c from './../../actions/ActionTypes';
import { formatDistanceToNow } from 'date-fns';

describe('ticketListReducer', () => {
  
  const currentState = {
    1: {
      names:'Ryan & Aimen',
      location: '4b',
      issue: 'Redux action is not working correctly.',
      id: 1 
    }, 2: {
      names: 'Jasmine and Justine',
      location: '2a',
      issue: 'Reducer has side effects.',
      id: 2 
    }
  }

  let action;
  const ticketData = {
    names: 'Ryan & Aimen',
    location: '4b',
    issue: 'Redux action is not working correctly.',
    timeOpen: new Date(),
    formattedWaitTime: formatDistanceToNow(new Date(), {addSuffix: true}),
    id: 1
  };
  
  test('Should successfully delete a ticket', () => {
    action = {
      type: c.DELETE_TICKET,
      id: 1
    };
    expect(ticketListReducer(currentState, action)).toEqual({
      2: {
        names: 'Jasmine and Justine',
        location: '2a',
        issue: 'Reducer has side effects.',
        id: 2 
      }
    });
  });

  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(ticketListReducer({}, { type: null })).toEqual({});
  });
  
  test('Should add a new ticket to mainTicketList that includes date-fns-foratted wait times', () => {
    const { names, location, issue, timeOpen, formattedWaitTime, id } = ticketData;
    action ={
      type: c.ADD_TICKET,
      names: names,
      location: location,
      issue: issue,
      timeOpen: timeOpen,
      formattedWaitTime: formattedWaitTime,
      id: id
    };
    expect(ticketListReducer({}, action)).toEqual({
      [id] : {
        names: names,
        location: location,
        issue: issue,
        timeOpen: timeOpen,
        formattedWaitTime: 'less than a minute ago',
        id: id
      }
    });
  });
  test('Should add a formmatted wait time to Ticket entry', () => {
    const { names, location, issue, timeOpen, id }= ticketData;
    action = {
      type: c.UPDATE_TIME,
      formattedWaitTime: '4 minutes ago',
      id: id
    };
    expect(ticketListReducer({ [id] : ticketData }, action)).toEqual({
      [id] : {
        names: names,
        location: location,
        issue: issue,
        timeOpen: timeOpen,
        id: id,
        formattedWaitTime: '4 minutes ago'
      }
    });
  });
  
});