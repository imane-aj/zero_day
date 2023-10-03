import { configureStore} from '@reduxjs/toolkit';
import ReservationReducer from './ReservationSlice';
import BlogReducer from './BlogSlice';
import RequestReducer from './RequestSlice';
import AuthReducer from './AuthSlice'
import ServiceReducer from './ServiceSlice';
import LongTripReducer from './LongTripSlice';
import ChatReducer from './ChatSlice';
import TransferReducer from './TransferSlice';
import ClientReducer from './ClientSlice';
import VehiculeReducer from './VehiculesSlice';
import MessageReducer from './MessageSlice'
import StatisticReducer from './SatisticSlice'
import DriverReducer from './DriverSlice'

const store = configureStore({reducer:
    {
        vehicule : VehiculeReducer,
        reserv : ReservationReducer,
        blog: BlogReducer,
        req: RequestReducer,
        service : ServiceReducer,
        trip : LongTripReducer,
        auth : AuthReducer,
        chat : ChatReducer,
        transfer : TransferReducer,
        client : ClientReducer,
        message : MessageReducer,
        statistic : StatisticReducer,
        driver : DriverReducer,
    }
})
export default store