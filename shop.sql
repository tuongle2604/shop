-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 31, 2017 lúc 10:10 SA
-- Phiên bản máy phục vụ: 10.1.21-MariaDB
-- Phiên bản PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `shop`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id` bigint(20) NOT NULL,
  `email` text NOT NULL,
  `facebook` text NOT NULL,
  `google` text NOT NULL,
  `role` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `email`, `facebook`, `google`, `role`, `password`) VALUES
(1, 'chuasutu1@gmail.com', '', '', 'admin', 'U2FsdGVkX1+wXsRHKxEu60heysWpIY0rnbpqDgf7jnI='),
(3, 'chuasutu3@gmail.com', '', '', 'partner', 'U2FsdGVkX19s+HzHPzMSty72WSDhw+yhAnsmlG2DB2Q='),
(4, 'chuasutu4@gmail.com', '', '', 'partner', 'U2FsdGVkX1+dyRLEVKYsr746EPtJgC6H57eydK+9tPc='),
(5, 'chuasutu5@gmail.com', '', '', 'customer', 'U2FsdGVkX19aV5eLNl50JtpN4WPZbcDoElIJVpdpvfc='),
(6, 'chuasutu6@gmail.com', '', '', 'customer', 'U2FsdGVkX19IUKNQUMU3a2bQwHHv1Ro5cX1pz8D6AtM='),
(7, '', '590973741101411;Tuong Le;https://www.facebook.com/app_scoped_user_id/590973741101411/;https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/19386_367189803479807_3498929112465985455_n.jpg?oh=5bde7a7bf8994a76488f7d2d3acb0d1e&oe=59F23FDD', '', 'customer', ''),
(8, '', 'chuasutu@gmail.com;Tuong Le;https://www.facebook.com/app_scoped_user_id/135967910330897/;https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=b0e4037a0b04d52224a51836c84c322d&oe=59FEA22F', '', 'customer', ''),
(9, 'tuongle@gmail.com', '', '', 'admin', 'U2FsdGVkX1/NrDEpOOkeU2cD+RBuwfRvpjDdYgw4ycc='),
(11, '', '', 'chuasutu@gmail.com;Tường Lê;https://plus.google.com/112286212810214297119;https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50', 'customer', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payment`
--

