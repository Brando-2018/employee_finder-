INSERT INTO department(id, name)
VALUES
(1, "Sales"),
(2, "Engineering"),
(3, "Legal"),
(4, "Finance");

INSERT INTO role (id, title, salary, department_id)
VALUES
(1, "Sales Manager", 120000, 1),
(2, "Salesperson", 850000, 1),
(3, "Engineer Manager", 140000, 2),
(4, "Software Engineer", 125000, 2),
(5, "Legal Group Manager", 220000, 3),
(6, "Lawyer", 195000, 3),
(7, "Accountant", 111000, 4);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES
(1, "Kelly", "Sim", 1, 1),
(2, "Mikey", "Shoh", 2, 2),
(3, "Valencia", "Rodriguez", 3, 3),
(4, "Kevin", "Hunter", 4, 1),
(5, "Malia", "Brown", 5, 2),
(6, "Sarah", "Landry", 6, 3),
(7, "Tom", "Brady", 7, 2),
(8, "Sarah", "Gonzolez", 3, 3);