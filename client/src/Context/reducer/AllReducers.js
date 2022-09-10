
import {combineReducers} from 'redux';
import Logdin from "./Logdin_reducer" ;
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist' ;

const All_Reducres = combineReducers({
	Logdin:Logdin,

})


const persistConfig = {
    key: 'counter',
    storage,
};


const PersistReducer = persistReducer(persistConfig, All_Reducres);
export default PersistReducer ;


