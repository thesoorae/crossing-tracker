const test = require('tape');
const server = require('../backend/server.js');
const client = require('../database/config.js');
test('POST /createtrip : test if recive the the correct Data', (t) => {

  var data ={
    user_id:1,
    tripdate:'01012017',
    time:'01:01 AM',
    location_from_id:1,
    location_to_id:2,
    passingby:'Mohammed',
    passpointtime:'01:02 AM',
    seatavailable:1,
  }

  var data1 = {
    email: 'approvedUser@gmail.com',// from db.test.js line:82
    password: 'approvedUser'// from db.test.js line:81
  }
  var  option1 = {
    method: 'POST',
    url: '/login',
    payload: data1
  }
  server.inject(option1, (response) => {
    var cookies=  response.request.response.headers['set-cookie']
    var t1 =cookies[0].split(';');
    var t2 =t1[0].split('=');
    var t3 = t2[1];
    var option = {
      method: 'POST',
      url: '/createtrip',
      payload:data,
      headers:{
        cookie:'sid='+t3
      }
    }
    server.inject(option, (res) => {
      t.equal(typeof response.request.payload,'object', 'data is object')
      server.inject(option, (response) => {
        t.deepEqual(response.request.payload,data, 'Server get the correct data')
        t.end();
      })
    })

  })
})
test('POST /createtrip : test data fields', (t) => {

  const data1 = {
    email: 'approvedUser@gmail.com',// from db.test.js line:82
    password: 'approvedUser'// from db.test.js line:81
  }
  const option1 = {
    method: 'POST',
    url: '/login',
    payload: data1
  }
  server.inject(option1, (response) => {
    var cookies=  response.request.response.headers['set-cookie']
    var t1 =cookies[0].split(';');
    var t2 =t1[0].split('=');
    var t3 = t2[1];
    let data ={
    }

    var option = {
      method: 'POST',
      url: '/createtrip',
      payload:data,
      headers:{
        cookie:'sid='+t3
      }
    }

    server.inject(option, (response) => {

      t.equal(response.statusCode, 400, 'data fields is required')

      var  data ={
        user_id:'a',
        tripdate:'01012017',
        time:'01:01 AM',
        location_from_id:1,
        location_to_id:2,
        passingby:'Mohammed',
        passpointtime:'01:02 AM',
        seatavailable:1,
      }
      var  option = {
        method: 'POST',
        url: '/createtrip',
        payload:data,
        headers:{
          cookie:'sid='+t3
        }
      }
      server.inject(option, (response) => {
        t.equal(response.statusCode, 400, 'check user_id')
        t.end();
      })
    })
  })

})

test('POST /createtrip :check duplicate trip', (t) => {
  const data1 = {
    email: 'approvedUser@gmail.com',// from db.test.js line:82
    password: 'approvedUser'// from db.test.js line:81
  }
  const option1 = {
    method: 'POST',
    url: '/login',
    payload: data1,
  }
  server.inject(option1, (response) => {
    var cookies=  response.request.response.headers['set-cookie']
    var t1 =cookies[0].split(';');
    var t2 =t1[0].split('=');
    var t3 = t2[1];
    let data ={
    }
    let option = {
      method: 'POST',
      url: '/createtrip',
      payload:data,
      headers:{
        cookie:'sid='+t3
      }
    }
    server.inject(option, (response) => {

      t.equal(response.statusCode, 400, 'data fields is required')

      data ={
        user_id:'1',
        tripdate:'01012017',
        time:'01:01 AM',
        location_from_id:1,
        location_to_id:2,
        passingby:'Mohammed',
        passpointtime:'01:02 AM',
        seatavailable:1,
      }
      option = {
        method: 'POST',
        url: '/createtrip',
        payload:data,
        headers:{
          cookie:'sid='+t3
        }
      }
      server.inject(option, (response) => {
        t.equal(response.statusCode, 400, 'trip already exists')
        client.end();
        server.stop(t.end());
      })
    })
  })
})
