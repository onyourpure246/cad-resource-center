-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Feb 06, 2026 at 07:41 AM
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
-- Table structure for table `common_activity_logs`
--

CREATE TABLE `common_activity_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `level` varchar(20) DEFAULT 'INFO',
  `action` varchar(50) NOT NULL,
  `resource_type` varchar(50) NOT NULL,
  `resource_id` varchar(100) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `ip_address` varchar(50) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `common_activity_logs`
--

INSERT INTO `common_activity_logs` (`id`, `user_id`, `level`, `action`, `resource_type`, `resource_id`, `details`, `ip_address`, `user_agent`, `created_at`) VALUES
(1, 4, 'INFO', 'VERIFY_EMPLOYEE', 'AUTH', '1123455567891', '{\"displayname\":\"ThaID Sandbox User\"}', 'unknown', 'node', '2026-02-05 10:10:58'),
(2, 4, 'INFO', 'VERIFY_EMPLOYEE', 'AUTH', '1123455567891', '{\"displayname\":\"ThaID Sandbox User\"}', 'unknown', 'node', '2026-02-05 10:26:26'),
(3, NULL, 'INFO', 'UPLOAD_FILE', 'FILE', '7', '{\"filename\":\"คู่มือประกอบการพัฒนาระบบฝั่ง RP (ThaID).pdf\",\"sysname\":\"c5d6fca1-7bdd-4137-aa19-10a91fcb4e5e\",\"parent\":null}', 'unknown', 'node', '2026-02-05 10:26:47'),
(4, NULL, 'INFO', 'UPDATE_FILE', 'FILE', '7', '{\"updates\":{\"mui_icon\":\"PictureAsPdf\",\"mui_colour\":\"#E73E29\"}}', 'unknown', 'node', '2026-02-05 10:26:47'),
(5, 4, 'INFO', 'VERIFY_EMPLOYEE', 'USER', '4', '{\"pid\":\"1123455567891\",\"displayname\":\"ThaID Sandbox User\"}', 'unknown', 'node', '2026-02-05 10:33:21'),
(6, NULL, 'INFO', 'UPLOAD_FILE', 'FILE', '8', '{\"filename\":\"CASDU_ServicePortfolio.pdf\",\"sysname\":\"d4253507-8942-4fed-b42c-73fd0984e0bd\",\"parent\":6}', 'unknown', 'node', '2026-02-05 10:59:48'),
(7, NULL, 'INFO', 'UPDATE_FILE', 'FILE', '8', '{\"updates\":{\"mui_icon\":\"PictureAsPdf\",\"mui_colour\":\"#E73E29\"}}', 'unknown', 'node', '2026-02-05 10:59:48'),
(8, NULL, 'INFO', 'CREATE_NEWS', 'NEWS', '2', '{\"title\":\"ffff\"}', 'unknown', 'node', '2026-02-05 11:03:11'),
(9, NULL, 'INFO', 'DOWNLOAD_UUID', 'FILE', '90cb3271-e1fe-4c0f-a20f-741a96305149', '{\"sysname\":\"90cb3271-e1fe-4c0f-a20f-741a96305149\"}', 'unknown', 'node', '2026-02-05 11:09:43'),
(10, NULL, 'INFO', 'DOWNLOAD_UUID', 'FILE', '3f6dbc39-a925-45ec-b065-fb4fa8c40cd3', '{\"sysname\":\"3f6dbc39-a925-45ec-b065-fb4fa8c40cd3\"}', 'unknown', 'node', '2026-02-05 11:09:43'),
(11, 5, 'INFO', 'VERIFY_EMPLOYEE', 'USER', '5', '{\"displayname\":\"ThaID Sandbox\"}', 'unknown', 'node', '2026-02-05 11:19:09'),
(12, 5, 'INFO', 'VERIFY_EMPLOYEE', 'USER', '5', '{\"displayname\":\"ThaID Sandbox\"}', 'unknown', 'node', '2026-02-05 11:37:06'),
(13, NULL, 'INFO', 'DOWNLOAD_UUID', 'FILE', '3f6dbc39-a925-45ec-b065-fb4fa8c40cd3', '{\"sysname\":\"3f6dbc39-a925-45ec-b065-fb4fa8c40cd3\"}', 'unknown', 'node', '2026-02-05 12:22:24'),
(14, NULL, 'INFO', 'DOWNLOAD_UUID', 'FILE', '90cb3271-e1fe-4c0f-a20f-741a96305149', '{\"sysname\":\"90cb3271-e1fe-4c0f-a20f-741a96305149\"}', 'unknown', 'node', '2026-02-05 12:22:24'),
(15, 5, 'INFO', 'VERIFY_EMPLOYEE', 'USER', '5', '{\"displayname\":\"ThaID Sandbox\"}', 'unknown', 'node', '2026-02-05 12:22:46'),
(16, NULL, 'INFO', 'DOWNLOAD_UUID', 'FILE', '3f6dbc39-a925-45ec-b065-fb4fa8c40cd3', '{\"sysname\":\"3f6dbc39-a925-45ec-b065-fb4fa8c40cd3\"}', 'unknown', 'node', '2026-02-05 13:32:11'),
(17, NULL, 'INFO', 'DOWNLOAD_UUID', 'FILE', '90cb3271-e1fe-4c0f-a20f-741a96305149', '{\"sysname\":\"90cb3271-e1fe-4c0f-a20f-741a96305149\"}', 'unknown', 'node', '2026-02-05 13:32:11'),
(18, 5, 'INFO', 'VERIFY_EMPLOYEE', 'USER', '5', '{\"displayname\":\"ThaID Sandbox\"}', 'unknown', 'node', '2026-02-05 13:32:41'),
(19, 4, 'INFO', 'VERIFY_EMPLOYEE', 'USER', '4', '{\"displayname\":\"ThaID Sandbox User\"}', 'unknown', 'node', '2026-02-05 14:22:42'),
(20, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '2', '{\"updates\":{\"status\":\"Draft\"}}', 'unknown', 'node', '2026-02-05 14:23:17'),
(21, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '1', '{\"updates\":{\"status\":\"Draft\"}}', 'unknown', 'node', '2026-02-05 14:23:30'),
(22, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '1', '{\"updates\":{\"title\":\"แจ้งเปิดทดสอบเว็บไชต์ระบบดาวน์โหลด\",\"content\":\"<p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><b><strong class=\\\"font-bold\\\" style=\\\"white-space: pre-wrap;\\\">เรียน ผู้ใช้บริการทุกท่าน,</strong></b></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">ตามที่</span><b><strong class=\\\"font-bold\\\" style=\\\"white-space: pre-wrap;\\\">กลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์</strong></b><span style=\\\"white-space: pre-wrap;\\\"> ได้ดำเนินการปิดระบบเว็บไซต์ชั่วคราว เพื่อทำการปรับปรุงบำรุงรักษาและยกระดับโครงสร้างพื้นฐานทางเทคโนโลยีสารสนเทศนั้น</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">บัดนี้ การดำเนินการดังกล่าวได้เสร็จสิ้นเป็นบางส่วนแล้ว ทางหน่วยงานจึงใคร่ขอเรียนแจ้งให้ทราบว่า เว็บไซต์พร้อมเปิดทดสอบ</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">โดยมีผลตั้งแต่วันที่ 26 มกราคม 2569 เป็นต้นไป</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><br></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">ทั้งนี้ หากท่านพบข้อขัดข้องในการใช้งาน หรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อเจ้าหน้าที่ ในวันและเวลาทำการ</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">จึงเรียนมาเพื่อโปรดทราบ และขอขอบพระคุณที่ไว้วางใจใช้บริการด้วยดีเสมอมา</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">ขอแสดงความนับถือ</span></p>\",\"category\":\"แจ้งเตือนระบบ\",\"status\":\"Published\"}}', 'unknown', 'node', '2026-02-05 14:23:39'),
(23, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '1', '{\"updates\":{\"status\":\"Draft\"}}', 'unknown', 'node', '2026-02-05 14:27:19'),
(24, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '1', '{\"updates\":{\"status\":\"Archived\"}}', 'unknown', 'node', '2026-02-05 14:27:25'),
(25, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '1', '{\"updates\":{\"status\":\"Draft\"}}', 'unknown', 'node', '2026-02-05 14:27:29'),
(26, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '1', '{\"updates\":{\"title\":\"แจ้งเปิดทดสอบเว็บไชต์ระบบดาวน์โหลด\",\"content\":\"<p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><b><strong class=\\\"font-bold\\\" style=\\\"white-space: pre-wrap;\\\">เรียน ผู้ใช้บริการทุกท่าน,</strong></b></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">ตามที่</span><b><strong class=\\\"font-bold\\\" style=\\\"white-space: pre-wrap;\\\">กลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์</strong></b><span style=\\\"white-space: pre-wrap;\\\"> ได้ดำเนินการปิดระบบเว็บไซต์ชั่วคราว เพื่อทำการปรับปรุงบำรุงรักษาและยกระดับโครงสร้างพื้นฐานทางเทคโนโลยีสารสนเทศนั้น</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">บัดนี้ การดำเนินการดังกล่าวได้เสร็จสิ้นเป็นบางส่วนแล้ว ทางหน่วยงานจึงใคร่ขอเรียนแจ้งให้ทราบว่า เว็บไซต์พร้อมเปิดทดสอบ</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">โดยมีผลตั้งแต่วันที่ 26 มกราคม 2569 เป็นต้นไป</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><br></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">ทั้งนี้ หากท่านพบข้อขัดข้องในการใช้งาน หรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อเจ้าหน้าที่ ในวันและเวลาทำการ</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">จึงเรียนมาเพื่อโปรดทราบ และขอขอบพระคุณที่ไว้วางใจใช้บริการด้วยดีเสมอมา</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">ขอแสดงความนับถือ</span></p>\",\"category\":\"แจ้งเตือนระบบ\",\"status\":\"Published\"}}', 'unknown', 'node', '2026-02-05 14:29:39'),
(27, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '1', '{\"updates\":{\"status\":\"Draft\"}}', 'unknown', 'node', '2026-02-05 14:29:44'),
(28, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '1', '{\"updates\":{\"title\":\"แจ้งเปิดทดสอบเว็บไชต์ระบบดาวน์โหลด\",\"content\":\"<p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><b><strong class=\\\"font-bold\\\" style=\\\"white-space: pre-wrap;\\\">เรียน ผู้ใช้บริการทุกท่าน,</strong></b></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">ตามที่</span><b><strong class=\\\"font-bold\\\" style=\\\"white-space: pre-wrap;\\\">กลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์</strong></b><span style=\\\"white-space: pre-wrap;\\\"> ได้ดำเนินการปิดระบบเว็บไซต์ชั่วคราว เพื่อทำการปรับปรุงบำรุงรักษาและยกระดับโครงสร้างพื้นฐานทางเทคโนโลยีสารสนเทศนั้น</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">บัดนี้ การดำเนินการดังกล่าวได้เสร็จสิ้นเป็นบางส่วนแล้ว ทางหน่วยงานจึงใคร่ขอเรียนแจ้งให้ทราบว่า เว็บไซต์พร้อมเปิดทดสอบ</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">โดยมีผลตั้งแต่วันที่ 26 มกราคม 2569 เป็นต้นไป</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><br></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">ทั้งนี้ หากท่านพบข้อขัดข้องในการใช้งาน หรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อเจ้าหน้าที่ ในวันและเวลาทำการ</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">จึงเรียนมาเพื่อโปรดทราบ และขอขอบพระคุณที่ไว้วางใจใช้บริการด้วยดีเสมอมา</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">ขอแสดงความนับถือ</span></p>\",\"category\":\"แจ้งเตือนระบบ\",\"status\":\"Published\"}}', 'unknown', 'node', '2026-02-05 14:29:53'),
(29, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '1', '{\"updates\":{\"status\":\"Draft\"}}', 'unknown', 'node', '2026-02-05 14:29:58'),
(30, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '1', '{\"updates\":{\"status\":\"Archived\"}}', 'unknown', 'node', '2026-02-05 14:30:03'),
(31, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '1', '{\"updates\":{\"status\":\"Draft\"}}', 'unknown', 'node', '2026-02-05 14:30:07'),
(32, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '1', '{\"updates\":{\"status\":\"Archived\"}}', 'unknown', 'node', '2026-02-05 14:41:27'),
(33, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '1', '{\"updates\":{\"status\":\"Draft\"}}', 'unknown', 'node', '2026-02-05 14:41:34'),
(34, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '1', '{\"updates\":{\"title\":\"แจ้งเปิดทดสอบเว็บไชต์ระบบดาวน์โหลด\",\"content\":\"<p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><b><strong class=\\\"font-bold\\\" style=\\\"white-space: pre-wrap;\\\">เรียน ผู้ใช้บริการทุกท่าน,</strong></b></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">ตามที่</span><b><strong class=\\\"font-bold\\\" style=\\\"white-space: pre-wrap;\\\">กลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์</strong></b><span style=\\\"white-space: pre-wrap;\\\"> ได้ดำเนินการปิดระบบเว็บไซต์ชั่วคราว เพื่อทำการปรับปรุงบำรุงรักษาและยกระดับโครงสร้างพื้นฐานทางเทคโนโลยีสารสนเทศนั้น</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">บัดนี้ การดำเนินการดังกล่าวได้เสร็จสิ้นเป็นบางส่วนแล้ว ทางหน่วยงานจึงใคร่ขอเรียนแจ้งให้ทราบว่า เว็บไซต์พร้อมเปิดทดสอบ</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">โดยมีผลตั้งแต่วันที่ 26 มกราคม 2569 เป็นต้นไป</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><br></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">ทั้งนี้ หากท่านพบข้อขัดข้องในการใช้งาน หรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อเจ้าหน้าที่ ในวันและเวลาทำการ</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">จึงเรียนมาเพื่อโปรดทราบ และขอขอบพระคุณที่ไว้วางใจใช้บริการด้วยดีเสมอมา</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">ขอแสดงความนับถือ</span></p>\",\"category\":\"แจ้งเตือนระบบ\",\"status\":\"Published\"}}', 'unknown', 'node', '2026-02-05 14:41:48'),
(35, NULL, 'INFO', 'DOWNLOAD_UUID', 'FILE', '3f6dbc39-a925-45ec-b065-fb4fa8c40cd3', '{\"sysname\":\"3f6dbc39-a925-45ec-b065-fb4fa8c40cd3\"}', 'unknown', 'node', '2026-02-05 14:41:48'),
(36, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '1', '{\"updates\":{\"status\":\"Draft\"}}', 'unknown', 'node', '2026-02-05 14:41:56'),
(37, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '1', '{\"updates\":{\"title\":\"แจ้งเปิดทดสอบเว็บไชต์ระบบดาวน์โหลด\",\"content\":\"<p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><b><strong class=\\\"font-bold\\\" style=\\\"white-space: pre-wrap;\\\">เรียน ผู้ใช้บริการทุกท่าน,</strong></b></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">ตามที่</span><b><strong class=\\\"font-bold\\\" style=\\\"white-space: pre-wrap;\\\">กลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์</strong></b><span style=\\\"white-space: pre-wrap;\\\"> ได้ดำเนินการปิดระบบเว็บไซต์ชั่วคราว เพื่อทำการปรับปรุงบำรุงรักษาและยกระดับโครงสร้างพื้นฐานทางเทคโนโลยีสารสนเทศนั้น</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">บัดนี้ การดำเนินการดังกล่าวได้เสร็จสิ้นเป็นบางส่วนแล้ว ทางหน่วยงานจึงใคร่ขอเรียนแจ้งให้ทราบว่า เว็บไซต์พร้อมเปิดทดสอบ</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">โดยมีผลตั้งแต่วันที่ 26 มกราคม 2569 เป็นต้นไป</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><br></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">ทั้งนี้ หากท่านพบข้อขัดข้องในการใช้งาน หรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อเจ้าหน้าที่ ในวันและเวลาทำการ</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">จึงเรียนมาเพื่อโปรดทราบ และขอขอบพระคุณที่ไว้วางใจใช้บริการด้วยดีเสมอมา</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">ขอแสดงความนับถือ</span></p>\",\"category\":\"แจ้งเตือนระบบ\",\"status\":\"Published\"}}', 'unknown', 'node', '2026-02-05 14:43:34'),
(38, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '1', '{\"updates\":{\"status\":\"Draft\"}}', 'unknown', 'node', '2026-02-05 14:43:39'),
(39, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '1', '{\"updates\":{\"status\":\"Archived\"}}', 'unknown', 'node', '2026-02-05 14:43:45'),
(40, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '1', '{\"updates\":{\"status\":\"Draft\"}}', 'unknown', 'node', '2026-02-05 14:43:51'),
(41, NULL, 'INFO', 'UPDATE_NEWS', 'NEWS', '1', '{\"updates\":{\"title\":\"แจ้งเปิดทดสอบเว็บไชต์ระบบดาวน์โหลด\",\"content\":\"<p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><b><strong class=\\\"font-bold\\\" style=\\\"white-space: pre-wrap;\\\">เรียน ผู้ใช้บริการทุกท่าน,</strong></b></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">ตามที่</span><b><strong class=\\\"font-bold\\\" style=\\\"white-space: pre-wrap;\\\">กลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์</strong></b><span style=\\\"white-space: pre-wrap;\\\"> ได้ดำเนินการปิดระบบเว็บไซต์ชั่วคราว เพื่อทำการปรับปรุงบำรุงรักษาและยกระดับโครงสร้างพื้นฐานทางเทคโนโลยีสารสนเทศนั้น</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">บัดนี้ การดำเนินการดังกล่าวได้เสร็จสิ้นเป็นบางส่วนแล้ว ทางหน่วยงานจึงใคร่ขอเรียนแจ้งให้ทราบว่า เว็บไซต์พร้อมเปิดทดสอบ</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">โดยมีผลตั้งแต่วันที่ 26 มกราคม 2569 เป็นต้นไป</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><br></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">ทั้งนี้ หากท่านพบข้อขัดข้องในการใช้งาน หรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อเจ้าหน้าที่ ในวันและเวลาทำการ</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">จึงเรียนมาเพื่อโปรดทราบ และขอขอบพระคุณที่ไว้วางใจใช้บริการด้วยดีเสมอมา</span></p><p class=\\\"leading-normal [&amp;:not(:first-child)]:mt-0\\\"><span style=\\\"white-space: pre-wrap;\\\">ขอแสดงความนับถือ</span></p>\",\"category\":\"แจ้งเตือนระบบ\",\"status\":\"Published\"}}', 'unknown', 'node', '2026-02-05 14:46:42'),
(42, NULL, 'INFO', 'CREATE_NEWS', 'NEWS', '3', '{\"title\":\"hhhh\"}', 'unknown', 'node', '2026-02-05 15:18:48'),
(43, 0, 'INFO', 'UPDATE_NEWS', 'NEWS', '3', '{\"updates\":{\"status\":\"Draft\"}}', 'unknown', 'node', '2026-02-05 15:23:45'),
(44, NULL, 'INFO', 'CREATE_NEWS', 'NEWS', '4', '{\"title\":\"rthtr\"}', 'unknown', 'node', '2026-02-05 15:33:45'),
(45, 4, 'INFO', 'CREATE_NEWS', 'NEWS', '5', '{\"title\":\"เพด\"}', 'unknown', 'node', '2026-02-05 15:40:19'),
(46, 0, 'INFO', 'DOWNLOAD_UUID', 'FILE', '91441df1-a680-4a8d-919f-42b6bf50acd2', '{\"sysname\":\"91441df1-a680-4a8d-919f-42b6bf50acd2\"}', 'unknown', 'node', '2026-02-05 15:45:24'),
(47, 0, 'INFO', 'DOWNLOAD_UUID', 'FILE', '3f6dbc39-a925-45ec-b065-fb4fa8c40cd3', '{\"sysname\":\"3f6dbc39-a925-45ec-b065-fb4fa8c40cd3\"}', 'unknown', 'node', '2026-02-05 15:45:24'),
(48, 0, 'INFO', 'DOWNLOAD_UUID', 'FILE', 'c7b04917-4a41-4d69-b02e-ef8ab8ebcbd3', '{\"sysname\":\"c7b04917-4a41-4d69-b02e-ef8ab8ebcbd3\"}', 'unknown', 'node', '2026-02-05 15:45:24'),
(49, 0, 'INFO', 'DOWNLOAD_UUID', 'FILE', 'c7b04917-4a41-4d69-b02e-ef8ab8ebcbd3', '{\"sysname\":\"c7b04917-4a41-4d69-b02e-ef8ab8ebcbd3\"}', 'unknown', 'node', '2026-02-06 08:53:17'),
(50, 0, 'INFO', 'DOWNLOAD_UUID', 'FILE', '3f6dbc39-a925-45ec-b065-fb4fa8c40cd3', '{\"sysname\":\"3f6dbc39-a925-45ec-b065-fb4fa8c40cd3\"}', 'unknown', 'node', '2026-02-06 08:53:17'),
(51, 0, 'INFO', 'DOWNLOAD_UUID', 'FILE', '91441df1-a680-4a8d-919f-42b6bf50acd2', '{\"sysname\":\"91441df1-a680-4a8d-919f-42b6bf50acd2\"}', 'unknown', 'node', '2026-02-06 08:53:17'),
(52, 4, 'INFO', 'VERIFY_EMPLOYEE', 'USER', '4', '{\"displayname\":\"ThaID Sandbox User\"}', 'unknown', 'node', '2026-02-06 08:54:40'),
(53, 4, 'INFO', 'VERIFY_EMPLOYEE', 'USER', '4', '{\"displayname\":\"Rachan Admin\"}', 'unknown', 'node', '2026-02-06 09:19:56'),
(54, 4, 'INFO', 'CREATE_FOLDER', 'FOLDER', '7', '{\"name\":\"Test Create Folder Log\",\"parent\":null}', 'unknown', 'node', '2026-02-06 11:18:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `common_activity_logs`
--
ALTER TABLE `common_activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `level_idx` (`level`),
  ADD KEY `action_idx` (`action`),
  ADD KEY `created_at_idx` (`created_at`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `common_activity_logs`
--
ALTER TABLE `common_activity_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
