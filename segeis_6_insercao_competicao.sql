-- Schema segeis_6
USE segeis_6 ;

-- Tabela pessoa
INSERT INTO pessoa
(id_pessoa,
nome_completo,
email,
cpf)
VALUES
(1, 'Ricardo Evangelista dos Santos', 'Ricardo@gmail.com', '09349302801'),
(2, 'Suzana Vieira dos Santos', 'Suzana@gmail.com', '98456947815'),
(3, 'Fernando Lopes Almeida', 'Fernando@gmail.com', '78968412892'),
(4, 'Rafael Rodrigues de Souza', 'Rafael@gmail.com', '35714895215'),
(5, 'Ana Clara Mendonça', 'Ana@gmail.com', '78942635156');

-- Tabela perfil

INSERT INTO perfil
(id_perfil,
titulo_perfil)
VALUES
(1, 'Administrador'),
(2, 'Vendedor'),
(3, 'Validador');

-- Tabela usuario

INSERT INTO usuario
(id_usuario,
senha,
pessoa_id_pessoa,
perfil_id_perfil,
criador_id_usuario)
VALUES
(1, md5('a1b2c3'), 1, 1, NULL),
(2, md5('f79081'), 2, 2, 1),
(3, md5('l9x72'), 3, 3, 1),
(4, md5('kc89l1'), 4, 1, 1),
(5, md5('09xj21'), 5, 2, 1);

INSERT INTO evento
(id_evento,
titulo_evento,
capacidade,
dt_inicio,
dt_fim,
criador_id_usuario)
VALUES
(1, 'O grande Show', 5000, '2025-09-08', '2025-09-11', 1);

-- Tabela setor

INSERT INTO setor
(id_setor,
titulo_setor,
capacidade,
evento_id_evento)
VALUES
(1, 'VIP', 100, 1),
(2, 'Imprensa', 200, 1),
(3, 'Publico Geral', 4700, 1);

-- Tabela ingresso

INSERT INTO ingresso
(id_ingresso,
codigo,
situacao,
dt_validacao,
setor_id_setor,
pessoa_id_pessoa,
criador_id_usuario,
validador_id_usuario)
VALUES
(1, 'A4B5C8', 'Emitido', NULL, 1, 1, 1, NULL),
(2, 'B7H1K9', 'Validado',  NULL, 2, 2, 1,  NULL),
(3, 'O9B1Z1', 'Emitido', NULL, 3, 3, 2, NULL),
(4, 'M7X2A8', 'Cancelado', NULL, 1, 4, 1, NULL),
(5, 'K5V8U9', 'Validado', '2025-09-08', 2, 5, 2, 3);

