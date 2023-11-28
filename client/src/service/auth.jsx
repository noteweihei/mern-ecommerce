import axios from "axios";

export const getUser = async (token) => {
  await axios.get(`${import.meta.env.VITE_URL}/user`, {
    headers: {
      Authorization: token,
    },
  });
};

// ดึงข้อมูล token ออกมาใช้งาน
