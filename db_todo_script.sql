DROP DATABASE IF EXISTS db_todo;
CREATE DATABASE db_todo;

USE db_todo;

DROP TABLE IF EXISTS db_todo.tbl_user;
CREATE TABLE db_todo.tbl_user (
	tbl_user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    PRIMARY KEY (tbl_user_id)
);

DROP TABLE IF EXISTS db_todo.tbl_task;
CREATE TABLE db_todo.tbl_task (
	tbl_task_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(500),
    state INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    tbl_user_id INT NOT NULL,
    PRIMARY KEY (tbl_task_id),
	CONSTRAINT fk_tbl_user FOREIGN KEY (tbl_user_id) REFERENCES db_todo.tbl_user(tbl_user_id)
);

INSERT INTO db_todo.tbl_user (username, full_name)
VALUES ('ivand', 'Iván Díaz'),
       ('astridh', 'Astrid Hernández');
       
INSERT INTO db_todo.tbl_task (title, description, state, tbl_user_id)
VALUES ('Entrevista inicial con Juan Pérez', 'Realizar entrevista técnica y de habilidades con Juan Pérez', 0, 1),
       ('Revisión de CV de María García', 'Evaluar experiencia y habilidades mencionadas en el CV de María García', 1, 2),
       ('Entrevista final con Juan Pérez', 'Entrevista final con el candidato Juan Pérez', '2', 1),
       ('Llamada de seguimiento a María García', 'Contactar a María García para discutir detalles adicionales', 0, 2),
       ('Oferta de empleo a Juan Pérez', 'Preparar y enviar oferta de empleo a Juan Pérez', 0, 1);