module.exports = () => {
  return {
    setHeaders (req,res,next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access_token, Authorization");
      res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
      if (req.method === "OPTIONS") {
        res.sendStatus(200);
      }
      else {
        next();
      }
    }
  };
};