CREATE TABLE `payment` (
  `id` bigint(20) NOT NULL,
  `items` text NOT NULL,
  `date` text NOT NULL,
  `status` text,
  `total` text NOT NULL,
  `method` text NOT NULL,
  `id_paypal` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `payment`
--

INSERT INTO `payment` (`id`, `items`, `date`, `status`, `total`, `method`, `id_paypal`) VALUES
(3, '[{\"id\":24,\"name\":\"Huawei Y3II\",\"img\":\"/uploads/1500565164664636133396715382096_chi-tiet.png\",\"price\":\"15\",\"sl\":1},{\"id\":4,\"name\":\"Vivo V5s\",\"img\":\"//cdn.fptshop.com.vn/Uploads/Originals/2017/4/16/636279319408486572_1o.jpg\",\"price\":\"10\",\"sl\":1}]', '2017-7-27 16:23:51', '1', '25', 'visa', 'PAY-5PX047580K0369929LF43CIQ'),
(4, '[{\"id\":24,\"name\":\"Huawei Y3II\",\"img\":\"/uploads/1500565164664636133396715382096_chi-tiet.png\",\"price\":\"15\",\"sl\":1},{\"id\":4,\"name\":\"Vivo V5s\",\"img\":\"//cdn.fptshop.com.vn/Uploads/Originals/2017/4/16/636279319408486572_1o.jpg\",\"price\":\"10\",\"sl\":\"3\"},{\"id\":14,\"name\":\"Vivo Y55S\",\"img\":\"//cdn.fptshop.com.vn/Uploads/Originals/2017/6/23/636338245916670649_vivoY55S-gold-1.jpg\",\"price\":\"20\",\"sl\":\"2\"}]', '2017-7-27 17:42:17', '1', '85', 'visa', 'PAY-52209941LT965615NLF44HAI'),
(5, '[{\"id\":24,\"name\":\"Huawei Y3II\",\"img\":\"/uploads/1500565164664636133396715382096_chi-tiet.png\",\"price\":\"15\",\"sl\":1},{\"id\":4,\"name\":\"Vivo V5s\",\"img\":\"//cdn.fptshop.com.vn/Uploads/Originals/2017/4/16/636279319408486572_1o.jpg\",\"price\":\"10\",\"sl\":\"1\"},{\"id\":14,\"name\":\"Vivo Y55S\",\"img\":\"//cdn.fptshop.com.vn/Uploads/Originals/2017/6/23/636338245916670649_vivoY55S-gold-1.jpg\",\"price\":\"20\",\"sl\":\"1\"}]', '2017-7-28 13:20:06', '0', '45', 'visa', 'PAY-4YK70829B9199613NLF5NPEA'),
(6, '[{\"id\":4,\"name\":\"Vivo V5s\",\"img\":\"//cdn.fptshop.com.vn/Uploads/Originals/2017/4/16/636279319408486572_1o.jpg\",\"price\":\"10\",\"sl\":\"3\"},{\"id\":18,\"name\":\"iPhone 7 Plus 128GB\",\"img\":\"http://p.vatgia.vn/ir/pictures_fullsize/4/aXFxMTQ3NDE2NzEwMy5qcGc-/apple-iphone-7-plus-32gb-gold-ban-quoc-te.jpg\",\"price\":\"1100\",\"sl\":1},{\"id\":16,\"name\":\"Sony Xperia XZs\",\"img\":\"//cdn.fptshop.com.vn/Uploads/Originals/2017/2/28/636238763321821456_sony-szs-1.jpg\",\"price\":\"600\",\"sl\":1},{\"id\":15,\"name\":\"Samsung Galaxy S8\",\"img\":\"http://p.vatgia.vn/ir/pictures_fullsize/8/a2hsMTQ5NTQ0MTU5NC5wbmc-/samsung-galaxy-s8-plus-128gb-6gb-ram-arctic-silver.png\",\"price\":\"999\",\"sl\":1}]', '2017-7-28 17:04:09', '0', '2729', 'visa', 'PAY-0TG42374XW698230XLF5QYFQ'),
(7, '[{\"id\":4,\"name\":\"Vivo V5s\",\"img\":\"//cdn.fptshop.com.vn/Uploads/Originals/2017/4/16/636279319408486572_1o.jpg\",\"price\":\"10\",\"sl\":\"3\"},{\"id\":18,\"name\":\"iPhone 7 Plus 128GB\",\"img\":\"http://p.vatgia.vn/ir/pictures_fullsize/4/aXFxMTQ3NDE2NzEwMy5qcGc-/apple-iphone-7-plus-32gb-gold-ban-quoc-te.jpg\",\"price\":\"1100\",\"sl\":1},{\"id\":16,\"name\":\"Sony Xperia XZs\",\"img\":\"//cdn.fptshop.com.vn/Uploads/Originals/2017/2/28/636238763321821456_sony-szs-1.jpg\",\"price\":\"600\",\"sl\":1},{\"id\":15,\"name\":\"Samsung Galaxy S8\",\"img\":\"http://p.vatgia.vn/ir/pictures_fullsize/8/a2hsMTQ5NTQ0MTU5NC5wbmc-/samsung-galaxy-s8-plus-128gb-6gb-ram-arctic-silver.png\",\"price\":\"999\",\"sl\":1}]', '2017-7-28 17:04:13', '0', '2729', 'visa', 'PAY-18S54982MA210600CLF5QYDA'),
(8, '[{\"id\":4,\"name\":\"Vivo V5s\",\"img\":\"//cdn.fptshop.com.vn/Uploads/Originals/2017/4/16/636279319408486572_1o.jpg\",\"price\":\"10\",\"sl\":\"3\"},{\"id\":18,\"name\":\"iPhone 7 Plus 128GB\",\"img\":\"http://p.vatgia.vn/ir/pictures_fullsize/4/aXFxMTQ3NDE2NzEwMy5qcGc-/apple-iphone-7-plus-32gb-gold-ban-quoc-te.jpg\",\"price\":\"1100\",\"sl\":1},{\"id\":16,\"name\":\"Sony Xperia XZs\",\"img\":\"//cdn.fptshop.com.vn/Uploads/Originals/2017/2/28/636238763321821456_sony-szs-1.jpg\",\"price\":\"600\",\"sl\":1}]', '2017-7-28 17:06:14', '0', '1730', 'visa', 'PAY-1B271814300320129LF5QZEY'),
(9, '[{\"id\":4,\"name\":\"Vivo V5s\",\"img\":\"//cdn.fptshop.com.vn/Uploads/Originals/2017/4/16/636279319408486572_1o.jpg\",\"price\":\"10\",\"sl\":\"3\"},{\"id\":18,\"name\":\"iPhone 7 Plus 128GB\",\"img\":\"http://p.vatgia.vn/ir/pictures_fullsize/4/aXFxMTQ3NDE2NzEwMy5qcGc-/apple-iphone-7-plus-32gb-gold-ban-quoc-te.jpg\",\"price\":\"1100\",\"sl\":1}]', '2017-8-31 13:42:51', '0', '1130', 'visa', 'PAY-98S50123WG702602CLGT27XQ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phone`
--

CREATE TABLE `phone` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `type` text NOT NULL,
  `price` text NOT NULL,
  `img` text NOT NULL,
  `link` text NOT NULL,
  `config` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `phone`
--

INSERT INTO `phone` (`id`, `name`, `type`, `price`, `img`, `link`, `config`) VALUES
(1, 'Samsung Galaxy J7 Pro', 'samsung', '200', '//cdn.fptshop.com.vn/Uploads/Originals/2017/7/11/636353690857561775_isaac.jpg', '/dien-thoai/samsung-galaxy-j7-pro', 'Màn hình : 5.5 inch (1920 x 1080 pixels);Camera : Chính: 13.0 MP, Phụ: 13.0 MP;RAM : 	3 GB;Bộ nhớ trong : 32 GB;Hệ điều hành : Android 7.0 Nougat;Chipset : Exynos 7870;CPU : Octa-core 1.6 GHz;Kích thước : 152.4 x 74.7 x 7.9 mm;'),
(2, 'OPPO F3', 'oppo', '220', '//cdn.fptshop.com.vn/Uploads/Originals/2017/6/5/636322676788516871_111.jpg', '/dien-thoai/oppo-f3', 'Màn hình : 5.5 inch (1920 x 1080 pixels);Camera : Chính: 13.0 MP, Phụ: Dual 16.0 MP + 8.0 MP;RAM : 4 GB;Bộ nhớ trong : 64 GB;Hệ điều hành : ColorOS 3.0, nền tảng Android 6.0;Chipset : MediaTek MT6750T;CPU : Octa-core 1.51 Ghz;Kích thước : 153.3 x75.2 x 7.'),
(3, 'Samsung Galaxy J7 Prime', 'samsung', '150', '//cdn.fptshop.com.vn/Uploads/Originals/2016/8/24/636076253101317072_j7-prime-chi-tiet.jpg', '/dien-thoai/samsung-galaxy-j7-prime', 'Màn hình : 5.5 inch (1080 x 1920 pixels);Camera : Chính: 13.0 MP, Phụ: 8.0 MP;RAM : 	3 GB;Bộ nhớ trong : 32 GB;Hệ điều hành : Android Marshmallow 6.0.1;Chipset : Exynos 7870 8 nhân 64-bit;CPU : Octa-Core 1.60GHz;Kích thước : 151.5 x 74.9 x 8.1 mm;GPU : Ma'),
(4, 'Vivo V5s', 'vivo', '10', '//cdn.fptshop.com.vn/Uploads/Originals/2017/4/16/636279319408486572_1o.jpg', '/dien-thoai/vivo-v5s', 'Màn hình : 5.5 inch (1280 x 720 pixels);Camera : Trước: 20.0 MP, Sau: 13.0 MP;RAM : 4 GB;Bộ nhớ trong : 64 GB;Hệ điều hành : Funtouch OS 3.0 (dựa trên Android 6.0);Chipset : MediaTek MT6750;Kích thước : 153.8 x 75.5 x 7.55mm;'),
(5, 'OPPO A37 (Neo 9)', 'oppo', '130', '//cdn.fptshop.com.vn/Uploads/Originals/2016/12/12/636171478375861351_OPPO-A37-gold-2.jpg', '/dien-thoai/oppo-a37-a37f', 'Màn hình : 5.0 inch (1280 x 720 pixels);Camera : Camera: Chính 8.0 MP, Phụ 5.0MP;RAM : 2 GB;Bộ nhớ trong : 16 GB;Hệ điều hành : ColorOS 3.0(Android 5.1);Chipset : Qualcomm Snapdragon 410;CPU : Quad core 1.2 Ghz;GPU : Adreno 306;Kích thước : 143.1 x 71 x 7'),
(6, 'iPhone 6 32GB (2017)', 'iphone', '300', '//cdn.fptshop.com.vn/Uploads/Originals/2016/10/27/636131729381314142_635870816416447361_iphone-6s-silver-5.jpg', '/dien-thoai/iphone-6-32gb', 'Màn hình : 	4.7 inch (1334 x 750 pixels);Camera : Chính: 8.0 MP, Phụ: 1.2 MP;RAM : 1 GB;Bộ nhớ trong : 32 GB;Hệ điều hành : iOS;Chipset : Apple A8 2 nhân 64-bit;CPU : 1.4 GHz;Kích thước : 138.1 x 67 x 6.9 mm;GPU : PowerVR GX6450;'),
(7, 'Samsung Galaxy J7 Pro', 'samsung', '250', '//cdn.fptshop.com.vn/Uploads/Originals/2017/7/11/636353690857561775_isaac.jpg', '/dien-thoai/samsung-galaxy-j7-pro', 'Màn hình : 5.5 inch (1920 x 1080 pixels);Camera : Chính: 13.0 MP, Phụ: 13.0 MP;RAM : 	3 GB;Bộ nhớ trong : 32 GB;Hệ điều hành : Android 7.0 Nougat;Chipset : Exynos 7870;CPU : Octa-core 1.6 GHz;Kích thước : 152.4 x 74.7 x 7.9 mm;'),
(8, 'Oppo F3 Lite', 'oppo', '220', '//cdn.fptshop.com.vn/Uploads/Originals/2017/6/9/636326225696205053_black-1.jpg', '/dien-thoai/oppo-f3-lite', 'Màn hình : 5.2 inch (720 x 1280 pixels);Camera : Chính: 13.0 MP, Phụ: 16.0 MP;RAM : 	3 GB;Bộ nhớ trong : 32 GB;Hệ điều hành : ColorOS 3.0, nền tảng Android 6.0;Chipset : Qualcomm MSM8940;CPU : Octa-core 1.4 GHz;Kích thước : 149.1 x 72.9 x 7.65 mm;GPU : Ad'),
(9, 'iPhone 7 Plus 128GB PRODUCT RED', 'iphone', '1000', '//cdn.fptshop.com.vn/Uploads/Originals/2017/5/30/636317326275834704_7-plus-do-1.jpg', '/dien-thoai/iphone-7-plus-128gb-product-red', 'Màn hình : 5.5 inch (1920 x 1080 pixels);Camera : Chính: Dual Camera 12.0MP; Phụ: 7.0MP;RAM : 	3 GB;Bộ nhớ trong : 128 GB;Hệ điều hành : iOS;Chipset : Apple A10;CPU : Quad-core 2.3 GHz;Kích thước : 158.2 x 77.9 x 7.3 mm;GPU : PowerVR Series7XT Plus;'),
(11, 'Sony Xperia XZ Premium', 'sony', '900', '//cdn.fptshop.com.vn/Uploads/Originals/2017/6/6/636323420442518267_1o.jpg', '/dien-thoai/sony-xperia-xz-premium', 'Màn hình : 5.5 inch ( 3840 x 2160 pixels);Camera : Chính: 19.0 MP, Phụ: 13.0 MP;RAM : 4 GB;Bộ nhớ trong : UFS 64 GB;Hệ điều hành : 	Android OS, v7.1 (Nougat);Chipset : Qualcomm Snapdragon 835;Kích thước : 156 x 77 x 7.9 mm;'),
(12, 'Vivo V5', 'vivo', '270', '//cdn.fptshop.com.vn/Uploads/Originals/2017/4/16/636279319408486572_1o.jpg', '/dien-thoai/vivo-v5', 'Màn hình : 5.5 inch (1280 x 720 pixels);Camera : Trước: 20.0 MP, Sau: 13.0 MP;RAM : 4 GB;Bộ nhớ trong : 32 GB;Hệ điều hành : Funtouch OS 2.6 (dựa trên Android 6.0);Kích thước : 153.8 x 75.5 x 7.55mm;'),
(13, 'Huawei Gr5 2017', 'huawei', '290', '//cdn.fptshop.com.vn/Uploads/Originals/2016/12/16/636174790957063708_Huawei-Gr5-2017-gold-my-tam.jpg', '/dien-thoai/huawei-gr5-2017', 'Màn hình : 5.5 inch (1080 x 1920 pixels);Camera : Chính: 12.0 MP và 2.0 MP(Dual camera); Phụ: 8.0MP;RAM : 	3 GB;Bộ nhớ trong : 32 GB;Hệ điều hành : 	Android 6.0 (Marshmallow);Chipset : HiSilicon Kirin 655;CPU : Quad-Core 1.7GHz & Quad-Core 2.1GHz;Kích thư'),
(14, 'Vivo Y55S', 'vivo', '20', '//cdn.fptshop.com.vn/Uploads/Originals/2017/6/23/636338245916670649_vivoY55S-gold-1.jpg', '/dien-thoai/vivo-y55s', 'Màn hình : 5.2 inch (1280 x 720 pixels);Camera : Chính: 13.0 MP, Phụ: 5.0 MP;RAM : 2 GB;Bộ nhớ trong : 16 GB;Hệ điều hành : Funtouch OS 3.0 (Based on Android 6.0;CPU : 1.4 GHz;Kích thước : 147.9 x 72.9 x 7.5 mm;'),
(15, 'Samsung Galaxy S8', 'samsung', '999', 'http://p.vatgia.vn/ir/pictures_fullsize/8/a2hsMTQ5NTQ0MTU5NC5wbmc-/samsung-galaxy-s8-plus-128gb-6gb-ram-arctic-silver.png', '/dien-thoai/samsung-galaxy-s8', 'Màn hình : 5.8 inch Super AMOLED (2560 x 1440 pixel);Camera : Chính: 12.0 MP, Phụ: 8.0 MP;RAM : 4 GB;Bộ nhớ trong : 64 GB;Hệ điều hành : Android 7.0 (Nougat);Chipset : Exynos 8895;CPU : Lõi Tám (lõi Tứ 2.3GHz + lõi Tứ 1.7GHz), 64 bit, vi xử lý 10nm;Kích t'),
(16, 'Sony Xperia XZs', 'sony', '600', '//cdn.fptshop.com.vn/Uploads/Originals/2017/2/28/636238763321821456_sony-szs-1.jpg', '/dien-thoai/sony-xperia-xzs', 'Màn hình : 5.5 inch ( 3840 x 2160 pixels);Camera : Chính: 19.0 MP, Phụ: 13.0 MP;RAM : 4 GB;Bộ nhớ trong : UFS 64 GB;Hệ điều hành : 	Android OS, v7.1 (Nougat);Chipset : Qualcomm Snapdragon 835;Kích thước : 156 x 77 x 7.9 mm;'),
(18, 'iPhone 7 Plus 128GB', 'iphone', '1100', 'http://p.vatgia.vn/ir/pictures_fullsize/4/aXFxMTQ3NDE2NzEwMy5qcGc-/apple-iphone-7-plus-32gb-gold-ban-quoc-te.jpg', '/dien-thoai/iphone-7-plus-128gb', 'Màn hình : 5.5 inch (1920 x 1080 pixels);Camera : Chính: Dual Camera 12.0MP; Phụ: 7.0MP;RAM : 	3 GB;Bộ nhớ trong : 128 GB;Hệ điều hành : iOS;Chipset : Apple A10;CPU : Quad-core 2.3 GHz;Kích thước : 158.2 x 77.9 x 7.3 mm;GPU : PowerVR Series7XT Plus;'),
(19, 'iPhone 7 Plus 39GB', 'iphone', '100000', '/uploads/1504166539017iphone-6s-128gb-hong-1-400x450.png', '/dien-thoai/iphone-7-plus-39gb', 'Màn hình : 5.5 inch (1920 x 1080 pixels);Camera : Dual Camera 12.0MP;RAM : 7.0MP;Bộ nhớ trong : 7.0MP;Hệ điều hành : 7.0MP;Chipset : undefined;CPU : 7.0MP;GPU : undefined;Kích thước : 7.0MP;');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD UNIQUE KEY `id` (`id`);

--
-- Chỉ mục cho bảng `payment`
--
ALTER TABLE `payment`
  ADD UNIQUE KEY `id` (`id`);

--
-- Chỉ mục cho bảng `phone`
--
ALTER TABLE `phone`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT cho bảng `payment`
--
ALTER TABLE `payment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT cho bảng `phone`
--
ALTER TABLE `phone`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
