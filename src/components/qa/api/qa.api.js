import myserve from '../../../service/request.js'


let shop={
    shopList:'/api/shop/shopList'
}

// myserve.parseRouter('login',login);
myserve.parseRouter('shop',shop);

export default myserve;