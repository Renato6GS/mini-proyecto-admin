INSERT INTO tbl_Persona (cui, nombre, apellidos, fecha_nacimiento, genero, direccion)
VALUES ('100', 'Gustavo', 'Santos', '2000-10-10', 'Masculino', 'Zacapa');

INSERT INTO tbl_profesor (id_persona, especialidad, experiencia_academica)
VALUES (1, 'Ingeniero en sistemas', 'Ingeniería');

INSERT INTO tbl_nivel_academico (nombre_de_grado)
VALUES ('Primer semestre');

INSERT INTO dbo.tbl_curso (nombre_curso, descripcion, id_profesor, id_nivel_academico)
VALUES ('Programación 1', 'Curso de introducción a la programación', 1, 1);

INSERT INTO dbo.tbl_curso (nombre_curso, descripcion, id_profesor, id_nivel_academico)
VALUES ('Programación 2', 'Curso avanzado de programación', 1, 1);

INSERT INTO dbo.tbl_curso (nombre_curso, descripcion, id_profesor, id_nivel_academico)
VALUES ('Programación 3', 'Curso de programación de alto nivel', 1, 1);

INSERT INTO dbo.tbl_curso (nombre_curso, descripcion, id_profesor, id_nivel_academico)
VALUES ('Algoritmos', 'Curso sobre diseño y análisis de algoritmos', 1, 1);

INSERT INTO dbo.tbl_curso (nombre_curso, descripcion, id_profesor, id_nivel_academico)
VALUES ('Base de datos 1', 'Introducción a las bases de datos', 1, 1);

INSERT INTO dbo.tbl_curso (nombre_curso, descripcion, id_profesor, id_nivel_academico)
VALUES ('Base de datos 2', 'Curso avanzado de bases de datos', 1, 1);

INSERT INTO dbo.tbl_curso (nombre_curso, descripcion, id_profesor, id_nivel_academico)
VALUES ('Redes 1', 'Introducción a las redes de computadoras', 1, 1);

INSERT INTO dbo.tbl_curso (nombre_curso, descripcion, id_profesor, id_nivel_academico)
VALUES ('Redes 2', 'Curso avanzado sobre redes de computadoras', 1, 1);

INSERT INTO dbo.tbl_curso (nombre_curso, descripcion, id_profesor, id_nivel_academico)
VALUES ('Sistemas operativos 1', 'Introducción a los sistemas operativos', 1, 1);

INSERT INTO dbo.tbl_curso (nombre_curso, descripcion, id_profesor, id_nivel_academico)
VALUES ('Sistemas operativos 2', 'Curso avanzado de sistemas operativos', 1, 1);

INSERT INTO dbo.tbl_curso (nombre_curso, descripcion, id_profesor, id_nivel_academico)
VALUES ('Ingeniería de software', 'Curso sobre principios y prácticas de la ingeniería de software', 1, 1);

INSERT INTO dbo.tbl_curso (nombre_curso, descripcion, id_profesor, id_nivel_academico)
VALUES ('Administración de teconologías de información', 'Curso sobre gestión y administración de las TI', 1, 1);

CREATE PROCEDURE sp_RegistrarEstudianteYAsignarCursos
    @cui NVARCHAR(100),
    @nombre NVARCHAR(100),
    @apellidos NVARCHAR(100),
    @fecha_nacimiento DATE,
    @genero NVARCHAR(50),
    @direccion NVARCHAR(100),
    @id_cursos NVARCHAR(100) -- Los id de los cursos deben estar separados por comas
AS
BEGIN
    BEGIN TRANSACTION;

    BEGIN TRY
        DECLARE @id_persona TABLE (id int);
        DECLARE @id_estudiante TABLE (id int);

        -- Registramos a la persona
        INSERT INTO tbl_Persona (cui, nombre, apellidos, fecha_nacimiento, genero, direccion)
        OUTPUT INSERTED.id_persona INTO @id_persona
        VALUES (@cui, @nombre, @apellidos, @fecha_nacimiento, @genero, @direccion);

        -- Creamos el estudiante
        INSERT INTO tbl_estudiante (id_persona)
        OUTPUT INSERTED.id_estudiante INTO @id_estudiante
        SELECT id FROM @id_persona;

        -- Le asignamos a los cursos
        INSERT INTO tbl_relacion_curso_estudiante (id_estudiante, id_curso)
            SELECT id, CAST(value AS INT) FROM @id_estudiante
            CROSS JOIN STRING_SPLIT(@id_cursos, ',');

        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        PRINT ERROR_MESSAGE();
    END CATCH;
END;

EXEC sp_RegistrarEstudianteYAsignarCursos '101', 'Renato', 'Granados', '2000-08-10', 'Masculino', 'Zacapa', '1,2,3';


-- Fuera del procedimiento, así se consulta a los estudiantes a nivel de base de datos
SELECT per.cui, per.nombre, per.apellidos, per.genero, per.direccion, per.fecha_nacimiento,
	est.id_estudiante, cur.nombre_curso
FROM tbl_Persona as per
INNER JOIN tbl_Estudiante as est
ON est.id_persona = per.id_persona
INNER JOIN tbl_relacion_curso_estudiante as rel
ON rel.id_estudiante = est.id_estudiante
INNER JOIN tbl_curso as cur
ON cur.id_curso = rel.id_curso
WHERE per.cui = '102';