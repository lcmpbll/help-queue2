import { id } from 'date-fns/locale';
import * as c from './../actions/ActionTypes';

export const deleteTicket = id => ({
  type: c.DELETE_TICKET,
  id
});

export const toggleForm = () => ({
  type: c.TOGGLE_FORM,
});

export const addTicket = (ticket) => {
  const { names, location, issue, timeOpen, formattedWaitTime, id } = ticket;
  return {
    type: c.ADD_TICKET,
    names: names,
    location: location,
    issue: issue,
    timeOpen: timeOpen,
    formattedWaitTime, 
    id: id
  }
}

export const updateTime = (id, formattedWaitTime) => ({
  type: c.UPDATE_TIME,
  id: id,
  formattedWaitTime: formattedWaitTime
});