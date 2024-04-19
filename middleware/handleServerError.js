const handleError = async (err, req, res, next) => {
    try {
      let errArray = err.errors;
      if (errArray) {
        const dataa = Object.values(errArray);
        
        // it converts the collection of objects object into a single array
        // console.log([errArray]); // all this is done to send error in a array form so that loop use gari each error display garna sajio hos
        // console.log(dataa[1].properties);
  
        if (err.name === "ValidationError") {
          return res.status(400).send(err.name);
        }
      
        return res.status(500).send({ msg: "server Error", error: err });
      }
    } catch (err) {
      // return res.send({ msg: err });
      
      console.log(err);
    }
  };
  
  module.exports = handleError;
  /**
         * err error format below
         {
        "errors": {
            "title": {
                "name": "ValidatorError",
                "message": "Path `title` is required.",
                "properties": {
                    "message": "Path `title` is required.",
                    "type": "required",
                    "path": "title"
                },
                "kind": "required",
                "path": "title"
            }
        },
        "_message": "jobs validation failed",
        "name": "ValidationError",
        "message": "jobs validation failed: title: Path `title` is required."
    }
         * 
         * 
         */
  