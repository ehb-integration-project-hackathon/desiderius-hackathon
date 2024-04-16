package RabbitMQ.service;

import RabbitMQ.validator.ValidateXML;
import org.apache.xmlrpc.XmlRpcException;
import org.apache.xmlrpc.client.XmlRpcClient;
import org.apache.xmlrpc.client.XmlRpcClientConfigImpl;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import static java.util.Arrays.asList;
import static java.util.Collections.emptyMap;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.Map;
@Service
public class OdooService {

    private static final String XSD_FILE = "validationUser.xsd";

    private final AmqpTemplate amqpTemplate;
    private static final String ODOO_URL = "http://localhost:8069";
    private static final String ODOO_DB = "postgress";
    private static final String ODOO_USERNAME = "doganhasko@gmail.com";
    private static final String ODOO_PASSWORD = "odoo";

    @Autowired
    public OdooService(AmqpTemplate amqpTemplate) {
        this.amqpTemplate = amqpTemplate;
    }

    @RabbitListener(queues = "odoo-queue")
    public void receiveAndSendMessage(String xmlMessage) throws XmlRpcException {

        //AUTHENTICATION
        try {
            XmlRpcClientConfigImpl config = new XmlRpcClientConfigImpl();
            config.setServerURL(new URL(ODOO_URL + "/xmlrpc/2/common"));

            XmlRpcClient client = new XmlRpcClient();
            client.setConfig(config);

            HashMap<String, Object> response = (HashMap<String, Object>) client.execute("version", new Object[]{});

            String version = (String) response.get("server_version");
            System.out.println("Odoo version: " + version);

            // AUTHENTICATION
            int uid = (int) client.execute(config, "authenticate", asList(ODOO_DB, ODOO_USERNAME, ODOO_PASSWORD, emptyMap()));

            System.out.println("UID is=" + uid);

            final XmlRpcClient models = new XmlRpcClient() {{
                setConfig(new XmlRpcClientConfigImpl() {{
                    setServerURL(new URL(String.format("%s/xmlrpc/2/object", ODOO_URL)));
                }});
            }};
        } catch (MalformedURLException | XmlRpcException e) {
            e.printStackTrace();
        };

        // Validate the received XML message against XSD schema
        if (new ValidateXML().validateXml(xmlMessage, XSD_FILE)) {
            // Process the validated XML message
            System.out.println("Odoo Received and validated XML message: " + xmlMessage);

            // Convert XML message to user data
            Map<String, Object> userData = parseXmlToUserData(xmlMessage);

            // Create customer in Odoo
            //createCustomerInOdoo(userData);
            //authenticateWithOdoo("http://localhost:8069/xmlrpc/2/common","postgress","doganhasko@gmail.com","odoo");


            // Send the validated message to fossBilling-queue
            amqpTemplate.convertAndSend("fossBilling-queue", xmlMessage);
            //amqpTemplate.convertAndSend("elastic-queue", xmlMessage);
            //amqpTemplate.convertAndSend("salesforce-queue", xmlMessage);
            //amqpTemplate.convertAndSend("sendgrid-queue", xmlMessage);
            //amqpTemplate.convertAndSend("wordpress-queue", xmlMessage);
            System.out.println("Message sent to ALL-queues.");
        } else {
            // Handle invalid XML message
            System.out.println("ODOO Received XML message is invalid.");
        }
    }

    private Map<String, Object> parseXmlToUserData(String xmlMessage) {
        try {
            // Create a DocumentBuilder
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();

            // Parse the XML string into a Document
            Document document = builder.parse(new ByteArrayInputStream(xmlMessage.getBytes()));

            // Get the root element
            Element root = document.getDocumentElement();

            // Create a map to store user data
            Map<String, Object> userData = new HashMap<>();

            // Get child elements of the root element
            NodeList childNodes = root.getChildNodes();

            // Iterate through child elements and populate the map
            for (int i = 0; i < childNodes.getLength(); i++) {
                if (childNodes.item(i) instanceof Element) {
                    Element childElement = (Element) childNodes.item(i);
                    String tagName = childElement.getTagName();
                    String textContent = childElement.getTextContent();
                    userData.put(tagName, textContent);
                }
            }

            return userData;
        } catch (Exception e) {
            e.printStackTrace();
            return null; // Handle exception
        }
    }

