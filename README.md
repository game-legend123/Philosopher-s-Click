# Philosopher's Click

Chào mừng bạn đến với **Philosopher's Click** - một trò chơi idle clicker không chỉ để giết thời gian mà còn để bạn suy ngẫm. Trong trò chơi này, bạn sẽ tích lũy điểm trong khi đối mặt với những câu hỏi triết học sâu sắc do AI tạo ra.

## Lối chơi

Cơ chế chơi rất đơn giản nhưng đầy thách thức:

1.  **Tích lũy điểm:** Điểm của bạn (Điểm Suy Ngẫm) sẽ tự động tăng lên theo thời gian.
2.  **Đối mặt với câu hỏi:** Cứ sau mỗi **5 giây**, một câu hỏi triết học sẽ xuất hiện.
3.  **Trả lời hoặc bị tái thiết lập:** Bạn có **60 giây** để đưa ra câu trả lời cho câu hỏi.
    - Nếu bạn không trả lời trong thời gian cho phép, trả lời bằng một chuỗi trống, hoặc đóng hộp thoại câu hỏi, điểm của bạn sẽ bị **reset về 0**.
    - Nếu bạn trả lời, điểm của bạn sẽ được giữ lại và cuộc hành trình tiếp tục.

Mục tiêu không chỉ là đạt được điểm số cao, mà còn là để bạn dành thời gian suy ngẫm về những câu hỏi được đặt ra.

## Hướng dẫn Bắt đầu

Để chạy dự án này trên máy cục bộ của bạn, hãy làm theo các bước sau:

### Điều kiện tiên quyết

- [Node.js](https://nodejs.org/) (phiên bản 18 trở lên)
- `npm` hoặc `yarn`

### Cài đặt

1.  Sao chép kho lưu trữ về máy của bạn.
2.  Điều hướng đến thư mục dự án:
    ```bash
    cd philosophers-click
    ```
3.  Cài đặt các gói phụ thuộc:
    ```bash
    npm install
    ```

### Chạy ứng dụng

Ứng dụng này yêu cầu chạy hai tiến trình đồng thời: máy chủ phát triển Next.js và máy chủ Genkit cho các chức năng AI.

1.  **Chạy máy chủ phát triển Next.js:**
    Mở một terminal và chạy lệnh sau:
    ```bash
    npm run dev
    ```
    Ứng dụng sẽ có sẵn tại `http://localhost:9002`.

2.  **Chạy máy chủ Genkit:**
    Mở một terminal thứ hai và chạy lệnh sau:
    ```bash
    npm run genkit:dev
    ```
    Điều này khởi động máy chủ Genkit, xử lý việc tạo và sàng lọc các câu hỏi triết học.

Bây giờ bạn có thể mở trình duyệt và bắt đầu chơi!

## Công nghệ sử dụng

- **[Next.js](https://nextjs.org/):** Framework React cho các ứng dụng web hiện đại.
- **[React](https://react.dev/):** Thư viện JavaScript để xây dựng giao diện người dùng.
- **[TypeScript](https://www.typescriptlang.org/):** JavaScript được định kiểu để tăng cường chất lượng mã.
- **[Tailwind CSS](https://tailwindcss.com/):** Framework CSS ưu tiên tiện ích để tạo kiểu nhanh chóng.
- **[ShadCN UI](https://ui.shadcn.com/):** Bộ sưu tập các thành phần UI có thể tái sử dụng.
- **[Genkit](https://firebase.google.com/docs/genkit):** Một framework mã nguồn mở để xây dựng các tính năng do AI hỗ trợ.
