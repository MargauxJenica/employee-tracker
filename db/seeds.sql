-- Seeds for schema
INSERT INTO department (name)
VALUES ("Human Resources"),
       ("Sales"),
       ("Marketing"),
       ("Engineering");


INSERT INTO roles (title, salary, department_id)
VALUES ("Human Resource Manager", 170000, 1), -- 1
       ("Recruiter", 150000, 1), -- 2
       ("Sales Consultant", 150000, 2), -- 3
       ("Sales Representative", 100000, 2), -- 4
       ("Marketing Coordinator", 120000, 3), -- 5
       ("Communications Manager", 170000, 3), -- 6
       ("Software Engineer", 240000, 4), -- 7
       ("DevOps Engineer", 220000, 4); -- 8

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Margaux", "Santos", 4, null),
       ("Justin", "Santillan", 6, null),
       ("Guster", "Burton", 3, null),
       ("Shawn", "Spencer", 6, null),
       ("Sheldon", "Cooper", 7, null),
       ("David", "Rose", 4, null),
       ("Patrick", "Brewer", 5, 6),
       ("Monk", "Adrian", 4, null),
       ("Sharon", "Fleminng", 1, null),
       ("Natalie", "Teeger", 2, 1),
       ("Luna", "Lovegood", 8, null);