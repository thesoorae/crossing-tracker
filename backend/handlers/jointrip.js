const trip = require('../../database/tripHelpers');

module.exports = (req, res) => {
  const usertripinfo = [req.state.sid.user_id, req.payload.trip_id];
  trip.getusertripbytripisuserid(usertripinfo, (error, res1) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('get user trip by trip id user id error :',error)
      res().code(500)

    }
    if (res1.rows.length > 0) {
      res({
        msg: 'User is already in this Trip'
      }).code(401)
    } else {
      trip.gettripbytripid(req.payload, (error, result) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.log('get trip by trip id error :',error)
          res().code(500)

        }
        trip.getusertripbytripid(req.payload, (error, result2) => {
          if (error) {
            // eslint-disable-next-line no-console
            console.log('get user trip by trip id error :',error)
            res().code(500)

          }
          if (result2.rows.length < result.rows[0].available_seats) {
            trip.addtripuser(usertripinfo, (error) => {
              if (error) {
                // eslint-disable-next-line no-console
                console.log('add trip user error:',error)
                res().code(500)

              }
              res({
                msg: 'Trip added successfully'
              }).code(200)
            })
          } else {
            res({
              msg: 'No Available Seats in this Trip'
            }).code(400)
          }
        })
      })
    }
  })
}
