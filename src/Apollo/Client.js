import ApolloClient from 'apollo-boost';
import { defaults, resolvers } from './LocalState';

export default new ApolloClient({
    uri: "http://localhost:4000",
    clientState: {
        defaults, resolvers
    },
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
    /*request: async operation => {
        const token = await localStorage.getItem("token");
        operation.setContext({
            header: {
                Authorization: token ? `Bearer ${token}` : ''
            }
        })
    }*/
});