import mongoose from 'mongoose';
import signale from 'signale';
import connections from 'datalayer/config/connections';

const connectionMongo = () =>
  mongoose
    .connect(connections.mongo.default.uri)
    .then(() => {
      signale.success('[MONGO] Mongo is connect');
    })
    .catch(async (mongoError) => {
      try {
        const date = new Date();
        const formatDate = date.toISOString().slice(0, 19);
        signale.fatal(`[${formatDate}] - ERROR: [${mongoError.message}]`);
        setTimeout(connectionMongo, 10000);
      } catch (error) {
        signale.fatal('connectionMongo -> error', error);
      }
    });

connectionMongo();

// When successfully connected
mongoose.connection.on('connected', function() {
  signale.success('[MONGO] Mongo prev connected');
});

// If the connection throws an error
mongoose.connection.on('error', function(err) {
  signale.fatal('[MONGO] Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
  signale.fatal('[MONGO] Mongoose default connection disconnected');
});