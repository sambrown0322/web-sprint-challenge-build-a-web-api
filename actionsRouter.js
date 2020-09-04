const express = require("express");

const router = express.Router();

const actions = require("./data/helpers/actionModel");
const projects = require("./data/helpers/projectModel");

router.get("/", (req, res) => {
  actions
    .get()
    .then((rez) => {
      res.status(200).json(rez);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  actions
    .get(id)
    .then((rez) => {
      if (rez) {
        res.status(200).json(rez);
      } else {
        res
          .status(404)
          .json({ message: "The action with the specified ID doesn't exist" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Action info couldn't be retrieved" });
    });
});

router.get("/pa/:id", (req, res) => {
  const id = req.params.id;

  projects
    .getProjectActions(id)
    .then((rez) => {
      if (rez) {
        res.status(200).json(rez);
      } else {
        res
          .status(404)
          .json({ message: "A project with that ID doesn't exist" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  actions
    .insert(req.body)
    .then((rez) => {
      if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({
          errorMessage: "Please provide a project id, name, and description",
        });
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

  actions
    .update(id, changes)
    .then((rez) => {
      if (rez) {
        if (!req.body.project_id || !req.body.description || !req.body.notes) {
          res.status(400).json({
            errorMessage: "Please provide a project id, name, and description",
          });
        } else {
          res.status(201).json(rez);
        }
      } else {
        res
          .status(404)
          .json({ message: "An action with that ID doesn't exist" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "There was an error while saving" });
    });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  actions
    .remove(id)
    .then((rez) => {
      res.status(200).json(rez);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
module.exports = router;
