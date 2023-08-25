import * as actionTypes from '../actions/actionTypes';

export default (state = [], action:{type:string,id:number,contact:{fname:string,lname:string,status:string}}) => {
    switch (action.type){
      
      case actionTypes.CREATE_NEW_CONTACT:
      return [
        ...state,
        Object.assign({}, action.contact)
      ];
      case actionTypes.EDIT_CONTACT:
        let arr = state.filter((data:any, i:number) => i !== action.id);
        return [...arr,Object.assign({},action.contact)];
      case actionTypes.REMOVE_CONTACT:
      return state.filter((data:any, i:number) => i !== action.id);
      default:
            return state;
    }
  };