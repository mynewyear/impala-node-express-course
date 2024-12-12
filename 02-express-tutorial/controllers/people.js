const { people } = require("../data.js");

const addPerson = (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }
  people.push({ id: people.length + 1, name: req.body.name });
  res.status(201).json({ success: true, name: req.body.name });
};

const getPeople = (req, res) => {
  console.log("Get request for People")
  res.status(200).json({ data: people });
};

const findPerson = (req, res) => {
  const wantedId = parseInt(req.params.id);
  const foundId = people.find((person) => person.id === Number(wantedId));
  if (!wantedId || !foundId) {
    return res.status(404).json({ message: "The person not found." });
  }
  return res.status(200).json(foundId);
};

const updatePerson = (req, res) => {
  const { name } = req.body;
  const wantedId = parseInt(req.params.id);
  const somePerson = people.find((person) => person.id === Number(wantedId));
  if (!req.params || !somePerson) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }

  const newPeople = people.map((person) => {
    if (person.id === Number(wantedId)) {
      person.name = name;
    }
    return person;
  });
  return res.status(200).json({ data: newPeople });
};

const deletePerson = (req, res) => {
  const wantedId = parseInt(req.params.id);
  const somePerson = people.find((person) => person.id === Number(wantedId));
  if (!req.params || !somePerson) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide the correct id" });
  }

  const newPeople = people.filter((person) => person.id != Number(wantedId));
  return res.status(200).json({ data: newPeople });
};

module.exports = {
  addPerson,
  getPeople,
  findPerson,
  updatePerson,
  deletePerson,
};
