function getBookData(req){
    return new Promise((resolve, rejact) => {
        try{
            let body = ''
            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })
        }catch(err){
            rejact(err)
        }
    })
}


module.exports = getBookData;