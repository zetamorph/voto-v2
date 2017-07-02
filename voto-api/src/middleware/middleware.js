module.exports = () => {
  return {
    setHeaders: (req,res,next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Auth");
      res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
      if (req.method === "OPTIONS") {
        res.send(200);
      }
      else {
        next();
      }
    }
  };
};
