const helpers = require('../../database/userhelpers.js');
const user = require('../../database/userhelpers.js');
const mail = require('../../backend/utils.js');
module.exports = (req, res) => {
  const valid = req.state.sid.user_type;
  if (valid === 2) { // admin user
    helpers.deletUser(req.payload.email, (error) => {
      if (error) {
          // eslint-disable-next-line no-console
        console.log('delete User Error  :',error)
        return res().code(500)
      }

      mail.sendemail('Admin comfirmation <erezedule@gmail.com>',
        `${req.payload.email}`,
        'Admin reject your registeration',
        'Your registeration was rejected', (error, info) => {
          if (error) {
            // eslint-disable-next-line no-console
            console.log('sendmail :',error)
            return res().code(500);

          }
          user.getDisApprovedUser((error, users) => {
            if (error) {
              // eslint-disable-next-line no-console
              console.log('get DisApprovedUser Error :',error)
              return res().code(500)

            }
            res({
              message: 'reject registration',
              er: error,
              info: info,
              result: users.rows,
              statusCode:200
            })
          });
        })

    })
  } else {
    res({
      message: 'You are not admin',
      statusCode: 401
    })
  }
}
