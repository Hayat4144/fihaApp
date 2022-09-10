const initialstate = {
    IsLogdin:false,
}

const Logdin_reducers = (state=initialstate,action)=>{
    switch (action.type) {
        case "IsLogin":
		    return {...state,IsLogdin:!state.IsLogdin};
            
    
        default:
            return state ;
    }
}

export default Logdin_reducers ;
