import React from 'react';
import  createTrip  from '../../actions/createTripsActions.js';
import { connect } from 'react-redux';
import getLocations from '../../actions/getLocationActions';
import SelectLocations from './SelectLocations.jsx';

class CreateTrip extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      tripdate: '',
      time: '',
      location_from: '',
      location_to: '',
      passing_by:'',
      pass_point_time:'',
      seatavailable: 0
    };
  }

  componentWillMount(){
    this.props.Locations();
  }

  changeTripDate(ev) {
    this.setState({tripdate: ev.target.value});
  }

  changeTime(ev) {
    this.setState({time: ev.target.value});
  }

  changeLocationFrom(ev) {
    this.setState({location_from: ev.target.value});
  }

  changeLocationTo(ev) {
    this.setState({location_to: ev.target.value});
  }

  changePassingBy(ev) {
    this.setState({passing_by: ev.target.value});
  }

  changePassingPointTime(ev) {
    this.setState({pass_point_time: ev.target.value});
  }

  changeSeatsAvailable(ev) {
    this.setState({seatavailable: ev.target.value});
  }
  clickCreateTrip(){
    this.props.TripsCreation(this.state)
    this.setState(
      {
        tripdate: '',
        time: '',
        location_from: '',
        location_to: '',
        passing_by:'',
        pass_point_time:'',
        seatavailable: 0

      }
    )
  }
  render() {
    return (
        <section className='trip-create'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-offset-1 col-md-10'>
                <h3 className='heading'>New Trip</h3>
                <span className='caption'>Insert Info about your new trip</span>
                <div className='form'>
                  <div className='form-group'>
                    <label>Trip date</label>
                    <input
                      type='date'
                      value={this.state.tripdate}
                      className='form-control'
                      onChange={this.changeTripDate.bind(this)}
                      />
                  </div>
                  <div className='form-group'>
                    <label>Time</label>
                    <input
                      type='time'
                      value={this.state.time}
                      className='form-control'
                      onChange={this.changeTime.bind(this)}
                      />
                  </div>

                  <SelectLocations
                    label='From'
                    options={this.props.locations}
                    value={this.state.location_from}
                    change={this.changeLocationFrom.bind(this)}
                    />

                  <SelectLocations
                    label='To'
                    options={this.props.locations}
                    value={this.state.location_to}
                    change={this.changeLocationTo.bind(this)}
                    />

                  <div className='form-group'>
                    <label>Passing by</label>
                    <input
                      type='text'
                      value={this.state.passing_by}
                      className='form-control'
                      onChange={this.changePassingBy.bind(this)}
                      />
                  </div>
                  <div className='form-group'>
                    <label>Passingpoint Time</label>changePassingPointTime
                    <input
                      type='time'
                      value={this.state.pass_point_time}
                      className='form-control'
                      onChange={this.changePassingPointTime.bind(this)}
                      />
                  </div>
                  <div className='form-group'>
                    <label>Seats available</label>
                    <input
                      type='number'
                      className='form-control'
                      value={this.state.seatavailable}
                      className='form-control'
                      onChange={this.changeSeatsAvailable.bind(this)}
                      />
                  </div>
                  <div className='btn-wrp-right'>
                    <button
                      type='submit'
                      className='btn btn-success'
                      onClick={this.clickCreateTrip.bind(this)}
                      >
                      Add this trip
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
    );
  }
}

const mapStateToProps = (store) => {
<<<<<<< HEAD
  return {locations: store.locations}
=======
  return {orgs: store}
>>>>>>> 5005f3a05cbb23f57c72fc691e60d2c881391ecc
}

const mapDispatchToProps = () => {
  return {
    TripsCreation  : (data) => {
      createTrip(data)
    },
    Locations: ()=>{
      getLocations();
    }
  }
}

const TripsCreation = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTrip)
export default TripsCreation;
