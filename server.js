const express = require("express");
const mongoose = require("mongoose");
const Apis = require("./models/apiModel");
const cors = require('cors');


const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: 'http://127.0.0.1:8000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));



//default route
app.get("/", (req, res) => {
  res.send("API WORKING SUCCESS");
});


//create

app.post("/api", async (req, res) => {
  try {
    const api = await Apis.create(req.body);
    res.status(200).json(api);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//read
app.get("/api", async (req, res) => {
  try {
    const api = await Apis.find({});
    res.status(200).json(api);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update
app.put("/api/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const api = await Apis.findByIdAndUpdate(id, req.body);

    if (!api) {
      return res
        .status(404)
        .json({ message: `cannot find any Bus with ID ${id}` });
    }
    const updatedApi = await Apis.findById(id);
    res.status(200).json(updatedApi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//delete


//search
app.get("/api/:systemname", async (req, res) => {
  try {
    const { systemname } = req.params;
    const api = await Apis.find({ systemname: systemname });

    if (api.length === 0) {
      return res
        .status(404)
        .json({ message: "No Api method matching records found" });
    }

    res.status(200).json(api);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get("/api/:description", async (req, res) => {
  try {
    const { description } = req.params;
    const api = await Apis.find({ description: description });

    if (api.length === 0) {
      return res
        .status(404)
        .json({ message: "No Api description matching records found" });
    }

    res.status(200).json(api);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://jpvaldez:jpvaldez@cluster.v93vxte.mongodb.net/api"
    /* "mongodb+srv://busreservation:busreservation4D@cluster0.mck9kkm.mongodb.net/OnlineBusTicketReservationSystem" */
  )
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(3000, () => {
      console.log(`Node API app is running on port 3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
