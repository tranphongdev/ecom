# TranPhong PC App

Đây là repository chính (monorepo) cho dự án TranPhong PC, bao gồm các ứng dụng web và API.

## 🏗️ Cấu trúc dự án (Project Structure)

Dự án được chia thành các phân hệ chính:

- `ecom-admin/`: Ứng dụng quản trị (Admin Dashboard)
- `ecom-web/`: Ứng dụng web dành cho khách hàng (Client Web)
- `ecom-api/`: Backend API phục vụ dữ liệu cho các ứng dụng web

## 🚀 Yêu cầu hệ thống (Prerequisites)

- **Node.js**: Phiên bản 18.x hoặc 20.x (có thể sử dụng `.nvmrc` để quản lý)
- **Package Manager**: `npm` hoặc `yarn` hoặc `pnpm`

## 🛠️ Hướng dẫn cài đặt (Getting Started)

1. Cài đặt các thư viện cần thiết cho từng dự án:
   ```bash
   cd ecom-admin
   npm install
   # Tương tự cho ecom-web và ecom-api
   ```

2. Khởi chạy dự án ở môi trường phát triển:
   - Truy cập vào từng thư mục và chạy lệnh start/dev (tuỳ thuộc vào cấu hình của từng thư mục, ví dụ `npm run dev`).

*Lưu ý: Bạn nên tham khảo file `README.md` chi tiết bên trong từng thư mục dự án (`ecom-admin`, `ecom-web`, `ecom-api`) để biết các lệnh chạy và cấu hình biến môi trường cụ thể.*

## 📄 Cấu hình chung

- Dự án sử dụng cấu hình `.editorconfig` để đồng bộ hóa style code giữa các thành viên.
- Tham khảo `CHANGELOG.md` để xem chi tiết lịch sử cập nhật.
