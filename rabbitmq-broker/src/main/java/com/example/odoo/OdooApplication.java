package com.example.odoo;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;

import static java.util.Arrays.asList;
import static java.util.Collections.emptyMap;


@SpringBootApplication
@ComponentScan(basePackages = {"RabbitMQ.service", "RabbitMQ.configuration"})
public class OdooApplication {

    public OdooApplication() {

    }

    public static void main(String[] args) {
        SpringApplication.run(OdooApplication.class, args);
    }

//    @Bean
//    CommandLineRunner commandLineRunner() {
//        return args -> {
//            String url = "http://localhost:8069";
//            String db = "postgress";
//            String username = "doganhasko@gmail.com";
//            String password = "odoo";
//
//
//            try {
//                XmlRpcClientConfigImpl config = new XmlRpcClientConfigImpl();
//                config.setServerURL(new URL(url + "/xmlrpc/2/common"));
//
//                XmlRpcClient client = new XmlRpcClient();
//                client.setConfig(config);
//
//                HashMap<String, Object> response = (HashMap<String, Object>) client.execute("version", new Object[]{});
//
//                String version = (String) response.get("server_version");
//                System.out.println("Odoo version: " + version);
//
//                // AUTHENTICATION
//                int uid = (int) client.execute(config, "authenticate", asList(db, username, password, emptyMap()));
//
//                System.out.println("UID is=" + uid);
//
//                final XmlRpcClient models = new XmlRpcClient() {{
//                    setConfig(new XmlRpcClientConfigImpl() {{
//                        setServerURL(new URL(String.format("%s/xmlrpc/2/object", url)));
//                    }});
//                }};
//
//                // Read information about all invoices
//                Object[] readInvoiceParams = new Object[]{db, uid, password, "account.move", "search_read",
//                        emptyList(), // No condition to fetch all invoices
//                        new HashMap<String, Object>() {{
//                            put("fields", asList("name", "invoice_date", "amount_total", "invoice_line_ids"));
//                        }}};
//                Object[] invoices = (Object[]) models.execute("execute_kw", asList(readInvoiceParams));
//
//                // Display information about invoices
//                for (Object invoice : invoices) {
//                    System.out.println("INVOICE INFO===");
//                    Map<String, Object> invoiceMap = (Map<String, Object>) invoice;
//                    System.out.println("Invoice Name: " + invoiceMap.get("name"));
//                    System.out.println("Invoice Date: " + invoiceMap.get("invoice_date"));
//                    System.out.println("Total Amount: " + invoiceMap.get("amount_total"));
//                }
//
//                // GET INFO COMPANY
//                Object[] partners = (Object[]) models.execute("execute_kw", asList(
//                        db, uid, password,
//                        "res.partner", "search_read",
//                        asList(asList()),
//                        new HashMap<String, Object>() {{
//                            put("fields", asList(
//                                    "id", "name", "email", "phone", // Other fields you already have
//                                    "street", "city", "zip" // Additional fields: street, country, city, zip
//                            )); // Specify the fields to retrieve
//                        }}
//                ));
//
//// PRINT INFO COMPANY
//                for (Object partner : partners) {
//                    Map<String, Object> partnerMap = (Map<String, Object>) partner;
//                    System.out.println("Partner ID: " + partnerMap.get("id"));
//                    System.out.println("Partner Name: " + partnerMap.get("name"));
//                    System.out.println("Partner Email: " + partnerMap.get("email"));
//                    System.out.println("Partner Phone: " + partnerMap.get("phone"));
//                    System.out.println("Street: " + partnerMap.get("street"));
//                    System.out.println("City: " + partnerMap.get("city"));
//                    System.out.println("Zip Code: " + partnerMap.get("zip"));
//                    System.out.println("------------------------------------------");
//
//                    // Send partner information to RabbitMQ queue
//                    odooService.sendPartnerInfoToQueue(partnerMap);
//
//                    // Sleep for 5 seconds
//                    try {
//                        Thread.sleep(5000);
//                    } catch (InterruptedException e) {
//                        e.printStackTrace();
//                    }
//
//                    // Create a dummy partner map for second partner info
//                    Map<String, Object> dummyPartnerMap = new HashMap<>();
//                    dummyPartnerMap.put("id", "2");
//                    dummyPartnerMap.put("name", "Dummy Company");
//                    dummyPartnerMap.put("email", "dummy@example.com");
//                    dummyPartnerMap.put("phone", "1234567890");
//                    dummyPartnerMap.put("street", "Dummy Street");
//                    dummyPartnerMap.put("city", "Dummy City");
//                    dummyPartnerMap.put("zip", "12345");
//
//                    // Send dummy partner information to RabbitMQ queue
//                    odooService.sendPartnerInfoToQueue(dummyPartnerMap);
//                }
//
//
//                // PRINT INVOICES THAT BELONG TO A COMPANY
//                // Define the company ID for which you want to fetch invoices
//                int companyId = 1; // Replace 123 with the actual company ID
//
//                // Search for invoices associated with the specified company ID
//                Object[] invoiceIds = (Object[]) models.execute("execute_kw", asList(
//                        db, uid, password,
//                        "account.move", "search",
//                        asList(
//                                asList(
//                                        asList("partner_id", "=", companyId), // Search invoices for the specified company ID
//                                        asList("move_type", "=", "out_invoice") // Filter by invoice type (out_invoice for customer invoices)
//                                )
//                        )
//                ));
//
//                // Fetch details of each invoice
//                for (Object invoiceId : invoiceIds) {
//                    Object[] invoiceInfo = (Object[]) models.execute("execute_kw", asList(
//                            db, uid, password,
//                            "account.move", "read",
//                            asList(
//                                    asList(invoiceId),
//                                    asList("name", "invoice_date", "amount_total") // Include fields you want to retrieve
//                            )
//                    ));
//
//                    // Print details of each invoice
//                    for (Object invoice : invoiceInfo) {
//                        Map<String, Object> invoiceDetail = (Map<String, Object>) invoice;
//                        System.out.println("Invoice Name: " + invoiceDetail.get("name"));
//                        System.out.println("Invoice Date: " + invoiceDetail.get("invoice_date"));
//                        System.out.println("Total Amount: " + invoiceDetail.get("amount_total"));
//                        System.out.println("-----------------------");
//                    }
//                }
//// UPDATE PARTNER INFORMATION
//                int partnerId = 9; // Replace 9 with the actual partner ID you want to update
//
//// Prepare the updated partner information
//                Map<String, Object> updatedPartnerInfo = new HashMap<>();
//                updatedPartnerInfo.put("name", "Updated Partner Name2");
//                updatedPartnerInfo.put("email", "updated_email@example.com2");
//                updatedPartnerInfo.put("street", "Updated Street2");
//                updatedPartnerInfo.put("city", "Updated City2");
//
//// Call the 'write' method to update the partner information
//                Object[] writeParams = new Object[]{
//                        db,
//                        uid,
//                        password,
//                        "res.partner",
//                        "write",
//                        asList(asList(partnerId), updatedPartnerInfo)
//                };
//
//                boolean updateSuccess = (boolean) models.execute("execute_kw", writeParams);
//
//                if (updateSuccess) {
//                    System.out.println("Partner information updated successfully.");
//                } else {
//                    System.out.println("Failed to update partner information.");
//                }
//
//
//
//            } catch (MalformedURLException | XmlRpcException e) {
//                e.printStackTrace();
//            }
//        };
//    }
}











