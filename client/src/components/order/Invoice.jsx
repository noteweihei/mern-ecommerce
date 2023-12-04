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

const Invoice = ({ order }) => {
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
              fontSize: "16px",
              textAlign: "center",
              padding: "10px",
              width: "100%",
            }}
          >
            รายการสินค้า &nbsp; &nbsp;
          </Text>
          {order.products.map((item, index) => (
            <Text
              style={{
                border: "1px solid gray",
                fontSize: "12px",
                textAlign: "left",
                padding: "5px",
                width: "100%",
              }}
              key={index}
            >
              {item.product.name.substring(0, 20)} x {item.count} ={" "}
              {format(item.price * item.count)} บาท
            </Text>
          ))}
          <Text
            style={{
              fontSize: "12px",
              textAlign: "right",
              padding: "10px",
              width: "100%",
            }}
          >
            ยอดสุทธิ {format(order.cartTotal)} บาท
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
