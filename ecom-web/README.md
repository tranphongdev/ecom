<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Ant%20Design-6-0170FE?style=for-the-badge&logo=antdesign&logoColor=white" />
</p>

<h1 align="center">🖥️ TRANPHONGPC</h1>

<p align="center">
  <strong>Giải pháp máy tính hàng đầu — Website thương mại điện tử chuyên cung cấp PC, linh kiện & phụ kiện máy tính</strong>
</p>

<p align="center">
  <a href="#-tính-năng-chính">Tính năng</a> •
  <a href="#%EF%B8%8F-công-nghệ-sử-dụng">Công nghệ</a> •
  <a href="#-cài-đặt">Cài đặt</a> •
  <a href="#-chạy-dự-án">Chạy dự án</a> •
  <a href="#-đóng-góp">Đóng góp</a>
</p>

---

## 📖 Giới thiệu

**TRANPHONGPC** là website thương mại điện tử chuyên về máy tính và linh kiện, được xây dựng với kiến trúc frontend hiện đại sử dụng React 19 và TypeScript. Dự án mang đến trải nghiệm mua sắm trực tuyến mượt mà, giao diện thân thiện và tối ưu hiệu suất.

### 🎯 Mục đích xây dựng

- Cung cấp nền tảng mua sắm PC & linh kiện trực tuyến chuyên nghiệp
- Xây dựng UI/UX hiện đại, responsive trên mọi thiết bị
- Áp dụng các best practices trong phát triển frontend

### 👥 Đối tượng sử dụng

- Người dùng cá nhân muốn mua PC, linh kiện máy tính
- Game thủ tìm kiếm cấu hình máy phù hợp
- Doanh nghiệp cần trang bị hệ thống máy tính

---

## 🌐 Demo