//package com.example.odoo;
//
//import RabbitMQ.service.OdooService;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.Bean;
//
//
//import org.apache.xmlrpc.client.XmlRpcClient;
//import org.apache.xmlrpc.client.XmlRpcClientConfigImpl;
//import org.apache.xmlrpc.XmlRpcException;
//
//import java.net.MalformedURLException;
//import java.net.URL;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import static java.util.Arrays.asList;
//import static java.util.Collections.emptyList;
//import static java.util.Collections.emptyMap;
//
//@SpringBootApplication
//public class OdooApplication {
//
//    public static void main(String[] args) {
//        SpringApplication.run(OdooApplication.class, args);
//
//        String url = "http://localhost:8069";
//        String db = "postgress";
//        String username = "doganhasko@gmail.com";
//        String password = "odoo";
//
//        try {
//            XmlRpcClientConfigImpl config = new XmlRpcClientConfigImpl();
//            config.setServerURL(new URL(url + "/xmlrpc/2/common"));
//
//            XmlRpcClient client = new XmlRpcClient();
//            client.setConfig(config);
//
//            HashMap<String, Object> response = (HashMap<String, Object>) client.execute("version", new Object[]{});
//
//            String version = (String) response.get("server_version");
//            System.out.println("Odoo version: " + version);
//
//            // AUTHENTICATION
//            int uid = (int) client.execute(config, "authenticate", asList(db, username, password, emptyMap()));
//
//            System.out.println("UID is=" + uid);
//
//            final XmlRpcClient models = new XmlRpcClient() {{
//                setConfig(new XmlRpcClientConfigImpl() {{
//                    setServerURL(new URL(String.format("%s/xmlrpc/2/object", url)));
//                }});
//            }};
//
//
////        // This is getting the Uid s of companies. using SEARCH method
////        List partners= asList((Object[])models.execute("execute_kw", asList(
////                db, uid, password,
////                "res.partner", "search",
////                asList(asList(
////                        asList("is_company", "=", true)))
////        )));
////
////        System.out.println("received="+partners);
////
////        //READ method !
////        List partner_rec= asList((Object[])models.execute("execute_kw", asList(
////                db, uid, password,
////                "res.partner", "read",
////                asList(partners),
////                new HashMap() {{
////                    put("fields", asList("name", "country_id", "comment"));
////                }}
////        )));
////        System.out.println("partners="+partner_rec);
//
//            //READ method for Invoices !
////        List partner_rec2= asList((Object[])models.execute("execute_kw", asList(
////                db, uid, password,
////                "account.move", "read",
////                asList(partners),
////                new HashMap() {{
////                    put("fields", asList("name"));
////                }}
////        )));
////        System.out.println("partners="+partner_rec2);
//
//// Read information about sales orders and products sold in the first POS configuration
//            Object[] readPosParams = new Object[]{db, uid, password, "pos.order", "search_read",
//                    asList(asList(asList("config_id", "=", 1))),
//                    new HashMap<String, Object>() {{
//                        put("fields", asList("amount_total", "lines"));
//                    }}};
//            Object[] posOrders = (Object[]) models.execute("execute_kw", asList(readPosParams));
//
//// ----END-----
//
//
//
//// HERE YOU CAN FETCH INFORMATION FROM POS.
///// Read information about sales orders and products sold in the first POS configuration
///// Read information about sales orders and products sold in all POS configurations
//            Object[] readPosParams2 = new Object[]{db, uid, password, "pos.order", "search_read",
//                    emptyList(), // Remove the condition limiting to a specific POS configuration ID
//                    new HashMap<String, Object>() {{
//                        put("fields", asList("name", "date_order", "amount_total", "lines", "config_id"));
//                    }}};
//            Object[] posOrders2 = (Object[]) models.execute("execute_kw", asList(readPosParams2));
//
//// Display information about sales orders and products sold
//            for (Object order : posOrders2) {
//                Map<String, Object> orderMap = (Map<String, Object>) order;
//                System.out.println("POS Configuration ID: " + orderMap.get("config_id"));
//                System.out.println("Order Name: " + orderMap.get("name"));
//                System.out.println("Order Date: " + orderMap.get("date_order"));
//                System.out.println("Total Amount: " + orderMap.get("amount_total"));
//            }
//
//
//            //THIS IS FETCH INVOICES
///// Read information about all invoices
//            Object[] readInvoiceParams = new Object[]{db, uid, password, "account.move", "search_read",
//                    emptyList(), // No condition to fetch all invoices
//                    new HashMap<String, Object>() {{
//                        put("fields", asList("name", "invoice_date", "amount_total", "invoice_line_ids"));
//                    }}};
//            Object[] invoices = (Object[]) models.execute("execute_kw", asList(readInvoiceParams));
//
//// Display information about invoices
//            for (Object invoice : invoices) {
//                System.out.println("INVOICE INFO===");
//                Map<String, Object> invoiceMap = (Map<String, Object>) invoice;
//                System.out.println("Invoice Name: " + invoiceMap.get("name"));
//                System.out.println("Invoice Date: " + invoiceMap.get("invoice_date"));
//                System.out.println("Total Amount: " + invoiceMap.get("amount_total"));
//
//            }
//
//
//
//            //ADD NEW COMPANY
////        final Integer id = (Integer)models.execute("execute_kw", asList(
////                db, uid, password,
////                "res.partner", "create",
////                asList(new HashMap() {{ put("name", "New Partner"); }})
////        ));
//
//            // GET INFO COMPANY
//            Object[] partners = (Object[]) models.execute("execute_kw", asList(
//                    db, uid, password,
//                    "res.partner", "search_read",
//                    asList(asList()),
//                    new HashMap<String, Object>() {{
//                        put("fields", asList(
//                                "id", "name", "email", "phone", // Other fields you already have
//                                "street", "city", "zip" // Additional fields: street, country, city, zip
//                        )); // Specify the fields to retrieve
//                    }}
//            ));
//
//// PRINT INFO COMPANY
//            for (Object partner : partners) {
//                Map<String, Object> partnerMap = (Map<String, Object>) partner;
//                System.out.println("Partner ID: " + partnerMap.get("id"));
//                System.out.println("Partner Name: " + partnerMap.get("name"));
//                System.out.println("Partner Email: " + partnerMap.get("email"));
//                System.out.println("Partner Phone: " + partnerMap.get("phone"));
//                System.out.println("Street: " + partnerMap.get("street"));
//                System.out.println("City: " + partnerMap.get("city"));
//                System.out.println("Zip Code: " + partnerMap.get("zip"));
//
//
//                System.out.println("------------------------------------------");
//            }
//
//            //---------END HERE-----------
//
//
//            // PRINT FACTUUR THAT BELONGS TO A COMPANNY
//// Define the company ID for which you want to fetch invoices
//            int companyId = 1; // Replace 123 with the actual company ID
//
//// Search for invoices associated with the specified company ID
//            Object[] invoiceIds = (Object[]) models.execute("execute_kw", asList(
//                    db, uid, password,
//                    "account.move", "search",
//                    asList(
//                            asList(
//                                    asList("partner_id", "=", companyId), // Search invoices for the specified company ID
//                                    asList("move_type", "=", "out_invoice") // Filter by invoice type (out_invoice for customer invoices)
//                            )
//                    )
//            ));
//
//// Fetch details of each invoice
//            for (Object invoiceId : invoiceIds) {
//                Object[] invoiceInfo = (Object[]) models.execute("execute_kw", asList(
//                        db, uid, password,
//                        "account.move", "read",
//                        asList(
//                                asList(invoiceId),
//                                asList("name", "invoice_date", "amount_total") // Include fields you want to retrieve
//                        )
//                ));
//
//                // Print details of each invoice
//                for (Object invoice : invoiceInfo) {
//                    Map<String, Object> invoiceDetail = (Map<String, Object>) invoice;
//                    System.out.println("Invoice Name: " + invoiceDetail.get("name"));
//                    System.out.println("Invoice Date: " + invoiceDetail.get("invoice_date"));
//                    System.out.println("Total Amount: " + invoiceDetail.get("amount_total"));
//                    System.out.println("-----------------------");
//                }
//            }
//
//            // Create an instance of OdooService
//            OdooService odooService = context.getBean(OdooService.class);
//
//            // Send partner information to RabbitMQ queue
//            for (Object partner : partners) {
//                Map<String, Object> partnerMap = (Map<String, Object>) partner;
//                odooService.sendPartnerInfoToQueue(partnerMap);
//            }
//
//        } catch (MalformedURLException | XmlRpcException e) {
//            e.printStackTrace();
//        }
//    }
//}