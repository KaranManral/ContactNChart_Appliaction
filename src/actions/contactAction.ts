import * as actionTypes from './actionTypes';

export const createContact = (contact:{fname:string,lname:string,status:string}) => {
    return {
      type: actionTypes.CREATE_NEW_CONTACT,
      contact: contact
    }
  };

  export const editContact = (id:number,contact:{fname:string,lname:string,status:string}) => {
    return {
      type: actionTypes.EDIT_CONTACT,
      contact: contact,
      id:id
    }
  };

  export const deleteContact = (id:number) => {
    return {
        type: actionTypes.REMOVE_CONTACT,
        id: id
    }
}