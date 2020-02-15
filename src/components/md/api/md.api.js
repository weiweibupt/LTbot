import myserve from '../../../service/request.js'


let login={
    loginIn:'/api/login',
    loginOut:'/api/loginOut'
}

// let shop={
//     shopList:'/api/shopList'
// }

myserve.parseRouter('login',login);
// myserve.parseRouter('shop',shop);

export default myserve;