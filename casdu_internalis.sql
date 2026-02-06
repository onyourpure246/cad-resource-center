-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Feb 06, 2026 at 07:58 AM
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
(54, 4, 'INFO', 'CREATE_FOLDER', 'FOLDER', '7', '{\"name\":\"Test Create Folder Log\",\"parent\":null}', 'unknown', 'node', '2026-02-06 11:18:12'),
(55, 0, 'INFO', 'DOWNLOAD_UUID', 'FILE', 'c7b04917-4a41-4d69-b02e-ef8ab8ebcbd3', '{\"sysname\":\"c7b04917-4a41-4d69-b02e-ef8ab8ebcbd3\"}', 'unknown', 'node', '2026-02-06 13:50:09'),
(56, 0, 'INFO', 'DOWNLOAD_UUID', 'FILE', '3f6dbc39-a925-45ec-b065-fb4fa8c40cd3', '{\"sysname\":\"3f6dbc39-a925-45ec-b065-fb4fa8c40cd3\"}', 'unknown', 'node', '2026-02-06 13:50:09'),
(57, 0, 'INFO', 'DOWNLOAD_UUID', 'FILE', '91441df1-a680-4a8d-919f-42b6bf50acd2', '{\"sysname\":\"91441df1-a680-4a8d-919f-42b6bf50acd2\"}', 'unknown', 'node', '2026-02-06 13:50:09');

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
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `view_count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `common_news`
--

INSERT INTO `common_news` (`id`, `title`, `content`, `category`, `cover_image`, `status`, `publish_date`, `isactive`, `created_by`, `created_at`, `updated_by`, `updated_at`, `view_count`) VALUES
(1, 'แจ้งเปิดทดสอบเว็บไชต์ระบบดาวน์โหลด', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">เรียน ผู้ใช้บริการทุกท่าน,</strong></b></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">ตามที่</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">กลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์</strong></b><span style=\"white-space: pre-wrap;\"> ได้ดำเนินการปิดระบบเว็บไซต์ชั่วคราว เพื่อทำการปรับปรุงบำรุงรักษาและยกระดับโครงสร้างพื้นฐานทางเทคโนโลยีสารสนเทศนั้น</span></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">บัดนี้ การดำเนินการดังกล่าวได้เสร็จสิ้นเป็นบางส่วนแล้ว ทางหน่วยงานจึงใคร่ขอเรียนแจ้งให้ทราบว่า เว็บไซต์พร้อมเปิดทดสอบ</span></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">โดยมีผลตั้งแต่วันที่ 26 มกราคม 2569 เป็นต้นไป</span></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><br></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">ทั้งนี้ หากท่านพบข้อขัดข้องในการใช้งาน หรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อเจ้าหน้าที่ ในวันและเวลาทำการ</span></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">จึงเรียนมาเพื่อโปรดทราบ และขอขอบพระคุณที่ไว้วางใจใช้บริการด้วยดีเสมอมา</span></p><p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">ขอแสดงความนับถือ</span></p>', 'แจ้งเตือนระบบ', '3f6dbc39-a925-45ec-b065-fb4fa8c40cd3', 'Published', '2026-01-26 02:53:37', 1, 'admin', '2026-01-26 09:53:37', 'system', '2026-02-05 14:46:42', 2),
(2, 'ffff', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">esff</span></p>', 'กิจกรรม', '90cb3271-e1fe-4c0f-a20f-741a96305149', 'Draft', '2026-02-05 04:03:11', 0, 'admin', '2026-02-05 11:03:11', 'system', '2026-02-05 14:23:24', 3),
(3, 'hhhh', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">trjytjh</span></p>', 'กิจกรรม', '23630e81-c44b-4011-a6fd-249468d736b6', 'Draft', '2026-02-05 08:18:48', 1, 'system', '2026-02-05 15:18:48', 'system', '2026-02-05 15:23:45', 0),
(4, 'rthtr', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">trhh</span></p>', 'ระเบียบ/คำสั่ง', 'c7b04917-4a41-4d69-b02e-ef8ab8ebcbd3', 'Published', '2026-02-05 08:33:45', 1, 'System Admin', '2026-02-05 15:33:45', 'System Admin', '2026-02-05 15:33:45', 0),
(5, 'เพด', '<p class=\"leading-normal [&amp;:not(:first-child)]:mt-0\"><span style=\"white-space: pre-wrap;\">พำเเ</span></p>', 'กิจกรรม', '91441df1-a680-4a8d-919f-42b6bf50acd2', 'Published', '2026-02-05 08:40:19', 1, 'Sandbox User', '2026-02-05 15:40:19', 'Sandbox User', '2026-02-05 15:40:19', 0);

-- --------------------------------------------------------

--
-- Table structure for table `common_participants`
--

CREATE TABLE `common_participants` (
  `id` int(11) NOT NULL,
  `codename` varchar(50) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `isactive` tinyint(1) DEFAULT 1,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `common_tags`
--

CREATE TABLE `common_tags` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `colour` varchar(20) DEFAULT 'gray',
  `icon` varchar(50) DEFAULT NULL,
  `isactive` tinyint(1) DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `common_users`
--

CREATE TABLE `common_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `displayname` varchar(100) DEFAULT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `jobtitle` varchar(100) DEFAULT NULL,
  `isadmin` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `common_users`
