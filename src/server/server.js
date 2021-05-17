// import {createServer , Model , RestSerializer} from 'miragejs'
// import faker from 'faker'

// faker.seed(123);

// export default function createMockServer() {
//     createServer({
//         serializers : {
//             application : RestSerializer
//         }, 
//         models : {
//             product : Model
//         },
//         routes() {
//             this.namespace = 'api';
//             this.timing = 3000;
//             this.resource('products')
//         },
//         seeds(server) {
//             [...Array(60)].forEach((_) => {
//                 server.create('product' , {
//                     id : faker.datatype.uuid(),
//                     productName : faker.commerce.productName(),
//                     image : faker.random.image(),
//                     price : faker.commerce.price(),
//                     ratings : faker.random.arrayElement([1,1.5,2,2.5,3,3.5,4,4.5,5]),
//                     description : faker.lorem.sentences(),
//                     fastDelivery : faker.datatype.boolean(),
//                     inStock : faker.datatype.boolean(),
//                     gender : faker.random.arrayElement(['Men' , 'Women' , 'Unisex' , 'Kids']),
//                     offers : faker.random.arrayElements(['Free Shipping' , 'Flat 40% OFF' , '10% Cashback on HDFC bank credit cards' , '10% OFF on all kind of prepaid transcation' , 'Buy one get one free' , 'Buy today and get 10% OFF on next purchase']) 
//                 })
//             })
//         }
//     })
// }