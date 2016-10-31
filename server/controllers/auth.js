import jwt from 'jsonwebtoken';
import User from '../models/user';
import APIError from '../helpers/APIError';
import httpStatus from 'http-status';

const config = require('../../config/env');

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res) {
  const token = jwt.sign({
    username: req.body.user.username
  }, config.jwtSecret);
  return res.json({
    token,
    username: req.body.user.username
  });
}

/**
 * Validates if a user exists with a given Id
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function checkUser(req, res, next) {
  return User.findById(req.body._id).then((found) => {
    if (found) {
      req.body.candidatePass = req.body.password; // eslint-disable-line no-param-reassign
      req.body.user = found; // eslint-disable-line no-param-reassign
      return next();
    }
    const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
    return next(err);
  });
}

/**
 * Compares candidate password with hashed password
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function checkPass(req, res, next) {
  const user = req.body.user;
  user.comparePassword(req.body.candidatePass, (errs, match) => {
    if (match) {
      return next();
    }
    const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
    return next(err);
  });
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { login, getRandomNumber, checkUser, checkPass };
