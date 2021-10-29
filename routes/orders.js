const orderRoutes = (app, fs) => {

    // variables
    const dataPath = './data/order_data.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/orders', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/orders', (req, res) => {

        readFile(data => {
            const newOrderId = Date.now().toString();

            // add the new order
            data[newOrderId.toString()] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.send({"message": "New Order Created", "status": 200})
            });
        },
            true);
    });


    // UPDATE
    app.put('/orders/:id', (req, res) => {

        readFile(data => {

            // update the order
            const orderId = req.params["id"];
            data[orderId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.send({"message": "order got updated", "status": 200})
            });
        },
            true);
    });


    // DELETE
    app.delete('/orders/:id', (req, res) => {

        readFile(data => {

            // delete the user
            const orderId = req.params["id"];
            delete data[orderId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.send({"message": "order got removed", "status": 200})
            });
        },
            true);
    });
};

module.exports = orderRoutes;