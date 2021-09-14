-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-04-2020 a las 16:44:27
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_ejercicio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrusel`
--

CREATE TABLE `carrusel` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `idnoticia` int(11) NOT NULL,
  `imagen` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `carrusel`
--

INSERT INTO `carrusel` (`id`, `idnoticia`, `imagen`) VALUES
(15, 2, 'im/2/amenazasEEUU.png'),
(16, 2, 'im/2/punisher.png'),
(21, 3, 'im/3/covidBomb.png'),
(22, 3, 'im/3/covidEstatuas.png'),
(23, 3, 'im/3/covidIglesia.png'),
(24, 3, 'im/3/covidMilitar.png'),
(33, 4, 'im/4/covidBomb - copia.png'),
(34, 4, 'im/4/covidBomb.png'),
(35, 4, 'im/4/covidEstatuas - copia.png'),
(36, 4, 'im/4/punisher - copia.png'),
(37, 4, 'im/4/punisher.png'),
(42, 5, 'im/5/ronaldinho3.png'),
(43, 5, 'im/5/ronaldinho2.png'),
(44, 5, 'im/5/ronaldinho1.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `noticia` int(11) NOT NULL,
  `nombre` text CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL DEFAULT 'Anónimo',
  `texto` text CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `tiempo` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `noticia`, `nombre`, `texto`, `tiempo`) VALUES
(3, 2, 'Anónimo', 'Un comentario anónimo y modificado para probar el refresco de comments', '2020-04-10 12:12:33'),
(2, 2, 'David', 'El primer comentario', '2020-04-10 12:10:59'),
(15, 2, 'yhgty', 'uykyu,kyu,k', '2020-04-12 17:24:03'),
(40, 3, 'ghmgh', 'hgmghm', '2020-04-12 18:44:19'),
(16, 2, 'yu,kyu', 'yu,y', '2020-04-12 17:24:07'),
(17, 2, 'uyk,y', 'yu,yhu,', '2020-04-12 17:24:10'),
(19, 2, 'davif', 'pruab fgsrg', '2020-04-12 18:01:27'),
(20, 2, 'prueba 2', 'ymkjt\ntrtymnjtryyt', '2020-04-12 18:01:52'),
(21, 2, 'prueba 3', 'rthrnhjrytjmnt', '2020-04-12 18:06:02'),
(22, 2, 'Anónimo', 'uylkyuiluyiluyi', '2020-04-12 18:09:21'),
(67, 3, 'gnbfg', 'fgfgfg', '2020-04-12 19:39:58'),
(66, 3, 'trghr', 'rthrthrt', '2020-04-12 19:39:44'),
(71, 5, 'David', 'Hola este es el primer comentario', '2020-04-16 17:09:57'),
(68, 3, 'gffg', 'fgnfg', '2020-04-12 19:40:16'),
(69, 4, 'ghngtfn', 'gfhnghn', '2020-04-12 19:41:59'),
(72, 5, 'Anónimo', 'Este el segundo y no introduzco mi nombre porque no quiero que se sepa.', '2020-04-17 15:30:00'),
(76, 5, 'David', 'Este es el tercer comentario', '2020-04-17 15:55:51'),
(77, 5, 'David', 'Este es el último comentario y debe desplazar al más antiguo a la página 2', '2020-04-17 15:59:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `usuario` varchar(40) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(40) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`usuario`, `password`) VALUES
('admin', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias`
--

CREATE TABLE `noticias` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `texto` text COLLATE utf8_spanish_ci NOT NULL,
  `titulo` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `imagen` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `noticias`
--

INSERT INTO `noticias` (`id`, `texto`, `titulo`, `imagen`) VALUES
(1, 'El director de la Agencia de Seguridad Nacional de Estados Unidos, (NSA, por sus siglas anglosajonas), Keith Alexander, sostuvo que la mejor manera de proteger a EEUU ante las posibles amenazas exteriores es mediante el uso de programas de vigilancia que tengan como objetivo recabar millones de comunicaciones en el mundo.\r\n\r\n\"Nadie ha encontrado una manera mejor\", sostuvo Alexander ante la Judicatura del Senado, solicitando a los legisladores no abolir los programas de recogida masiva de datos de la agencia.', 'Amenazas EEUU', 'im/amenazasEEUU.png'),
(2, 'España llega a su tercer viernes de confinamiento por coronavirus con la mirada en las UCIs y en el personal sanitario, con más de 13.000 profesionales contagiados.\r\nLas muertes por coronavirus en España ya representan el 20% del total en el mundo (10.003) con 110.238 personas infectadas. Entre éstos, más de más 13.000 afectados son sanitarios, de los que más de 3.000 están en Madrid, una de las comunidades más afectadas junto con Cataluña. El Ministerio de Sanidad insiste en que ahora el foco está en las UCIs, que acogen a 6.092 pacientes, una vez que la transmisión se ha ralentizado.', 'Coronavirus en España en directo: Alemania supera ya a China con más de 84.000 personas infectadas', 'im/covid.png'),
(3, 'Después de dar a luz, Vanesa Muro, infectada por coronavirus, fue separada durante diez días de su bebé, Oliver. Ahora juntos, ella cuenta las horas antes de poder besarlo y tocarlo sin guantes ni máscara. Oliver es uno de los bebés \"intocables\" por el coronavirus.\nLa abuela de Vanesa, de 87 años, a quien veía todos los días, contrae el coronavirus y sucumbe a él una semana después de que Vanesa diera a luz. Sujeto a riesgos como mujer embarazada, Vanesa se hace la prueba. Resultado: positivo.\nCon su esposo Oscar Carrillo, se apresuran al hospital madrileño de La Paz, donde la joven tiene que dar a luz, pero \"obviamente no pudo acompañarme, me dejó en la puerta de Urgencias\", recuerda Vanesa, con emoción.\n', 'Oliver, el bebé \"intocable\" por el coronavirus', 'im/oliver.png'),
(4, 'La multinacional estadounidense Google publicó este viernes informes estadísticos elaborados a partir de los datos de teléfonos móviles sobre cómo están afectando a la movilidad de las personas las órdenes de confinamiento por la pandemia de COVID-19 decretadas en hasta 131 países.\r\n\r\nEn resumen y según los datos de Google, España ha visto cómo la actividad en restaurantes ha bajado un 94%, se ha reducido un 76% en tiendas y farmacias y se ha hundido un 89% en parques con respecto a la normalidad habitual. Del mismo modo, el transporte público se ha empleado un 88% menos y hay un 64% menos de trayectos al trabajo.', 'Google publica estadísticas sobre los efectos del confinamiento en cada país', 'im/google.png'),
(5, 'El exfutbolista pasa la mayor parte del tiempo de la reclusión practicando deporte y, prácticamente siempre, lo hace con una pelota en los pies, ya sea para jugar a fútbol sala o fútbol-tenis con el resto de presos.\n\nEso sí, Ronaldinho no siempre gana, como se vio en un torneo de fútbol-tenis en el que sí decidió participar. La exestrella del FC Barcelona, entre otros equipos, se llevó una gran sorpresa cuando fue derrotado por una pareja formada por un asesino y un ladrón, según el citado medio.\n\nVoy a modificar siendo administrador.', 'Ronaldinho pierde un partido de fútbol-tenis contra un ladrón y un asesino', 'im/ronaldinho.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrusel`
--
ALTER TABLE `carrusel`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`usuario`),
  ADD UNIQUE KEY `login` (`usuario`);

--
-- Indices de la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrusel`
--
ALTER TABLE `carrusel`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT de la tabla `noticias`
--
ALTER TABLE `noticias`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
