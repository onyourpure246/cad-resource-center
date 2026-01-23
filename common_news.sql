-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Jan 23, 2026 at 05:15 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `casdu_internalis`
--

-- --------------------------------------------------------

--
-- Table structure for table `common_news`
--

CREATE TABLE `common_news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'published',
  `publish_date` datetime DEFAULT current_timestamp(),
  `isactive` tinyint(1) DEFAULT 1,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `common_news`
--

INSERT INTO `common_news` (`id`, `title`, `content`, `category`, `cover_image`, `status`, `publish_date`, `isactive`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
(1, 'Updated News Title', '<p>This is a test announcement created via script.</p>', NULL, 'd4ce431a-1589-416b-9234-0fe0a320a184', 'published', '2026-01-19 06:20:07', 0, NULL, '2026-01-19 13:20:07', NULL, '2026-01-19 14:37:37'),
(2, 'Updated News Title', '<p>This is a test announcement created via script.</p>', NULL, 'a9711573-e32d-4ce8-82cf-fbe313d223b3', 'published', '2026-01-19 06:20:25', 0, NULL, '2026-01-19 13:20:25', NULL, '2026-01-19 14:37:35'),
(3, 'gg', 'drtrr grthgfh', NULL, '5512c86a-7006-4d51-b301-86286d8d6cd3', 'published', '2026-01-05 10:30:00', 0, NULL, '2026-01-19 13:39:22', NULL, '2026-01-19 15:36:00'),
(4, 'dfgr', '<p class=\"leading-7 [&amp;:not(:first-child)]:mt-6\" style=\"text-align: center;\"><span style=\"white-space: pre-wrap;\">พเพเ</span></p>', NULL, 'b071ec1f-f403-45f2-b90c-3c2e59ec0a73', 'published', '2026-01-18 10:30:00', 0, NULL, '2026-01-19 14:13:04', NULL, '2026-01-19 14:37:39'),
(5, 'greg', '<p class=\"leading-7 [&amp;:not(:first-child)]:mt-6\" style=\"text-align: center;\"><span style=\"white-space: pre-wrap;\">Test</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-6\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">efwgrgdfgr</span></p>', NULL, '98cc755f-09b3-4abc-9668-3de132549d5c', 'published', '2026-01-18 10:30:00', 0, NULL, '2026-01-19 14:37:10', NULL, '2026-01-19 14:37:42'),
(6, 'เพำเดก', '<p class=\"leading-7 [&amp;:not(:first-child)]:mt-6\"><span style=\"white-space: pre-wrap;\">พำเเพำ</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-6\"><br></p>', NULL, NULL, 'published', '2026-01-19 07:39:27', 0, NULL, '2026-01-19 14:39:27', NULL, '2026-01-19 15:21:14'),
(7, 'เ', '<p class=\"leading-7 [&amp;:not(:first-child)]:mt-6\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">พำเเพำ</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-6\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">ำเำเ</strong></b></p>', NULL, NULL, 'published', '2026-01-19 07:39:32', 0, NULL, '2026-01-19 14:39:32', NULL, '2026-01-19 15:21:11'),
(8, '้ะพ้', '<ol class=\"m-0 p-0 list-decimal [&amp;&gt;li]:mt-2 list-outside !list-decimal\"><li value=\"1\" class=\"mx-8\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">เพำเ</strong></b></li><li value=\"2\" class=\"mx-8\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">เพำเดก</strong></b></li><li value=\"3\" class=\"mx-8\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">พเำเพเ</strong></b></li><li value=\"4\" class=\"mx-8\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">เพำเดกเด้</strong></b></li><li value=\"5\" class=\"mx-8\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">พำเเดก</strong></b></li></ol>', NULL, NULL, 'published', '2026-01-19 07:40:02', 0, NULL, '2026-01-19 14:40:02', NULL, '2026-01-19 15:21:09'),
(9, '้ะพ้', '<ol class=\"m-0 p-0 list-decimal [&amp;&gt;li]:mt-2 list-outside !list-decimal\"><li value=\"1\" class=\"mx-8\"><i><b><strong class=\"font-bold italic\" style=\"white-space: pre-wrap;\">เพำเ</strong></b></i></li><li value=\"2\" class=\"mx-8\"><i><b><strong class=\"font-bold italic\" style=\"white-space: pre-wrap;\">้ะพ</strong></b></i></li><li value=\"3\" class=\"mx-8\"><i><b><strong class=\"font-bold italic\" style=\"white-space: pre-wrap;\">เพำเดกเด้ะพ</strong></b></i></li><li value=\"4\" class=\"mx-8\"><i><b><strong class=\"font-bold italic\" style=\"white-space: pre-wrap;\">พเำเพเ</strong></b></i></li><li value=\"5\" class=\"mx-8\"><i><b><strong class=\"font-bold italic\" style=\"white-space: pre-wrap;\">เพำเดกเด้</strong></b></i></li><li value=\"6\" class=\"mx-8\"><i><b><strong class=\"font-bold italic\" style=\"white-space: pre-wrap;\">พำเเดก</strong></b></i></li></ol>', NULL, NULL, 'published', '2026-01-19 07:40:15', 0, NULL, '2026-01-19 14:40:15', NULL, '2026-01-19 15:21:05'),
(10, 'yh', '<p class=\"leading-7 [&amp;:not(:first-child)]:mt-6\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">htrh</strong></b></p>', NULL, NULL, 'published', '2026-01-19 08:21:20', 0, NULL, '2026-01-19 15:21:20', NULL, '2026-01-19 15:30:44'),
(11, 'พะัพ้', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-2\"><span style=\"white-space: pre-wrap;\">ะพ้ะ้เด้</span></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-2\"><span style=\"white-space: pre-wrap;\">ะพ้ะพ้ะ</span></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-2\"><span style=\"white-space: pre-wrap;\">้ะพ้ะพ้เด้ด</span></p>', NULL, 'f69a7780-013c-4935-9cd5-3425d36bfdf0', 'published', '2026-01-19 08:31:17', 0, NULL, '2026-01-19 15:31:17', NULL, '2026-01-19 15:36:02'),
(12, 'แจ้งทดสอบระบบข่าวประชาสัมพันธ์', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">       ทางทีมผู้พัฒนาขอแจ้งให้ทราบว่า ขณะนี้ได้มีการเปิดทดสอบระบบข่าวประชาสัมพันธ์ ณ วันที่ ๑๙ มกราคม ๒๕๖๘ </span></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><br></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">ทั้งนี้ หากผู้ใช้งานระบบทุกท่านพบปัญหาใดก็ตาม โปรดแจ้งกลับมาที่ LINE Official</span></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\" style=\"text-align: right;\"><span style=\"white-space: pre-wrap;\">ขอบคุณครับ/ค่ะ</span></p>', NULL, '66125c10-5327-4a8f-826d-f39a97292353', 'published', '2026-01-18 10:30:00', 0, NULL, '2026-01-19 15:45:45', NULL, '2026-01-21 08:54:37'),
(13, 'แจ้งปิดปรับปรุงระบบดาวน์โหลดชั่วคราว', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">เรียน ผู้ใช้งานระบบทุกท่าน</span></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">       ทางทีมผู้พัฒนาขอแจ้งปิดปรับปรุงระบบชั่วคราว ในวันที่ ๒๑ มกราคม ๒๕๖๙ ตั้งแต่เวลา ๐๑.๐๐ - ๐๔.๐๐ น.</span></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\" style=\"text-align: left;\"><br></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">ขออภัยในความในสะดวก</span></p>', NULL, '70b3b13b-3a2a-43b1-9c2d-baf147ae81e1', 'published', '2026-01-19 09:02:00', 0, NULL, '2026-01-20 09:02:48', NULL, '2026-01-21 08:54:34'),
(14, 'สมดุลรัก (Balance)', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\" style=\"text-align: center;\"><span style=\"white-space: pre-wrap;\">Just thinking \'bout you</span></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\" style=\"text-align: center;\"><span style=\"white-space: pre-wrap;\">มีแต่ love you</span></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\" style=\"text-align: center;\"><span style=\"white-space: pre-wrap;\">ก็คนน่ารักมักใจร้าย</span></p>', NULL, '5b65ce42-5a3c-48b0-90e0-7822dca8794f', 'published', '2026-01-19 10:30:00', 0, NULL, '2026-01-20 10:27:23', NULL, '2026-01-21 08:54:29'),
(15, 'แก้ไข', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\" style=\"text-align: center;\"><span style=\"white-space: pre-wrap;\">Just thinking \'bout you</span></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\" style=\"text-align: center;\"><span style=\"white-space: pre-wrap;\">มีแต่ love you</span></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\" style=\"text-align: center;\"><span style=\"white-space: pre-wrap;\">ก็คนน่ารักมักใจร้าย</span></p>', NULL, '45ce5176-3905-490b-a302-c65561118555', 'published', '2026-01-19 10:30:00', 0, NULL, '2026-01-20 10:27:48', NULL, '2026-01-21 08:54:32'),
(16, 'fff', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">fffewf</span></p>', NULL, '2d0ebc29-b8a0-4b15-b9f3-04f0642c63a6', 'published', '2026-01-19 10:30:00', 0, NULL, '2026-01-20 13:36:56', NULL, '2026-01-20 13:38:14'),
(17, 'efwf', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">ewfewf</span></p>', NULL, NULL, 'published', '2026-01-20 10:30:00', 0, NULL, '2026-01-20 13:38:23', NULL, '2026-01-21 08:54:15'),
(18, '้ะพ้', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">้ะพ้พ</span></p>', NULL, '090eec8a-8a71-4e9b-9929-aa86d5e382cc', 'draft', '2026-01-20 07:51:49', 0, NULL, '2026-01-20 14:51:49', NULL, '2026-01-20 14:52:00'),
(19, 'nytj', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">jytj</span></p>', NULL, 'ef3144c0-fbec-42a1-86c2-be018f0ee997', 'published', '2026-01-20 07:55:04', 0, NULL, '2026-01-20 14:55:05', NULL, '2026-01-21 08:54:26'),
(20, 'ทดสอบการสร้างประกาศ', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">ดกหดำ</span></p>', 'ประชาสัมพันธ์', '9c2a42e3-8861-49aa-a8d1-a66c0e7dc593', 'published', '2026-01-20 08:07:42', 0, NULL, '2026-01-20 15:07:42', NULL, '2026-01-21 08:54:23'),
(21, 'Updated News Title', '<p>This is a test announcement created via script.</p>', 'Updated Category', '148d367a-85ed-4c8a-90c2-5d920a876f0a', 'published', '2026-01-20 08:28:08', 0, 'system', '2026-01-20 15:28:08', 'system', '2026-01-20 15:28:08'),
(22, 'jjj', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">kjk</span></p>', 'ประชาสัมพันธ์', 'c01ce531-9381-44f6-b06c-f610ea823ff4', 'published', '2026-01-20 08:28:42', 0, 'system', '2026-01-20 15:28:42', 'system', '2026-01-21 08:54:20'),
(23, 'Updated News Title', '<p>This is a test announcement created via script.</p>', 'Updated Category', '6342079d-68c3-4eb9-8b32-89eeaee4e1d5', 'published', '2026-01-20 08:44:27', 0, 'test_user_1768898666924', '2026-01-20 15:44:27', 'test_user_1768898666924', '2026-01-20 15:44:27'),
(24, 'Updated News Title', '<p>This is a test announcement created via script.</p>', 'Updated Category', 'cc15bd9b-89f4-42b5-aee7-f2c2945127e2', 'published', '2026-01-20 08:46:38', 0, 'admin', '2026-01-20 15:46:38', 'admin', '2026-01-20 15:46:39'),
(25, 'Updated News Title', '<p>This is a test announcement created via script.</p>', 'Updated Category', 'b0654f1a-5fc7-4e3b-9009-69ad1308db21', 'published', '2026-01-20 08:46:47', 0, 'admin', '2026-01-20 15:46:47', 'admin', '2026-01-20 15:46:47'),
(26, 'รรร', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">นร</span></p>', 'ทั่วไป', NULL, 'published', '2026-01-20 08:56:28', 0, 'admin', '2026-01-20 15:56:28', 'admin', '2026-01-21 08:54:18'),
(27, 'tt', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">fewf</span></p>', 'ประชาสัมพันธ์', NULL, 'published', '2026-01-21 03:41:45', 0, 'admin', '2026-01-21 10:41:45', 'admin', '2026-01-22 09:03:50'),
(28, 'เเ', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">เเเ</span></p>', 'แจ้งเตือนระบบ', NULL, 'Draft', '2026-01-21 07:57:50', 1, 'admin', '2026-01-21 14:57:51', 'admin', '2026-01-22 13:48:40'),
(29, 'ะัี่ัะ', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">ะ่ัะ</span></p>', 'กิจกรรม', NULL, 'draft', '2026-01-21 08:07:12', 0, 'admin', '2026-01-21 15:07:12', 'admin', '2026-01-22 11:00:47'),
(30, 'เปลี่ยนโลกทั้งใบให้ \"เพื่อนตัวน้อย\" เพียงแค่คุณเปิดใจ', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">       เคยได้ยินไหมว่า... สำหรับเรา เขาอาจเป็นแค่ส่วนหนึ่งของชีวิต แต่สำหรับเขา \"เราคือโลกทั้งใบ\"</span></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">มูลนิธิแมวเหมียว ขอเชิญชวนทาสแมวและผู้ใจดีทุกท่าน มาร่วมส่งต่อความรักในกิจกรรม </span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">\"Find A Home, Fill A Heart\"</strong></b><span style=\"white-space: pre-wrap;\"> พบกับน้องแมวไร้บ้านกว่า 25 ชีวิต ที่ผ่านการตรวจสุขภาพและทำวัคซีนเรียบร้อยแล้ว กำลังรอคอยอ้อมกอดอุ่นๆ จากคุณ</span></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">บางที... แมวตัวที่คุณกำลังมองหา อาจจะกำลังรอคุณอยู่ที่นี่ </span></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">มาร่วมเปลี่ยนแมวจร ให้เป็นแมวเจ้านายกันเถอะครับ</strong></b></p>', 'ประชาสัมพันธ์', '49fe7a6f-7372-482e-9528-2645c482ef37', 'Published', '2026-01-22 01:56:47', 1, 'admin', '2026-01-22 08:56:47', 'admin', '2026-01-23 11:14:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `common_news`
--
ALTER TABLE `common_news`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `common_news`
--
ALTER TABLE `common_news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
