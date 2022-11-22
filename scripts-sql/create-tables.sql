DROP TABLES administrador, autor, editora, livro, livro_digital, livro_fisico, pedido, usuario, venda, entrega, entrega_fisica, entrega_digital;

/*
===========================================
CREATE USUARIO
===========================================
*/
CREATE TABLE usuario (
	id_usuario	INT 			AUTO_INCREMENT,
    email		VARCHAR(30)		UNIQUE,
    nome  		VARCHAR(30),
    telefone	VARCHAR(30),
    endereco	VARCHAR(30),
    senha		VARCHAR(30),

    PRIMARY KEY (id_usuario)
);

/*
===========================================
CREATE ADMINISTRADOR
===========================================
*/
CREATE TABLE administrador (
	id_usuario		INT,
    is_admin 		BOOL,
    
    PRIMARY KEY (id_usuario),
    FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

/*
===========================================
CREATE EDITORA
===========================================
*/
CREATE TABLE editora (
	id_editora		INT,
    cnpj 			VARCHAR(20)		UNIQUE,
    nome_editora	VARCHAR(20),
    
    PRIMARY KEY (id_editora)
);

/*
===========================================
CREATE LIVRO
===========================================
*/
CREATE TABLE livro (
    isbn		VARCHAR(30),
    titulo  	VARCHAR(30),
    idioma		VARCHAR(20),
    descricao	VARCHAR(80),
    preco 		INT,
    quantidade 	INT,
    id_editora 	INT,
    capa 		VARCHAR(50),

    PRIMARY KEY (isbn),
    FOREIGN KEY(id_editora) REFERENCES editora(id_editora) ON DELETE SET NULL
);

/*
===========================================
CREATE LIVRO_DIGITAL
===========================================
*/
CREATE TABLE livro_digital (
    isbn			VARCHAR(30),
    tam_arquivo		VARCHAR(30),
    tipo_fonte		VARCHAR(20),
    
    PRIMARY KEY (isbn),
    FOREIGN KEY(isbn) 	REFERENCES livro(isbn) ON DELETE CASCADE
);

/*
===========================================
CREATE LIVRO_FISICO
===========================================
*/
CREATE TABLE livro_fisico (
    isbn		VARCHAR(30),
    paginas  	INT,
    
    PRIMARY KEY (isbn),
    FOREIGN KEY(isbn) 	REFERENCES livro(isbn)	ON DELETE CASCADE
);

/*
===========================================
CREATE AUTOR
===========================================
*/
CREATE TABLE autor (
	isbn	VARCHAR(30),
    nome	VARCHAR(30),

	FOREIGN KEY(isbn) 	REFERENCES livro(isbn)	ON DELETE SET NULL
);

/*
===========================================
CREATE ENTREGA
===========================================
*/
CREATE TABLE entrega (
	cod_entrega INT AUTO_INCREMENT,
    
    PRIMARY KEY (cod_entrega)
);

/*
===========================================
CREATE ENTREGA FISICA
===========================================
*/
CREATE TABLE entrega_fisica (
	cod_entrega 		INT,
    cod_rastreamento	VARCHAR(30),
    frete 				INT,
    endereco			VARCHAR(30),
    
    FOREIGN KEY(cod_entrega)	REFERENCES entrega(cod_entrega)	ON DELETE CASCADE
);

/*
===========================================
CREATE ENTREGA DIGITAL
===========================================
*/
CREATE TABLE entrega_digital (
	cod_entrega	INT,
	email		VARCHAR(30),
    
    FOREIGN KEY(cod_entrega)	REFERENCES entrega(cod_entrega)	ON DELETE CASCADE
);

/*
===========================================
CREATE PEDIDO
===========================================
*/
CREATE TABLE pedido (
    cod_pedido 	INT	AUTO_INCREMENT,
    cod_entrega INT,
    id_usuario 	INT,
    valor_total	INT,
	situacao	VARCHAR(20),
    tipo		INT,
    
    PRIMARY KEY (cod_pedido),
    
    FOREIGN KEY(cod_entrega)	REFERENCES entrega(cod_entrega)		ON DELETE SET NULL,
	FOREIGN KEY(id_usuario)		REFERENCES usuario(id_usuario) 		ON DELETE SET NULL
);

/*
===========================================
CREATE VENDA
===========================================
*/
CREATE TABLE venda (
    cod_pedido 	INT,
    isbn		VARCHAR(30),
    quantidade 	INT,
    
    PRIMARY KEY (cod_pedido),
    
    FOREIGN KEY(cod_pedido)	REFERENCES pedido(cod_pedido)	ON DELETE CASCADE,
    FOREIGN KEY(isbn) 		REFERENCES livro(isbn) 			ON DELETE SET NULL
);