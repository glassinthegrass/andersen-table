module.exports = {
    resetDB: async function(req, res) {
        //get the database instance
        const db = req.app.get('db');

        try {
         await db.seed()
            //send the updated profile back to the front end. 
            res.status(200).send('db has been sucessfully reset');
        } catch (err) {
            console.log("error resetting" + err);
            res.status(500).send("Error resetting " + err);
        }
    }
};