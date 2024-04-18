package be.ehb.rabbitmqbroker.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.fasterxml.jackson.dataformat.xml.ser.ToXmlGenerator;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class ConversionService {

    public String wordpressUserJsonToXml(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();

        // Parse the JSON string to a JsonNode
        JsonNode rootNode = objectMapper.readTree(jsonString);

        // Reformat date fields in the JsonNode
        JsonNode reformattedNode = reformatDateFields(rootNode, "BirthDate", "yyyy-MM-dd");

        // Configure the XmlMapper
        XmlMapper xmlMapper = new XmlMapper();
        xmlMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
        xmlMapper.configure(ToXmlGenerator.Feature.WRITE_XML_DECLARATION, true);
        xmlMapper.configure(ToXmlGenerator.Feature.WRITE_XML_1_1, true);

        // Convert the JsonNode (with reformatted date fields) to an XML string
        return xmlMapper.writer().withRootName("User").writeValueAsString(reformattedNode);
    }


    private JsonNode reformatDateFields(JsonNode rootNode, String dateFieldName, String targetFormat) throws Exception {
        if (rootNode.has(dateFieldName) && rootNode.get(dateFieldName).isTextual()) {
            String dateString = rootNode.get(dateFieldName).asText();
            Date date = new SimpleDateFormat("dd-MM-yyyy").parse(dateString); // Assume the original format is "dd-MM-yyyy"
            String formattedDate = new SimpleDateFormat(targetFormat).format(date);

            ((ObjectNode) rootNode).put(dateFieldName, formattedDate);
        }

        // Add a timestamp node
        ((ObjectNode) rootNode).put("Timestamp", new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX").format(new Date()));

        return rootNode;
    }
}