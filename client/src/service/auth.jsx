import axios from "axios";

export const clearCart = async (token) => {
  await axios.delete(`${import.meta.env.VITE_URL}/usercart`, {
    headers: {
      Authorization: token,
    },
  });
};

export const getOrderAdmin = async (token) => {
  await axios.get(`${import.meta.env.VITE_URL}/orderuser`, {
    headers: {
      Authorization: token,
    },
  });
};

// ดึงข้อมูล token ออกมาใช้งาน
