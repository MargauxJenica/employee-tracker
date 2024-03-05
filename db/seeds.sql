-- Seeds for schema
INSERT INTO department (name)
VALUES ("Human Resources"),
       ("Sales"),
       ("Marketing"),
       ("Engineering");


INSERT INTO roles (title, salary, department_id)
VALUES ("Human Resource Manager", 170000, 1),
       ("Recruiter", 150000, 1),
       ("Sales Consultant", 150000, 2),
       ("Sales Representative", 100000, 2),
       ("Marketing Coordinator", 120000, 3),
       ("Communications Manager", 170000, 3),
       ("Software Engineer", 240000, 4);
       ("DevOps Engineer", 220000, 4);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Santos", "Margaux", 4, 3),
       ("Santillan", "Justin", 6, null),
       ("Burton", "Guster", 3, 6),
       ("Spencer", "Shawn", 6, null),
       ("Cooper", "Sheldon", 7, 8),
       ("Rose", "David", 4, 3),
       ("Brewer", "Patrick", 5, 6),
       ("Monk", "Adrian", 4, 3),
       ("Fleming", "Sharona", 1, null),
       ("Teeger", "Natalie", 2, 6),
       ("Lovegood", "Luna", 8, null),