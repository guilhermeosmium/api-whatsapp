import jwt from 'jsonwebtoken';
import ResponseBuilder from '../../helpers/responseBuilder';
import moment from 'moment';

export default function() {
  return function CheckAuthorization(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers.authorization;

    if (!token)
      return res.status(401).send('Alfred: Access denied. No token provided.');

    if (!token.includes('Bearer'))
      return res.status(400).send('Alfred: Access denied. Malformed token.');

    token = token.split(' ').pop();

    try {
      const decoded = jwt.verify(token, ResponseBuilder.getTokenSecret());
      req.user = decoded;

      const {limitDate} = decoded;


      if(typeof limitDate=="string" && moment().isAfter((moment(limitDate)))){
        return res.status(403).send('Alfred: Access denied. Token expired.');
      }


      // código para nível de acesso, se precisar
      // if (accessLevel > req.user.role)
      //   return res.status(401).send("Access denied. Not enough permission.");
      next();
    } catch (ex) {
      res.status(400).send('Invalid token.');
    }
  };
}
