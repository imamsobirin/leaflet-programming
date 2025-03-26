require("dotenv").config();

const express = require("express");
const { Op, Sequelize, DataTypes, where } = require("sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Koneksi ke PostgreSQL
const sequelize = new Sequelize("geo_database", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

// Cek koneksi database
sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

// Definisikan model GeoJSON
const GeoJSONFeature = sequelize.define("geojson_loading_point", {
  loader: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  shift: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  geojson: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
});

// Sinkronisasi model dengan database
(async () => {
  await sequelize.sync();
  console.log("Database synchronized");
})();

// Endpoint untuk menyimpan GeoJSON
app.post("/loading-points/collection", async (req, res) => {
  const { features } = req.body;
  if (!features || !Array.isArray(features)) {
    return res.status(400).send("Invalid GeoJSON format");
  }

  try {
    for (const feature of features) {
      await GeoJSONFeature.create({
        loader: feature.properties?.loader || "Unnamed Feature",
        date: feature.properties?.date || "1900-01-01",
        shift: feature.properties?.shift || "Unshifted",
        geojson: feature,
      });
    }
    res.status(200).send("GeoJSON saved successfully");
  } catch (error) {
    res.status(500).send("Error saving GeoJSON: " + error.message);
  }
});
app.post("/loading-points", async (req, res) => {
  const feature = req.body;

  if (!feature) {
    return res.status(400).send("Invalid GeoJSON format");
  }

  try {
    await GeoJSONFeature.create({
      loader: feature.properties?.loader || "Unnamed Feature",
      date: feature.properties?.date || "1900-01-01",
      shift: feature.properties?.shift || "Unshifted",
      geojson: feature,
    });
    res.status(200).send("GeoJSON saved successfully");
  } catch (error) {
    res.status(500).send("Error saving GeoJSON: " + error.message);
  }
});

app.get("/loading-points", async (req, res) => {
  try {
    const { date, shift, dateStart, dateEnd, loader } = req.query;
    let loadingPoints = {};
    if (dateStart && dateEnd && loader && !(date || shift)) {
      loadingPoints = await GeoJSONFeature.findAll({
        where: {
          [Op.and]: [
            Sequelize.where(Sequelize.fn("DATE", Sequelize.col("date")), {
              [Op.gte]: dateStart,
              [Op.lte]: dateEnd,
            }),
          ],
          loader,
        },
      });
    } else if (date && shift && !(dateStart || dateEnd || loader)) {
      loadingPoints = await GeoJSONFeature.findAll({
        where: {
          [Op.and]: [
            Sequelize.where(Sequelize.fn("DATE", Sequelize.col("date")), date),
          ],
          shift,
        },
      });
    } else if (dateStart && dateEnd && !(date || shift || loader)) {
      loadingPoints = await GeoJSONFeature.findAll({
        where: {
          [Op.and]: [
            Sequelize.where(Sequelize.fn("DATE", Sequelize.col("date")), {
              [Op.gte]: dateStart,
              [Op.lte]: dateEnd,
            }),
          ],
        },
      });
    }

    const geojsonCollection = {
      type: "FeatureCollection",
      name: "Loading Point",
      features: loadingPoints.map((loadingPoint) => loadingPoint.geojson), // Array of features
    };
    res.json(geojsonCollection);
  } catch (error) {
    res.status(500).send("Error retrieving loading points: " + error.message);
  }
});

app.get("/loading-point-features", async (req, res) => {
  try {
    const { date, shift, dateStart, dateEnd, loader } = req.query;
    let loadingPoints = {};
    if (dateStart && dateEnd && loader && !(date || shift)) {
      loadingPoints = await GeoJSONFeature.findAll({
        where: {
          [Op.and]: [
            Sequelize.where(Sequelize.fn("DATE", Sequelize.col("date")), {
              [Op.gte]: dateStart,
              [Op.lte]: dateEnd,
            }),
          ],
          loader,
        },
      });
    } else if (date && shift && !(dateStart || dateEnd || loader)) {
      loadingPoints = await GeoJSONFeature.findAll({
        where: {
          [Op.and]: [
            Sequelize.where(Sequelize.fn("DATE", Sequelize.col("date")), date),
          ],
          shift,
        },
      });
    } else if (dateStart && dateEnd && !(date || shift || loader)) {
      loadingPoints = await GeoJSONFeature.findAll({
        where: {
          [Op.and]: [
            Sequelize.where(Sequelize.fn("DATE", Sequelize.col("date")), {
              [Op.gte]: dateStart,
              [Op.lte]: dateEnd,
            }),
          ],
        },
      });
    }

    res.json(loadingPoints);
  } catch (error) {
    res.status(500).send("Error retrieving loading points: " + error.message);
  }
});

app.delete("/loading-points/:id", async (req, res) => {
  try {
    const deleted = await GeoJSONFeature.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deleted) {
      return res.status(200).json({
        status: "success",
        message: "GeoJSON deleted successfully",
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "GeoJSON not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error deleting GeoJSON",
      details: error.message,
    });
  }
});

app.put("/loading-points/:id", async (req, res) => {
  try {
    updatedValue = {
      loader: req.body.properties.loader || "Unnamed Feature",
      date: req.body.properties.date || "1900-01-01",
      shift: req.body.properties.shift || "Unshifted",
      geojson: req.body,
    };
    const [updatedRows] = await GeoJSONFeature.update(updatedValue, {
      where: {
        id: req.params.id,
      },
    });
    if (updatedRows == 0) {
      return res.status(404).json({
        status: "error",
        message: "Data not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Data updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error updating data",
      details: error.message,
    });
  }
});

// Jalankan server
const PORT = process.env.PORT || 3000;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
