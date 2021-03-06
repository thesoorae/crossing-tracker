import React from 'react';
import SelectLocations from './locationsOptions.jsx';
import { hashHistory } from 'react-router';
const UpdateTrip = (
  {
    userTrip,
    Update,
    changeTripDate,
    changeTime,
    changeLocationFrom,
    changeLocationTo,
    changePassingBy,
    changePassingPointTime,
    changeSeatsAvailable,
    locations,
    id,
    getData
  }
) => {
  if(!userTrip){

    return <div>Loading...</div>;
  }else{
    console.log('userTrip: ',userTrip);
  }

  return(
    <div key={id} className='col-md-offset-2 col-md-8'>
      <ul>
        <li>
          <label>Trip date</label>
          <span>
            <input
            type="date"
            className="form-control"
            value={userTrip.date}
            onChange={changeTripDate}
            />
          </span>
        </li>
        <li>
          <label>Time</label>
          <span>
            <input
              type="time"
              className="form-control"
              value={userTrip.time}
              onChange={changeTime}
            />
          </span>
        </li>
        <li>
          <label>From</label>
          <SelectLocations
            label='From'
            options={locations}
            value={userTrip.location_from}
            change={changeLocationFrom}
            />
        </li>
        <li>
          <label>To</label>
          <SelectLocations
            label='To'
            options={locations}
            value={userTrip.location_to}
            change={changeLocationTo}
            />
        </li>
        <li>
          <label>Pickup point</label>
          <span>
            <input
              type="text"
              className="form-control"
              value={userTrip.passing_by}
              onChange={changePassingBy}
            />
          </span>
        </li>
        <li>
          <label>Pickup time</label>
          <span>
            <input
              type="time"
              className="form-control"
              value={userTrip.pass_point_time}
              onChange={changePassingPointTime}
            />
          </span>
        </li>
        <li>
          <label>Seats available</label>
          <span>
            <input
              type="number"
              className="form-control"
              value={userTrip.available_seats}
              onChange={changeSeatsAvailable}
            />
          </span>
        </li>
      </ul>
      <div className='btn-wrp-right'>
        <button
          className='btn btn-default'
          onClick={() => hashHistory.push('trips')}
          >
            Cancel
        </button>
        <button
          className='btn btn-default'
          onClick={
              () => {
                return(
                  getData(),
                  hashHistory.push(`updatetrip/${id}`)
                );
              }
          }
          >
            Get Trip's Old Data
        </button>
        <button
          type='button'
          className='btn btn-default'
          onClick={
            () => {
              return(
                Update(Object.assign(userTrip, {trip_id: id})),
                hashHistory.push('trips')
              );
            }
          }
          >
          Save Trip
        </button>

      </div>
    </div>
  );

}

export default UpdateTrip;
