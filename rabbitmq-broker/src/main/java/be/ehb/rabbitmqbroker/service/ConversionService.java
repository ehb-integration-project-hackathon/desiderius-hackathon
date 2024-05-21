package be.ehb.rabbitmqbroker.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.fasterxml.jackson.dataformat.xml.ser.ToXmlGenerator;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class ConversionService {

    private final ObjectMapper objectMapper;
    private final XmlMapper xmlMapper;
    private final SimpleDateFormat jsonDateFormat = new SimpleDateFormat("dd-MM-yyyy");
    private final SimpleDateFormat xmlDateFormat = new SimpleDateFormat("yyyy-MM-dd");

    // Fields to be included in the XML
    private final List<String> fieldNames = List.of("FirstName", "LastName", "BirthDate", "Email", "Address");

    public ConversionService(ObjectMapper objectMapper, XmlMapper xmlMapper) {
        this.objectMapper = objectMapper;
        this.xmlMapper = xmlMapper;

        // Configure XML mapper
        this.xmlMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
        this.xmlMapper.configure(ToXmlGenerator.Feature.WRITE_XML_DECLARATION, true);
        this.xmlMapper.configure(ToXmlGenerator.Feature.WRITE_XML_1_1, true);
    }

    // Convert JSON string to XML string
    public String wordpressUserJsonToXml(String jsonString, String uuid) throws Exception {
        JsonNode rootNode = objectMapper.readTree(jsonString);
        JsonNode formattedNode = reformatFields(rootNode, uuid);
        return xmlMapper.writer().withRootName("User").writeValueAsString(formattedNode);
    }

    // Reformat JSON fields and create XML node with UUID
    private JsonNode reformatFields(JsonNode rootNode, String uuid) throws Exception {
        ObjectNode formattedNode = JsonNodeFactory.instance.objectNode();
        formattedNode.put("Uuid", uuid);

        // Iterate over field names
        for (String fieldName : fieldNames) {
            if (rootNode.has(fieldName)) {
                if ("BirthDate".equals(fieldName)) {
                    reformatAndPutDateField(rootNode, formattedNode, fieldName);
                } else if ("Address".equals(fieldName)) {
                    // Serialize the Address object to JSON and then deserialize it to XML
                    ObjectNode addressNode = objectMapper.createObjectNode();
                    JsonNode addressJsonNode = rootNode.get(fieldName);
                    addressNode.put("Street", addressJsonNode.get("Street").asText());
                    addressNode.put("Bus", addressJsonNode.get("Bus").asText());
                    addressNode.put("City", addressJsonNode.get("City").asText());
                    addressNode.put("Zip", addressJsonNode.get("Zip").asText());
                    addressNode.put("Country", addressJsonNode.get("Country").asText());
                    formattedNode.set(fieldName, addressNode);
                } else {
                    formattedNode.put(fieldName, rootNode.get(fieldName).asText());
                }
            }
        }

        // Add Timestamp and CRUD fields
        formattedNode.put("Timestamp", getCurrentTimestamp());
        formattedNode.put("CRUD", "create");
        return formattedNode;
    }

    // Reformat and put Date field into formattedNode
    private void reformatAndPutDateField(JsonNode rootNode, ObjectNode formattedNode, String fieldName) throws ParseException {
        String dateString = rootNode.get(fieldName).asText();
        Date date = jsonDateFormat.parse(dateString);
        formattedNode.put(fieldName, xmlDateFormat.format(date));
    }

    // Get current timestamp in the specified format
    private String getCurrentTimestamp() {
        SimpleDateFormat timestampFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
        return timestampFormat.format(new Date());
    }
}