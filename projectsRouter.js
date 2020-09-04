const express = require("express");

const router = express.Router();

const projects = require("./data/helpers/projectModel");

router.get("/", (req, res) => {
  projects
    .get()
    .then((rez) => {
      res.status(200).json(rez);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "Couldn't find what you were looking for." });
    });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  projects
    .get(id)
    .then((rez) => {
      if (rez) {
        res.status(200).json(rez);
      } else {
        res
          .status(404)
          .json({ message: "The project with the specified ID doesn't exist" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Project info couldn't be retrieved" });
    });
});
router.post("/", (req, res) => {
  projects
    .insert(req.body)
    .then((rez) => {
      if (!req.body.name || !req.body.description) {
        res
          .status(400)
          .json({ errorMessage: "Please provide a name and description." });
      } else {
        res.status(201).json(rez);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "There was an error while saving" });
    });
});
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const changes = req.body;
  projects
    .update(id, changes)
    .then((rez) => {
      if (rez) {
        if (!req.body.name || !req.body.description) {
          res
            .status(400)
            .json({ errorMessage: "Please provide a name and description." });
        } else {
          res.status(200).json(rez);
        }
      } else {
        res
          .status(404)
          .json({ message: "A project with that ID doesn't exist" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "There was an error while saving" });
    });
});
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  projects
    .remove(id)
    .then((rez) => {
      res.status(200).json(rez);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
