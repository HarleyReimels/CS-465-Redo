const mongoose = require('mongoose');
const Trip = require('../models/travlr');

const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({});
    console.log(trips); // Log the retrieved trips
    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: 'No trips found' });
    }
    return res.status(200).json(trips);
  } catch (error) {
    console.error(error); // Log the error
    return res.status(500).json({ message: 'Server error' });
  }
};

const tripsUpdateTrip = async (req, res) => {
 getUser(req, res,
 (req, res) => {
 Trip
 .findOneAndUpdate({'code': req.params.tripCode },{
 code: req.body.code,
name: req.body.name,
length: req.body.length,
start: req.body.start,
resort: req.body.resort,
perPerson: req.body.perPerson,
image: req.body.image,
description: req.body.description
 }, { new: true })
 .then(trip => {
 if (!trip) {
 return res
 .status(404)
.send({
 message: "Trip not found with code" + req.params.tripCode
 });
 }
res.send(trip);
 }).catch(err => {
 if (err.kind === 'ObjectId') {
 return res
 .status(404)
.send({
 message: "Trip not found with code" + req.params.tripCode
 });
 }
return res
 .status(500) // server error
.json(err);
 });
 }
 );
}

const getUser = (req, res, callback) => {
  if (req.auth && req.auth.email) {
      userModel
          .findOne({
              email: req.auth.email
          })
          .exec((err, user) => {
              if (!user) {
                  return res
                      .status(404)
                      .json({ message: 'User not found' });
              } else if (err) {
                  console.log(err);
                  return res
                      .status(404)
                      .json(err);
              }
              callback(req, res, user.name);
          });
  } else {
      return res
          .status(404)
          .json({ message: 'User not found' });
  }
};


const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode });
    console.log(trip); // Log the retrieved trip
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    return res.status(200).json(trip);
  } catch (error) {
    console.error(error); // Log the error
    return res.status(500).json({ message: 'Server error' });
  }
};

const tripsAddTrip = async (req, res) => {
  getUser(req, res,
  (req, res) => {
  Trip
  .create({
  code: req.body.code,
 name: req.body.name,
 length: req.body.length,
 start: req.body.start,
 resort: req.body.resort,
 perPerson: req.body.perPerson,
 image: req.body.image,
 description: req.body.description
  },
  (err, trip) => {
  if (err) {
  return res
  .status(400) // bad request
 .json(err);
  } else {
  return res
  .status(201) // created
 .json(trip);
  }
  });
  }
  );
 }

module.exports = {  
  tripsList,
  tripsFindByCode,
  tripsAddTrip
};
