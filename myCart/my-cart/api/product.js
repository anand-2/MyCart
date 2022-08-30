

var getAllProduct = async function(connPool){
    return new Promise((resolve, reject) => {
        let resp = {
            data: undefined,
            error: true,
            message: "Something went wrong"
        }

        connPool.query('SELECT product_id,name,description,image,price FROM "product" ', (error, results) => {
           
            if(!error && !results.rows[0])
            {
                resp = {
                    error: true,
                    message: "No product available"
                }
                reject(resp)
                return;
            }
            if (error) {
                resp = {
                    error: true,
                    message: error.message
                }
                reject(resp)
            } else {

                 var res_list = []
                for(let i=0;i<results.rows.length;i++)
                {
                    res_obj = {
                            id  : results.rows[i].product_id,
                            name :  results.rows[i].name,
                            description :  results.rows[i].description,
                            price : results.rows[i].price,
                            image :  results.rows[i].image
                    }
                   
                    res_list.push(res_obj)
                }
                
                resp = {   
                    data : res_list,
                    error: false,
                    message: "Products fetched"
                }
            }

            resolve(resp)
        })
    });
}



var getCart = async function(connPool){
    return new Promise((resolve, reject) => {
        let resp = {
            data: undefined,
            error: true,
            message: "Something went wrong"
        }

        connPool.query('select c.cart_id, c.product_id, c.quantity,p.* from cart c left join product p on p.product_id = c.product_id ', (error, results) => {
           
            if (error) {
                resp = {
                    error: true,
                    message: error.message
                }
                reject(resp)
            } else {

                resp = {   
                    data : results.rows,
                    error: false,
                    message: "Cart fetched"
                }
            }

            resolve(resp)
        })
    });
}

var insertIntoCart = async function (connPool, product_details) {

    return new Promise((resolve, reject) => {
        let resp = {
            data: undefined,
            error: true,
            message: "Something went wrong"
        }

        getCart(connPool)
        .then(cartResponse => {
            cart = cartResponse.data;
            for(let i=0; i<cart.length; i++)
            {
                if(cart[i].product_id == product_details.product_id && cart[i].cart_id == product_details.cart_id)
                {
                    product_details = {
                        cart_id : cart[i].cart_id,
                        product_id : cart[i].product_id,
                        quantity: cart[i].quantity + 1
                    }
                    updateCart(connPool, [product_details])
                    resolve({
                        message : "Added to cart"
                    })
                    return;
                }
            }
            connPool.query('INSERT INTO "cart"(cart_id,product_id,quantity,created_on,created_by) VALUES($1,$2,$3,$4,$5) RETURNING product_id', [product_details.cart_id, product_details.product_id, product_details.quantity, new Date(), 0], (error, results) => {
                if (error) {
                    resp = {
                        error: true,
                        message: error.message
                    }
                    reject(resp)
                } else {
                    resp = {
                        data: results.rows[0].id,
                        error: false,
                        message: "Added to cart"
                    }
                }
    
                resolve(resp)
            })
        })
        .catch(ex =>
        {
            reject(ex)
        });
         
    });
}

var updateCart = async function (connPool, product_details) {
    return new Promise((resolve, reject) => {
        let resp = {
            data: undefined,
            error: true,
            message: "Something went wrong"
        }
        
        let query ='';
        for(let i=0; i<product_details.length; i++)
        {
            temp_query = "update cart set quantity = " + product_details[i].quantity + " where product_id = " + product_details[i].product_id + " and cart_id  = " + product_details[i].cart_id + ";"
            query = query + temp_query;
        }
        connPool.query(query, (error, results) => {
            if (error) {
                resp = {
                    error: true,
                    message: error.message
                }
                reject(resp)
            } else {
                resp = {
                    error: false,
                    message: "Success"
                }
            }

            resolve(resp)
        })
    });
}


var DeleteCart = async function (connPool, product_details) {
    return new Promise((resolve, reject) => {
        let resp = {
            data: undefined,
            error: true,
            message: "Something went wrong"
        }
        
      
        connPool.query('delete from cart where product_id = $1 and cart_id = $2;', [product_details.product_id, product_details.cart_id], (error, results) => {
            if (error) {
                resp = {
                    error: true,
                    message: error.message
                }
                reject(resp)
            } else {
                resp = {
                    error: false,
                    message: "Success"
                }
            }

            resolve(resp)
        })
    });
}

var checkUserExist = async function(connPool , User){
    return new Promise((resolve,reject) =>{
        let resp = {
            data: undefined,
            error: true,
            message: "Username or email already exists"
        }
        connPool.query('Select * from "user" where username = $1 or email = $2 ',[User.username , User.email] ,(error,results) =>{
            if(error)
            {
                resp.error = true;
                resp.message = error.message;
                reject(resp)
            }
            else{
                if(results.rows.length==0)
                {
                    resp.error = false;
                    resp.message = "Username and email are available";
                    resolve(resp);
                }
                else
                {
                    reject(resp)
                }
            }
        })
    });
}

var insertUser = async function(connPool , User){
    return new Promise((resolve,reject)=>{
        let resp = {
            data: undefined,
            error: true,
            message: "Something went wrong"
        }
        connPool.query('Insert into "user"(username,email,firstname,lastname,pass,address) values($1,$2,$3,$4,$5,$6) RETURNING user_id',[User.username,User.email,User.firstname,User.lastname,User.pass,User.address] , (error,results)=>{
            if(error)
            {
                resp.error = true;
                resp.message = error.message
                reject(resp)
            }
            else
            {
              
                resp.data = results.rows[0].user_id;
                resp.error = false;
                resp.message = "User added succesfully"
                resolve(resp)

            }

        })

    })

}


var getCredentials = async function(connPool , email_address){
    return new Promise((resolve, reject) => {
        let resp = {
            data: undefined,
            error: true,
            message: "Something went wrong"
        }

        connPool.query('SELECT email,pass FROM "user" WHERE email = $1',[email_address] , (error, results) => {
           
            if(!error && !results.rows[0])
            {
                resp = {
                    error: true,
                    message: "Email not found"
                }
                reject(resp)
                return;
            }
            if (error) {
                resp = {
                    error: true,
                    message: error.message
                }
                reject(resp)
            } else {
                resp = {
                    data: {
                        email :  results.rows[0].email,
                        pass :  results.rows[0].pass
                    },
                    error: false,
                    message: "User detailed fetched"
                }
            }

            resolve(resp)
        })
    });
}



module.exports = [getAllProduct,getCart,insertIntoCart, updateCart,DeleteCart,checkUserExist,insertUser,getCredentials];