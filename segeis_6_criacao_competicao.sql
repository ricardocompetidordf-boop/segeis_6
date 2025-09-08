-- Schema segeis_6
CREATE SCHEMA IF NOT EXISTS segeis_6 DEFAULT CHARACTER SET utf8 ;
USE segeis_6 ;

-- Tabela pessoa
CREATE TABLE IF NOT EXISTS pessoa (
  id_pessoa INT NOT NULL AUTO_INCREMENT,
  nome_completo VARCHAR(100) NOT NULL,
  email VARCHAR(45) NOT NULL,
  cpf CHAR(11) NOT NULL,
  PRIMARY KEY (id_pessoa),
  UNIQUE INDEX email_UNIQUE (email ASC),
  UNIQUE INDEX cpf_UNIQUE (cpf ASC))
ENGINE = InnoDB;


-- Tabela perfil
CREATE TABLE IF NOT EXISTS perfil (
  id_perfil INT NOT NULL AUTO_INCREMENT,
  titulo_perfil VARCHAR(20) NOT NULL,
  PRIMARY KEY (id_perfil),
  UNIQUE INDEX titulo_perfil_UNIQUE (titulo_perfil ASC))
ENGINE = InnoDB;


-- Tabela usuario
CREATE TABLE IF NOT EXISTS usuario (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  senha VARCHAR(64) NOT NULL,
  pessoa_id_pessoa INT NOT NULL,
  perfil_id_perfil INT NOT NULL,
  criador_id_usuario INT NULL,
  PRIMARY KEY (id_usuario),
  INDEX fk_usuario_pessoa_idx (pessoa_id_pessoa ASC),
  INDEX fk_usuario_perfil1_idx (perfil_id_perfil ASC),
  INDEX fk_usuario_usuario1_idx (criador_id_usuario ASC),
  UNIQUE INDEX pessoa_id_pessoa_UNIQUE (pessoa_id_pessoa ASC),
    FOREIGN KEY (pessoa_id_pessoa)
    REFERENCES pessoa (id_pessoa)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_usuario_perfil1
    FOREIGN KEY (perfil_id_perfil)
    REFERENCES perfil (id_perfil)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT fk_usuario_usuario1
    FOREIGN KEY (criador_id_usuario)
    REFERENCES usuario (id_usuario)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- Tabela evento
CREATE TABLE IF NOT EXISTS evento (
  id_evento INT NOT NULL AUTO_INCREMENT,
  titulo_evento VARCHAR(25) NOT NULL,
  capacidade INT NOT NULL,
  dt_inicio DATE NOT NULL,
  dt_fim DATE NOT NULL,
  criador_id_usuario INT NULL,
  PRIMARY KEY (id_evento),
  UNIQUE INDEX titulo_evento_UNIQUE (titulo_evento ASC),
  INDEX fk_evento_usuario1_idx (criador_id_usuario ASC),
  CONSTRAINT chk_dt_evento CHECK(dt_inicio < dt_fim),
  CONSTRAINT fk_evento_usuario1
    FOREIGN KEY (criador_id_usuario)
    REFERENCES usuario (id_usuario)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- Tabela setor
CREATE TABLE IF NOT EXISTS setor (
  id_setor INT NOT NULL AUTO_INCREMENT,
  titulo_setor VARCHAR(25) NOT NULL,
  capacidade INT NOT NULL,
  evento_id_evento INT NOT NULL,
  PRIMARY KEY (id_setor),
  UNIQUE INDEX setorcol1_UNIQUE (titulo_setor ASC),
  INDEX fk_setor_evento1_idx (evento_id_evento ASC),
  CONSTRAINT fk_setor_evento1
    FOREIGN KEY (evento_id_evento)
    REFERENCES evento (id_evento)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- Tabela ingresso
CREATE TABLE IF NOT EXISTS ingresso (
  id_ingresso INT NOT NULL AUTO_INCREMENT,
  codigo CHAR(6) NOT NULL,
  situacao ENUM('Emitido', 'Validado', 'Cancelado') NOT NULL DEFAULT 'Emitido',
  dt_validacao DATETIME NULL,
  setor_id_setor INT NOT NULL,
  pessoa_id_pessoa INT NOT NULL,
  criador_id_usuario INT NULL,
  validador_id_usuario INT NULL,
  PRIMARY KEY (id_ingresso),
  INDEX fk_ingresso_setor1_idx (setor_id_setor ASC),
  INDEX fk_ingresso_pessoa1_idx (pessoa_id_pessoa ASC),
  INDEX fk_ingresso_usuario1_idx (criador_id_usuario ASC),
  INDEX fk_ingresso_usuario2_idx (validador_id_usuario ASC),
  CONSTRAINT fk_ingresso_setor1
    FOREIGN KEY (setor_id_setor)
    REFERENCES setor (id_setor)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_ingresso_pessoa1
    FOREIGN KEY (pessoa_id_pessoa)
    REFERENCES pessoa (id_pessoa)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_ingresso_usuario1
    FOREIGN KEY (criador_id_usuario)
    REFERENCES usuario (id_usuario)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT fk_ingresso_usuario2
    FOREIGN KEY (validador_id_usuario)
    REFERENCES usuario (id_usuario)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;
