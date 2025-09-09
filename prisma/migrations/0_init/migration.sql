-- CreateTable
CREATE TABLE `evento` (
    `id_evento` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo_evento` VARCHAR(25) NOT NULL,
    `capacidade` INTEGER NOT NULL,
    `dt_inicio` DATE NOT NULL,
    `dt_fim` DATE NOT NULL,
    `criador_id_usuario` INTEGER NULL,

    UNIQUE INDEX `titulo_evento_UNIQUE`(`titulo_evento`),
    INDEX `fk_evento_usuario1_idx`(`criador_id_usuario`),
    PRIMARY KEY (`id_evento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingresso` (
    `id_ingresso` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` CHAR(6) NOT NULL,
    `situacao` ENUM('Emitido', 'Validado', 'Cancelado') NOT NULL DEFAULT 'Emitido',
    `dt_validacao` DATETIME(0) NULL,
    `setor_id_setor` INTEGER NOT NULL,
    `pessoa_id_pessoa` INTEGER NOT NULL,
    `criador_id_usuario` INTEGER NULL,
    `validador_id_usuario` INTEGER NULL,

    INDEX `fk_ingresso_pessoa1_idx`(`pessoa_id_pessoa`),
    INDEX `fk_ingresso_setor1_idx`(`setor_id_setor`),
    INDEX `fk_ingresso_usuario1_idx`(`criador_id_usuario`),
    INDEX `fk_ingresso_usuario2_idx`(`validador_id_usuario`),
    PRIMARY KEY (`id_ingresso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `perfil` (
    `id_perfil` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo_perfil` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `titulo_perfil_UNIQUE`(`titulo_perfil`),
    PRIMARY KEY (`id_perfil`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pessoa` (
    `id_pessoa` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_completo` VARCHAR(100) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `cpf` CHAR(11) NOT NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    UNIQUE INDEX `cpf_UNIQUE`(`cpf`),
    PRIMARY KEY (`id_pessoa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `setor` (
    `id_setor` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo_setor` VARCHAR(25) NOT NULL,
    `capacidade` INTEGER NOT NULL,
    `evento_id_evento` INTEGER NOT NULL,

    UNIQUE INDEX `setorcol1_UNIQUE`(`titulo_setor`),
    INDEX `fk_setor_evento1_idx`(`evento_id_evento`),
    PRIMARY KEY (`id_setor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `senha` VARCHAR(64) NOT NULL,
    `pessoa_id_pessoa` INTEGER NOT NULL,
    `perfil_id_perfil` INTEGER NOT NULL,
    `criador_id_usuario` INTEGER NULL,

    UNIQUE INDEX `pessoa_id_pessoa_UNIQUE`(`pessoa_id_pessoa`),
    INDEX `fk_usuario_perfil1_idx`(`perfil_id_perfil`),
    INDEX `fk_usuario_pessoa_idx`(`pessoa_id_pessoa`),
    INDEX `fk_usuario_usuario1_idx`(`criador_id_usuario`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `evento` ADD CONSTRAINT `fk_evento_usuario1` FOREIGN KEY (`criador_id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ingresso` ADD CONSTRAINT `fk_ingresso_pessoa1` FOREIGN KEY (`pessoa_id_pessoa`) REFERENCES `pessoa`(`id_pessoa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ingresso` ADD CONSTRAINT `fk_ingresso_setor1` FOREIGN KEY (`setor_id_setor`) REFERENCES `setor`(`id_setor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ingresso` ADD CONSTRAINT `fk_ingresso_usuario1` FOREIGN KEY (`criador_id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ingresso` ADD CONSTRAINT `fk_ingresso_usuario2` FOREIGN KEY (`validador_id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `setor` ADD CONSTRAINT `fk_setor_evento1` FOREIGN KEY (`evento_id_evento`) REFERENCES `evento`(`id_evento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `fk_usuario_perfil1` FOREIGN KEY (`perfil_id_perfil`) REFERENCES `perfil`(`id_perfil`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `fk_usuario_usuario1` FOREIGN KEY (`criador_id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`pessoa_id_pessoa`) REFERENCES `pessoa`(`id_pessoa`) ON DELETE RESTRICT ON UPDATE CASCADE;