    private void createCustomerInOdoo(Map<String, Object> userData) {
        try {
            // Authenticate with Odoo and obtain UID
            int uid = authenticateWithOdoo(ODOO_URL + "/xmlrpc/2/common", ODOO_DB, ODOO_USERNAME, ODOO_PASSWORD);

            // Check if user already exists in Odoo based on email
            boolean userExists = checkIfUserExists(uid, userData.get("email").toString());

            // If user does not exist, create the user in Odoo
            if (!userExists) {
                createUserInOdoo(uid, userData);
            } else {
                System.out.println("User already exists in Odoo.");
            }
        } catch (XmlRpcException e) {
            e.printStackTrace();
            // Handle exception
        }
    }


    // Method to authenticate with Odoo and obtain UID
    private int authenticateWithOdoo(String url, String db, String username, String password) throws XmlRpcException {
        try {
            XmlRpcClientConfigImpl config = new XmlRpcClientConfigImpl();
            config.setServerURL(new URL(url + "/xmlrpc/2/common"));

            XmlRpcClient client = new XmlRpcClient();
            client.setConfig(config);

            HashMap<String, Object> response = (HashMap<String, Object>) client.execute("version", new Object[]{});

            String version = (String) response.get("server_version");
            System.out.println("Odoo version: " + version);

            // AUTHENTICATION
            int uid = (int) client.execute(config, "authenticate", asList(db, username, password, emptyMap()));

            System.out.println("UID is=" + uid);

            final XmlRpcClient models = new XmlRpcClient() {{
                setConfig(new XmlRpcClientConfigImpl() {{
                    setServerURL(new URL(String.format("%s/xmlrpc/2/object", url)));
                }});





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
            }};
            return uid;
        } catch (MalformedURLException e) {
            e.printStackTrace();
            throw new XmlRpcException("Malformed URL", e);
        } catch (XmlRpcException e) {
            e.printStackTrace();
            throw new XmlRpcException("Error during XML-RPC communication", e);
        } catch (Exception e) {
            e.printStackTrace();
            throw new XmlRpcException("Unknown error", e);
        }
    }
    // Method to create a user in Odoo
    private void createUserInOdoo(int uid, Map<String, Object> userData) throws XmlRpcException {
        try {
            XmlRpcClientConfigImpl config = new XmlRpcClientConfigImpl();
            config.setServerURL(new URL(ODOO_URL + "/xmlrpc/2/object"));
            XmlRpcClient client = new XmlRpcClient();
            client.setConfig(config);

            // Prepare data to create new user
            Map<String, Object> userDataForOdoo = prepareUserDataForOdoo(userData);

            // Call create method of res.partner model in Odoo
            Object[] params = new Object[]{"postgress", uid, ODOO_PASSWORD, "res.partner", "create", asList(userDataForOdoo)};
            int userId = (int) client.execute("execute_kw", params);

            System.out.println("Created user in Odoo with ID: " + userId);
        } catch (MalformedURLException e) {
            e.printStackTrace();
            throw new XmlRpcException("Malformed URL", e);
        } catch (XmlRpcException e) {
            e.printStackTrace();
            throw new XmlRpcException("Error during XML-RPC communication", e);
        } catch (Exception e) {
            e.printStackTrace();
            throw new XmlRpcException("Unknown error", e);
        }
    }


    // Method to check if a user already exists in Odoo based on email
    private boolean checkIfUserExists(int uid, String email) throws XmlRpcException {
        try {
            // Initialize XML-RPC client if necessary
            XmlRpcClientConfigImpl config = new XmlRpcClientConfigImpl();
            config.setServerURL(new URL(ODOO_URL + "/xmlrpc/2/object"));
            XmlRpcClient client = new XmlRpcClient();
            client.setConfig(config);

            // Search for user with matching email
            Object[] searchParams = new Object[] { "postgress", uid, "odoo", "res.partner", "search_count", new Object[] { emptyMap(), new Object[] { new Object[] { "email", "=", email } } } };
            int count = (int) client.execute("execute_kw", searchParams);

            // If count > 0, user exists; otherwise, it doesn't
            return count > 0;
        } catch (MalformedURLException e) {
            e.printStackTrace();
            throw new XmlRpcException("Malformed URL", e);
        } catch (XmlRpcException e) {
            e.printStackTrace();
            throw new XmlRpcException("Error during XML-RPC communication", e);
        } catch (Exception e) {
            e.printStackTrace();
            throw new XmlRpcException("Unknown error", e);
        }
    }


    private Map<String, Object> prepareUserDataForOdoo(Map<String, Object> partnerMap) {
        Map<String, Object> partnerData = new HashMap<>();
        partnerData.put("name", partnerMap.get("firstName") + " " + partnerMap.get("lastName"));
        partnerData.put("email", partnerMap.get("email"));
        partnerData.put("phone", partnerMap.get("phoneNumber"));
        // Add other fields as required by Odoo

        return partnerData;
    }

}