import axios from "axios";

export const currentUser = async (authtoken) => {
  await axios.post(
    `${import.meta.env.VITE_URL}/current-user`,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};

// ดึงข้อมูล token ออกมาใช้งาน
