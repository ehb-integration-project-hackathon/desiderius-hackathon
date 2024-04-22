package RabbitMQ.validator;

import org.xml.sax.SAXException;

import javax.xml.XMLConstants;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;

public class ValidateXML {
    public boolean validateXml(String xml, String xsdPath) {
        try {
            InputStream xsdStream = getClass().getClassLoader().getResourceAsStream(xsdPath);
            if (xsdStream == null) {
                System.err.println("XSD file not found: " + xsdPath);
                return false; // XSD file not found
            }

            SchemaFactory factory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema schema = factory.newSchema(new StreamSource(xsdStream));
            Validator validator = schema.newValidator();
            validator.validate(new StreamSource(new StringReader(xml)));
            return true; // XML is valid
        } catch (SAXException | IOException e) {
            e.printStackTrace();
            return false; // XML is invalid
        }
    }
}