> 🔗 **Live Demo:** [https://tranphongpc.vercel.app](https://tranphongpc.vercel.app) *(coming soon)*

<!-- Screenshot -->
<!-- ![TRANPHONGPC Homepage](./docs/screenshots/homepage.png) -->

---

## 📁 Cấu trúc thư mục

```
src/
├── App.tsx                  # Root component, routing configuration
├── main.tsx                 # Entry point
├── index.css                # Global styles
├── i18n.ts                  # Cấu hình đa ngôn ngữ (i18n)
│
├── assets/                  # Hình ảnh, fonts, static files
├── components/              # Shared & reusable components
│   ├── common/              # Header, Footer, NavigationBar, PromoBanner...
│   ├── home/                # Components riêng cho trang chủ (Hero, Sidebar...)
│   └── ProductCard.tsx      # Card hiển thị sản phẩm
│
├── data/                    # Mock data cho development
├── features/                # Feature modules (product...)
├── hooks/                   # Custom hooks (useDebounce...)
├── layouts/                 # Layout wrappers (MainLayout)
├── locales/                 # File ngôn ngữ (vi.json, en.json)
├── pages/                   # Page components
│   ├── Home.tsx             # Trang chủ
│   ├── ProductList.tsx      # Danh sách sản phẩm
│   ├── ProductDetail.tsx    # Chi tiết sản phẩm
│   ├── Cart.tsx             # Giỏ hàng
│   ├── Checkout.tsx         # Thanh toán
│   ├── Dashboard.tsx        # Trang quản lý cá nhân
│   ├── Login.tsx            # Đăng nhập
│   └── Register.tsx         # Đăng ký
│
├── store/                   # State management (Zustand)
├── theme/                   # Ant Design theme configuration
├── types/                   # TypeScript type definitions
└── utils/                   # Utility functions (format...)
```

---

## ⚙️ Cài đặt

### Yêu cầu hệ thống

- **Node.js** >= 18.x
- **npm** >= 9.x hoặc **yarn** >= 1.22

### Các bước cài đặt

```bash
# 1. Clone repository
git clone https://github.com/tranphongdev/ecom.git

# 2. Di chuyển vào thư mục dự án
cd ecom

# 3. Cài đặt dependencies
npm install
```

### Cấu hình môi trường *(nếu cần)*

```bash
# Tạo file .env từ template
cp .env.example .env
```

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=TRANPHONGPC
```

---

## 🚀 Chạy dự án

```bash
# Chạy môi trường development
npm run dev

# Build production
npm run build

# Preview bản build
npm run preview
```

Sau khi chạy `npm run dev`, truy cập 👉 **http://localhost:5173**

---

## ✨ Tính năng chính

| Tính năng | Mô tả |
|-----------|--------|
| 🏠 **Trang chủ** | Hero banner với Swiper, danh mục sản phẩm, sản phẩm nổi bật |
| 🛍️ **Danh sách sản phẩm** | Lọc theo danh mục, tìm kiếm với debounce, phân trang |
| 📄 **Chi tiết sản phẩm** | Hình ảnh, mô tả, thông số kỹ thuật, sản phẩm liên quan |
| 🛒 **Giỏ hàng** | Thêm/xóa sản phẩm, cập nhật số lượng, tính tổng tiền |
| 💳 **Thanh toán** | Form checkout với validation (Zod + React Hook Form), chọn địa chỉ động |
| 👤 **Tài khoản** | Đăng nhập, đăng ký, dashboard quản lý cá nhân |
| 🌍 **Đa ngôn ngữ** | Hỗ trợ Tiếng Việt & English (i18next) |
| 📊 **Dashboard** | Biểu đồ thống kê với Recharts |
| 📱 **Responsive** | Tương thích mọi kích thước màn hình |
| 🎨 **Theme** | Custom Ant Design theme, dark-friendly design |

---

## 🛠️ Công nghệ sử dụng

| Công nghệ | Phiên bản | Mô tả |
|------------|-----------|--------|
| **React** | 19.x | UI library chính, sử dụng Hooks & functional components |
| **TypeScript** | 6.0 | Type-safe JavaScript, giảm lỗi runtime |
| **Vite** | 5.x | Build tool siêu nhanh, HMR tức thì |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **Ant Design** | 6.x | Enterprise-grade UI component library |
| **React Router DOM** | 7.x | Client-side routing & nested layouts |
| **Zustand** | 5.x | Lightweight state management |
| **TanStack React Query** | 5.x | Server state management, caching & sync |
| **React Hook Form** | 7.x | Performant form handling |
| **Zod** | 4.x | Schema validation cho forms |
| **Swiper** | 12.x | Touch slider/carousel hiện đại |
| **Recharts** | 3.x | Biểu đồ dựa trên React & D3 |
| **i18next** | 26.x | Framework đa ngôn ngữ |
| **Axios** | 1.x | HTTP client cho API calls |
| **Lucide React** | 1.x | Icon library nhẹ & đẹp |
| **ESLint + Prettier** | latest | Linting & code formatting |

---

## 📜 Scripts

| Script | Lệnh | Mô tả |
|--------|-------|--------|
| `dev` | `npm run dev` | Khởi chạy dev server với Vite (HMR) |
| `build` | `npm run build` | Compile TypeScript & build production bundle |
| `preview` | `npm run preview` | Preview bản build production locally |
| `lint` | `npm run lint` | Kiểm tra lỗi code với ESLint |
| `format` | `npm run format` | Format code với Prettier |

---

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy làm theo các bước sau:

```bash
# 1. Fork repository

# 2. Tạo branch mới
git checkout -b feature/ten-tinh-nang

# 3. Commit thay đổi
git commit -m "feat: mô tả tính năng"

# 4. Push lên branch
git push origin feature/ten-tinh-nang

# 5. Tạo Pull Request
```

### Quy ước commit message

| Prefix | Mô tả |
|--------|--------|
| `feat:` | Tính năng mới |
| `fix:` | Sửa lỗi |
| `docs:` | Cập nhật tài liệu |
| `style:` | Format code (không thay đổi logic) |
| `refactor:` | Tái cấu trúc code |
| `perf:` | Cải thiện hiệu suất |
| `test:` | Thêm/sửa test |

---

## 📄 License

Dự án được phân phối dưới giấy phép **MIT License**.

Xem file [LICENSE](./LICENSE) để biết thêm chi tiết.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/tranphongdev">tranphongdev</a>
</p>
