const APIError = require('../helpers/APIError');
const resPattern = require('../helpers/resPattern');
const httpStatus = require('http-status');
const db = require('../server')
const cartColl = db.collection("cart")

const addCart = async (req,res, next)=>{
    try{
        const cartData = req.body;

        cartData.Total = cartData.Quantity * cartData.Price;

        const Cart = {
            items: [cartData],
            subTotal : 0           
        }

        const addToCart = await cartColl.insertOne(Cart);
        let obj = resPattern.successPattern(httpStatus.OK, addToCart.ops[0], 'Success');
        return res.status(obj.code).json(obj);

    }
    catch(e){
        return next(new APIError(`${e.message}`, httpStatus.BAD_REQUEST, true));
    }
}

const getCart = async (req,res,next) => {
    try {
        const productID = req.params.id;
        console.log("proId===========",productID);
        // .find({productId : productID})
        const carts = await cartColl.aggregate([
            {
            $lookup:
                {
                    from: 'product',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'cartDetails'
                }
            }
        ])
        console.log("carts============",carts);
        // const id = carts[0].productId;
        // if(id === productID){

        // }

    }
    catch(e){
        return next(new APIError(`${e.message}`, httpStatus.BAD_REQUEST, true));
    }
}

module.exports={
    addCart,
    getCart
}