var bcrypt = require("bcryptjs");

module.exports = {
  registerMember: async (req, res) => {
    //get the database instance
    const db = req.app.get("db");
    const { email, password, name } = req.body;
    try {
      const [existingUser] = await db.member.get_member_by_email(email);
      if (existingUser) {
        res.status(409).send("Already Registered");
      } else {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let [member] = await db.member.register_member(email, hash, name);
        delete member.hash;
        let response = "Hooray! Your account is now registered."
        res.status(200).send({member,response});
      }
      //send the updated profile back to the front end.
      res.status(200).send("db has been sucessfully reset");
    } catch (err) {
      console.log("error creating member");
      res.status(500).send("error creating member -" + err);
    }
  },

  loginMember: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    try {
      const [user] = await db.member.get_member_by_email(email);
      if (!user) {
        res.status(403).send("Email Not Registered- check spelling/casing");
      } else {
        const isAuthenticated = bcrypt.compareSync(password, user.hash);

        if (!isAuthenticated) {
          res.status(403).send("Email");
        } else {
          delete user.hash;
          user.isLoggedIn = true;
          req.session.user = user;
          res.status(200).send(req.session.user);
        }
      }
    } catch (err) {
      res.sendStatus(500);
    }
  },
};
