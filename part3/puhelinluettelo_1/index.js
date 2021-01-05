const express = require("express");
const app = express();
const morgan = require("morgan");
let persons = [
  {
    id: 1,
    name: "Jukka",
    phone: "43453453",
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/info", (req, res) => {
  var amount = JSON.stringify(Object.keys(persons).length);
  const d = new Date();
  res.send(`<div>Phonebook has info for ${amount} people</div>
            <div> ${d.toDateString()} ${d.toTimeString()} </div>`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    phone: body.phone,
  };
  persons = persons.concat(person);
  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  morgan(":method :url :status :res[content-length] - :response-time ms");
});
