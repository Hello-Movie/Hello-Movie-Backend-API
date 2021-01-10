const dbClient = require('../models/dbClient');

const emailController = {
  subscribeEmail: async (request, response) => {
    const { email, genres } = request.body;
    if (!email) return response.json({ ok: 0, errorMessage: 'Email required.' });
    try {
      const data = await dbClient.db('test').collection('emails')
        .updateOne({ email }, { $set: { email, genres } }, { upsert: true });
      response.json(data.result);
      return console.log('Email saved to DB' + email);
    } catch (error) {
      response.json({ ok: 0, errorMessage: error });
      return console.log(error);
    }
  },
  unSubscribeEmail: async (request, response) => {
    const emailStr = request.query.email;
    try {
      const data = await dbClient.db('test').collection('emails')
        .deleteOne({email: emailStr});
      response.json(data.result);
      return console.log('Email Deleted' + email);
    } catch (error) {
      response.json({ ok: 0, errorMessage: error });
      return console.log(error);
    }
  },
};

module.exports = emailController;
