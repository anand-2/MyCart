


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


var getCart = async function(connPool , Card){
    return new Promise((resolve, reject) => {
        let resp = {
            data: undefined,
            error: true,
            message: "Something went wrong"
        }

        connPool.query('SELECT cart_id,product_id,,quantity FROM "cart" ', (error, results) => {
           
            if(!error && !results.rows[0])
            {
                resp = {
                    error: true,
                    message: "Cart empty"
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
                            id  : results.rows[i].cart_id,
                            name :  results.rows[i].product_id,
                            description :  results.rows[i].quantity,
                            
                    }
                   
                    res_list.push(res_obj)
                }
                
                resp = {   
                    data : res_list,
                    error: false,
                    message: "Cart fetched"
                }
            }

            resolve(resp)
        })
    });
}


module.exports = [getAllProduct,getCart];