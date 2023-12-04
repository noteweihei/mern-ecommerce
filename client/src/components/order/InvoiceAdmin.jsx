import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import fontDev from "./Kanit-Regular.ttf";

// Register font
Font.register({
  family: "Kanit",
  src: fontDev,
});

// Create styles PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    fontFamily: "Kanit",
    textAlign: "center",
    fontSize: "12px",
  },
  section: {
    margin: 5,
    padding: 5,
    flex: 1,
  },
});

const InvoiceAdmin = ({ order }) => {
  const format = (value) => value.toLocaleString("en-US");
  return (
    <Document>
      <Page size="A6" style={styles.page}>
        <View style={styles.section}>
          <Text>ใบสั่งซื้อสินค้า</Text>
          <Text>Valentinote SHOP</Text>
          <Text style={{ fontSize: "12px" }}>
            วันที่ {new Date(order.createdAt).toLocaleString()}
          </Text>
          <Text style={{ fontSize: "12px" }}>#ID : {order._id}</Text>
          <Text
            style={{
              border: "1px solid gray",
              fontSize: "14px",
              textAlign: "left",
              padding: "10px",
              width: "100%",
            }}
          >
            ผู้ส่ง : ร้าน วาเลนติโน๊ตช้อป 155/36 หมู่บ้านแสงรุ่งเรือง 2 ตำบล
            บ้านใหม่หนองไทร อำเภอ อรัญประเทศ จังหวัด สระแก้ว 27120 &nbsp; &nbsp;
          </Text>
          <Text
            style={{
              border: "1px solid gray",
              fontSize: "14px",
              textAlign: "left",
              padding: "10px",
              width: "100%",
            }}
          >
            ผู้รับ : {order.orderdBy.address} &nbsp; &nbsp;
          </Text>
          <Text>ยอดสุทธิ : {format(order.cartTotal)} บาท</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceAdmin;
