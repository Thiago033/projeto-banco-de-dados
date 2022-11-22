/*
===========================================
INSERT USUARIOS
===========================================
*/
INSERT INTO usuario(email, nome, telefone, endereco, senha) VALUES('thiagolopes@hotmail.com', 'thiago lopes', '(99) 999999999', 'rua um', 'password');

/*
===========================================
INSERT ADMINISTRADORES
===========================================
*/
INSERT INTO administrador VALUES(1, true);

/*
===========================================
INSERT EDITORAS
===========================================
*/
INSERT INTO editora VALUES(1, '11.111.111/1111-11', 'editora um');
INSERT INTO editora VALUES(2, '22.222.222/2222-22', 'editora dois');
INSERT INTO editora VALUES(3, '33.333.333/3333-33', 'editora tres');

/*
===========================================
INSERT LIVROS
===========================================
*/
INSERT INTO livro VALUES('111-1-11-111111-1', 'Titulo Livro Um'		, 'Portugues', 'Descricao livro um, descricao livro um'			, 10, 100, 1, '/public/upload/livro1.jpg');
INSERT INTO livro VALUES('222-2-22-222222-2', 'Titulo Livro Dois'	, 'English'	 , 'Descricao livro dois, Descricao livro dois'		, 20, 200, 2, '/public/upload/livro2.jpg');
INSERT INTO livro VALUES('333-3-33-333333-3', 'Titulo Livro Tres'	, 'English'	 , 'Descricao livro tres, Descricao livro tres'		, 30, 300, 2, '/public/upload/livro3.jpg');
INSERT INTO livro VALUES('444-4-44-444444-4', 'Titulo Livro Quatro'	, 'Spanish'	 , 'Descricao livro quatro, Descricao livro quatro'	, 40, 400, 3, '/public/upload/livro4.jpg');
INSERT INTO livro VALUES('555-5-55-555555-5', 'Titulo Livro Cinco'	, 'Spanish'	 , 'Descricao livro cinco, Descricao livro cinco'	, 50, 500, 3, '/public/upload/livro5.jpg');
INSERT INTO livro VALUES('666-6-66-666666-6', 'Titulo Livro Seis'	, 'Spanish'	 , 'Descricao livro seis, Descricao livro seis'		, 60, 600, 3, '/public/upload/livro6.jpg');

/*
===========================================
INSERT LIVROS DIGITAIS
===========================================
*/
INSERT INTO livro_digital VALUES('111-1-11-111111-1', '10mb', 'fonte 1');
INSERT INTO livro_digital VALUES('222-2-22-222222-2', '20mb', 'fonte 2');
INSERT INTO livro_digital VALUES('333-3-33-333333-3', '30mb', 'fonte 3');
INSERT INTO livro_digital VALUES('444-4-44-444444-4', '40mb', 'fonte 4');
/*
===========================================
INSERT LIVROS FISICOS
===========================================
*/
INSERT INTO livro_fisico VALUES('111-1-11-111111-1', 100);
INSERT INTO livro_fisico VALUES('222-2-22-222222-2', 200);
INSERT INTO livro_fisico VALUES('555-5-55-555555-5', 300);
INSERT INTO livro_fisico VALUES('666-6-66-666666-6', 400);


/*
===========================================
INSERT AUTORES
===========================================
*/
INSERT INTO autor VALUES('111-1-11-111111-1', 'Autor nome um'	 );
INSERT INTO autor VALUES('111-1-11-111111-1', 'Autor nome dois'	 );
INSERT INTO autor VALUES('111-1-11-111111-1', 'Autor nome tres'	 );
INSERT INTO autor VALUES('222-2-22-222222-2', 'Autor nome quatro');
INSERT INTO autor VALUES('222-2-22-222222-2', 'Autor nome cinco' );
INSERT INTO autor VALUES('333-3-33-333333-3', 'Autor nome seis'	 );
INSERT INTO autor VALUES('444-4-44-444444-4', 'Autor nome sete'	 );
INSERT INTO autor VALUES('555-5-55-555555-5', 'Autor nome oito'	 );
INSERT INTO autor VALUES('666-6-66-666666-6', 'Autor nome nove'	 );
INSERT INTO autor VALUES('666-6-66-666666-6', 'Autor nome dez'	 );