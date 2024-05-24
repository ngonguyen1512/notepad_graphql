import express from 'express'
import cors from 'cors'
import http from 'http'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4'
import mongoose from 'mongoose'
import 'dotenv/config'
import { resolvers } from './resolvers/index.js'
import { typeDefs } from './schemas/index.js'
import './firebaseConfig.js'   
import { getAuth } from 'firebase-admin/auth'

// Khai bao
const app = express();
const httpServer = http.createServer(app);

// Connect to MongoDB
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ngonguyen.vi7ecfi.mongodb.net/?retryWrites=true&w=majority&appName=ngonguyen`;
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

const authorizationJWT = async (req, res, next) => {
    console.log('abc',{ authorization: req.headers.authorization });
    // next();
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
        const accessToken = authorizationHeader.split(' ')[1]; // Sửa lại đây
        getAuth().verifyIdToken(accessToken).then((decodedToken) => {
            console.log('decodedToken', decodedToken);
            res.locals.uid = decodedToken.uid;
            next();
        }).catch((error) => {
            console.log(error);
            res.status(403).json({
                message: 'Invalid token',
            });
        });
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
}

app.use(cors(), authorizationJWT, bodyParser.json(), expressMiddleware(server, {
    context: async ({req, res})=> {
        return {
            uid: res.locals.uid
        }
    }
}));

mongoose.set('strictQuery', false);
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {   
    console.log('connected to MongoDB');
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`listening on port: http://localhost:${PORT}`);
})