--

INSERT INTO `common_users` (`id`, `username`, `password`, `displayname`, `firstname`, `lastname`, `jobtitle`, `isadmin`, `created_at`, `updated_at`) VALUES
(4, '1123455567891', '$2b$10$GftCAI9cNBQAuV4lkt0q5OrMo85gef4hG7BBeoblVRlL5iazYRbtq', 'Rachan Admin', 'Rachan', 'Admin', 'Tester', 1, '2026-02-04 10:05:55', '2026-02-06 09:19:32'),
(5, '1101000093449', '$2b$10$2vPOhWO.48x7bhgIvMUGvOSqtmUYgRymdowJocdezxy5yHN/UCIaq', 'Shogun User', 'Shogun', 'User', 'Tester', 0, '2026-02-04 10:11:04', '2026-02-06 09:19:26');

-- --------------------------------------------------------

--
-- Table structure for table `dl_files`
--

CREATE TABLE `dl_files` (
  `id` int(11) NOT NULL,
  `parent` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `filename` varchar(255) NOT NULL,
  `sysname` varchar(255) NOT NULL,
  `mui_icon` varchar(50) DEFAULT NULL,
  `mui_colour` varchar(50) DEFAULT NULL,
  `isactive` tinyint(1) DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dl_files`
--

INSERT INTO `dl_files` (`id`, `parent`, `name`, `description`, `filename`, `sysname`, `mui_icon`, `mui_colour`, `isactive`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
(3, 4, 'newcdm_types.ts', NULL, 'newcdm_types.ts', '3e5aab08-3c10-4ac4-b4c4-c0dc1e0713aa', 'InsertDriveFile', '#FFCE3C', 0, NULL, '2026-02-02 14:30:44', NULL, '2026-02-02 14:31:06'),
(4, 5, 'newcdm_types.ts', NULL, 'newcdm_types.ts', '826f3b5e-4df1-412c-bc62-36db79fa7b11', 'InsertDriveFile', '#FFCE3C', 0, NULL, '2026-02-02 14:30:52', NULL, '2026-02-02 14:31:06'),
(5, 6, 'newcdm_types.ts', NULL, 'newcdm_types.ts', 'd05e7315-8d6e-4604-828b-0e2f2ea5186a', 'InsertDriveFile', '#FFCE3C', 2, NULL, '2026-02-04 10:50:54', NULL, '2026-02-04 10:50:54'),
(6, NULL, 'นนน', 'นนนน', 'ThaID_SSO.pdf', 'e5ffdf4c-c0b3-4a3c-b55f-9244128cc181', 'PictureAsPdf', '#E73E29', 1, NULL, '2026-02-05 10:17:02', NULL, '2026-02-05 10:17:02'),
(7, NULL, 'ddd', 'ddd', 'คู่มือประกอบการพัฒนาระบบฝั่ง RP (ThaID).pdf', 'c5d6fca1-7bdd-4137-aa19-10a91fcb4e5e', 'PictureAsPdf', '#E73E29', 1, NULL, '2026-02-05 10:26:47', NULL, '2026-02-05 10:26:47'),
(8, 6, '888', '55', 'CASDU_ServicePortfolio.pdf', 'd4253507-8942-4fed-b42c-73fd0984e0bd', 'PictureAsPdf', '#E73E29', 1, NULL, '2026-02-05 10:59:48', NULL, '2026-02-05 10:59:48');

-- --------------------------------------------------------

--
-- Table structure for table `dl_folders`
--

CREATE TABLE `dl_folders` (
  `id` int(11) NOT NULL,
  `abbr` varchar(50) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `mui_icon` varchar(50) DEFAULT NULL,
  `mui_colour` varchar(50) DEFAULT NULL,
  `isactive` tinyint(1) DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dl_folders`
--

INSERT INTO `dl_folders` (`id`, `abbr`, `name`, `description`, `parent`, `mui_icon`, `mui_colour`, `isactive`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
(1, 'CADWP', 'ระบบจัดการกระดาษทำการ', NULL, NULL, 'Folder', '#FFCE3C', 1, NULL, '2026-02-02 14:19:17', NULL, '2026-02-02 14:19:17'),
(4, 'newcdm_types.ts', 'newcdm_types.ts', NULL, 1, 'Folder', '#FFCE3C', 0, NULL, '2026-02-02 14:30:44', NULL, '2026-02-02 14:31:06'),
(5, 'newcdm_types.ts', 'newcdm_types.ts', NULL, 4, 'Folder', '#FFCE3C', 0, NULL, '2026-02-02 14:30:52', NULL, '2026-02-02 14:31:06'),
(6, 'newcdm_types.ts', 'newcdm_types.ts', NULL, NULL, 'Folder', '#FFCE3C', 1, NULL, '2026-02-04 10:50:54', NULL, '2026-02-04 10:50:54'),
(7, 'LOGTEST', 'Test Create Folder Log', NULL, NULL, 'Folder', '#3F9F4A', 1, NULL, '2026-02-06 11:18:12', NULL, '2026-02-06 11:18:12');

-- --------------------------------------------------------

--
-- Table structure for table `planner_projects`
--

CREATE TABLE `planner_projects` (
  `id` int(11) NOT NULL,
  `shortname` varchar(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `displayorder` int(11) DEFAULT 0,
  `manager_participant_id` int(11) DEFAULT NULL,
  `isactive` tinyint(1) DEFAULT 1,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `planner_tasks`
--

CREATE TABLE `planner_tasks` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `displayorder` int(11) DEFAULT 0,
  `planned_start_date` date DEFAULT NULL,
  `planned_end_date` date DEFAULT NULL,
  `actual_start_date` date DEFAULT NULL,
  `actual_end_date` date DEFAULT NULL,
  `isactive` tinyint(1) DEFAULT 1,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `planner_task_participants`
--

CREATE TABLE `planner_task_participants` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `participant_id` int(11) NOT NULL,
  `isactive` tinyint(1) DEFAULT 1,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `planner_task_tags`
--

CREATE TABLE `planner_task_tags` (
  `task_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
-- Indexes for table `common_news`
--
ALTER TABLE `common_news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `common_participants`
--
ALTER TABLE `common_participants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `common_tags`
--
ALTER TABLE `common_tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `common_users`
--
ALTER TABLE `common_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `dl_files`
--
ALTER TABLE `dl_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent` (`parent`),
  ADD KEY `sysname` (`sysname`);

--
-- Indexes for table `dl_folders`
--
ALTER TABLE `dl_folders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent` (`parent`);

--
-- Indexes for table `planner_projects`
--
ALTER TABLE `planner_projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `planner_tasks`
--
ALTER TABLE `planner_tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `planner_task_participants`
--
ALTER TABLE `planner_task_participants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `planner_task_tags`
--
ALTER TABLE `planner_task_tags`
  ADD PRIMARY KEY (`task_id`,`tag_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `common_activity_logs`
--
ALTER TABLE `common_activity_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `common_news`
--
ALTER TABLE `common_news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `common_participants`
--
ALTER TABLE `common_participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `common_tags`
--
ALTER TABLE `common_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `common_users`
--
ALTER TABLE `common_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `dl_files`
--
ALTER TABLE `dl_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `dl_folders`
--
ALTER TABLE `dl_folders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `planner_projects`
--
ALTER TABLE `planner_projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `planner_tasks`
--
ALTER TABLE `planner_tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `planner_task_participants`
--
ALTER TABLE `planner_task_participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dl_files`
--
ALTER TABLE `dl_files`
  ADD CONSTRAINT `fk_dl_files_parent` FOREIGN KEY (`parent`) REFERENCES `dl_folders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `dl_folders`
--
ALTER TABLE `dl_folders`
  ADD CONSTRAINT `fk_dl_folders_parent` FOREIGN KEY (`parent`) REFERENCES `dl_folders` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
