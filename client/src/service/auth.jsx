import axios from "axios";

export const currentAdmin = async () => {
  const token = localStorage.getItem("token");
  await axios.post(
    `${import.meta.env.VITE_URL}/current-admin`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

// ดึงข้อมูล token ออกมาใช้งาน
