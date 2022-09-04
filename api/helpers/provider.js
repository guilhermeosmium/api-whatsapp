import valid from './index';

function validateProvider(req, res){
    if (
        valid.Isobject(req.user)
        && valid.FieldWith(req.user.permission)
        && req.user.permission == 2
        && valid.FieldWith(req.query.provider)
    ) {
       return req.query.provider;
    } else if (
        valid.Isobject(req.user)
        && valid.FieldWith(req.user.permission)
        && req.user.permission == 1
        && valid.FieldWith(req.user.provider)
    ) {
        return req.user.provider;
    } else {
        res.status(400).send('Filters Provider Error.');
        return false;
    }
}

export default validateProvider;